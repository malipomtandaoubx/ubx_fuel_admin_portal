/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { generateReportService } from './ReportServices';
import { authStore } from '../auth/AuthStore';

class ReportStore {
    loading = false;
    error = null;
    reportData = [];

    constructor() {
        makeAutoObservable(this, {
            genrateReport: action.bound,
            clearReportStore: action.bound,
        });
    }

    async generateReport(payloads) {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            let response = await generateReportService(payloads, token);
            console.log("🚀 ~ ReportStore ~ generateReport ~ response:", response)

            runInAction(() => {
                this.loading = false;
                this.reportData = response?.data || [];
            });

            // If format is EXCEL, download the file
            if (response && (payloads.format === 'EXCEL' || payloads.format === 'PDF')) {
                const filename = this.getFilenameFromResponse(response, payloads.format);

                if (payloads.format === 'PDF') {
                    this.downloadBlobAsFile(response.data, filename);
                } else {
                    this.downloadExcelFile(response, payloads);
                }
            }

            return true;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Report fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.reportData = [];
            });

            throw err;
        }
    }

    downloadExcelFile(response, payloads) {
        runInAction(() => {
            this.loading = true;
        });
        try {
            // Get filename from response headers
            const filename = this.getFilenameFromResponse(response);

            // Check different response formats
            if (response instanceof Blob) {
                // Case 1: Response is already a Blob
                this.downloadBlobAsFile(response, filename);
            } else if (response.data instanceof Blob) {
                // Case 2: Response has data property that is a Blob
                this.downloadBlobAsFile(response.data, filename);
            } else if (typeof response === 'string' && response.startsWith('PK')) {
                // Case 3: Response is a string that starts with Excel file signature (PK)
                this.downloadStringAsExcelFile(response, filename);
            } else if (response.data && typeof response.data === 'string' && response.data.startsWith('PK')) {
                // Case 4: Response has data property that is an Excel string
                this.downloadStringAsExcelFile(response.data, filename);
            } else if (response.data && this.isBase64(response.data)) {
                // Case 5: Response data is base64 encoded
                this.downloadBase64AsExcelFile(response.data, filename);
            } else {
                console.log('Response is not a valid Excel file:', response);
                console.log('Response type:', typeof response);
                console.log('Response data type:', typeof response.data);
                console.log('Response data sample:', response.data ? response.data.substring(0, 100) : 'No data');
            }
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    downloadBlobAsFile(blob, filename) {
        runInAction(() => {
            this.loading = true;
        });

        try {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    downloadStringAsExcelFile(excelString, filename) {
        runInAction(() => {
            this.loading = true;
        });

        try {
            // Method 1: Try direct string to blob conversion
            const blob = new Blob([excelString], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            // Download the Blob as a file
            this.downloadBlobAsFile(blob, filename);
            console.log('Successfully downloaded Excel file from string data');

        } catch (error) {
            console.error('Error converting string to Excel file:', error);
            // Try alternative method if first fails
            this.tryAlternativeDownloadMethods(excelString, filename);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    downloadBase64AsExcelFile(base64String, filename) {
        runInAction(() => {
            this.loading = true;
        });

        try {
            // Remove data URL prefix if present
            const base64Data = base64String.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, '');

            // Convert base64 to binary
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([bytes], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            this.downloadBlobAsFile(blob, filename);
            console.log('Successfully downloaded Excel file from base64 data');

        } catch (error) {
            console.error('Error converting base64 to Excel file:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    isBase64(str) {
        runInAction(() => {
            this.loading = true;
        });

        try {
            // Check if string looks like base64
            return btoa(atob(str)) === str ||
                /^[A-Za-z0-9+/]*={0,2}$/.test(str) ||
                str.includes('base64');
        } catch (e) {
            return false;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    tryAlternativeDownloadMethods(data, filename) {
        runInAction(() => {
            this.loading = true;
        });

        try {
            // Method 2: Create a Uint8Array from the string
            const encoder = new TextEncoder();
            const uint8Array = encoder.encode(data);

            const blob = new Blob([uint8Array], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            this.downloadBlobAsFile(blob, filename);
            console.log('Successfully downloaded Excel file using Uint8Array method');

        } catch (error) {
            console.error('Uint8Array method failed:', error);

            // Method 3: Try with responseType: 'arraybuffer' in the service
            console.warn('Please update the service to use responseType: "arraybuffer"');
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getFilenameFromResponse(response, format = 'EXCEL') {
        runInAction(() => {
            this.loading = true;
        });

        try {
            let filename = '';

            if (response.headers) {
                const contentDisposition =
                    response.headers['content-disposition'] ||
                    response.headers['Content-Disposition'];

                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(
                        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                    );

                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1].replace(/['"]/g, '');
                    }
                }
            }

            // If no filename found, fallback
            if (!filename) {
                const timestamp = new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace(/:/g, '-');
                filename =
                    format === 'PDF'
                        ? `report_${timestamp}.pdf`
                        : `report_${timestamp}.xlsx`;
                console.warn(
                    'No filename found in response headers, using default:',
                    filename
                );
            }

            // 🟩 Ensure proper file extension based on format
            const expectedExt = format === 'PDF' ? '.pdf' : '.xlsx';
            if (!filename.toLowerCase().endsWith(expectedExt)) {
                filename = filename.replace(/\.(xlsx|pdf)$/i, '') + expectedExt;
            }

            filename = filename.replace(/^[_\s]+/, '');

            return filename;
        } catch (error) {
            console.error('Error extracting filename from response:', error);
            const timestamp = new Date()
                .toISOString()
                .slice(0, 19)
                .replace(/:/g, '-');
            return format === 'PDF'
                ? `report_${timestamp}.pdf`
                : `report_${timestamp}.xlsx`;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }


    async clearReportStore() {
        runInAction(() => {
            this.loading = false;
            this.reportData = [];
        });
    }

}

export const reportStore = new ReportStore();