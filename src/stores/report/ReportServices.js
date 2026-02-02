/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

// export function generateReportService(payloads, token) {
//     if (!token) {
//         throw new Error('Authentication required');
//     }

//     // Build query parameters dynamically
//     const queryParams = new URLSearchParams();

//     // Add only the fields that have values
//     if (payloads.entity_id) queryParams.append('entity_id', payloads.entity_id);
//     if (payloads.entity_type) queryParams.append('entity_type', payloads.entity_type);
//     if (payloads.format) queryParams.append('format', payloads.format);
//     if (payloads.interval) queryParams.append('interval', payloads.interval);
//     if (payloads.transaction_type) queryParams.append('transaction_type', payloads.transaction_type);

//     // Handle interval_data array
//     if (payloads.interval_data && payloads.interval_data.length > 0) {
//         payloads.interval_data.forEach(date => {
//             queryParams.append('interval_data[]', date);
//         });
//     }

//     const queryString = queryParams.toString();
//     const url = `/management/report/transaction${queryString ? `?${queryString}` : ''}`;

//     // For Excel format, use arraybuffer response type
//     if (payloads.format === 'EXCEL') {
//         return https.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//             },
//             responseType: 'arraybuffer' // This is the key fix
//         }).then((response) => {
//             // Convert arraybuffer to blob
//             const blob = new Blob([response.data], {
//                 type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//             });

//             // Return both the blob and headers
//             return {
//                 data: blob,
//                 headers: response.headers
//             };
//         });
//     } else {
//         // For PDF or other formats, return as usual
//         return https.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(({ data }) => data);
//     }
// }

export function generateReportService(payloads, token) {
    if (!token) {
        throw new Error('Authentication required');
    }

    // Build query parameters dynamically
    const queryParams = new URLSearchParams();

    if (payloads.entity_id) queryParams.append('entity_id', payloads.entity_id);
    if (payloads.entity_type) queryParams.append('entity_type', payloads.entity_type);
    if (payloads.format) queryParams.append('format', payloads.format);
    if (payloads.interval) queryParams.append('interval', payloads.interval);
    if (payloads.transaction_type) queryParams.append('transaction_type', payloads.transaction_type);

    // Handle interval_data array
    if (payloads.interval_data && payloads.interval_data.length > 0) {
        payloads.interval_data.forEach(date => {
            queryParams.append('interval_data[]', date);
        });
    }

    const queryString = queryParams.toString();
    const url = `/management/report/transaction${queryString ? `?${queryString}` : ''}`;

    // 🟩 Handle both Excel & PDF as binary data
    if (payloads.format === 'EXCEL' || payloads.format === 'PDF') {
        const mimeType =
            payloads.format === 'EXCEL'
                ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                : 'application/pdf';

        return https
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: mimeType,
                },
                responseType: 'arraybuffer', // 👈 crucial for both PDF and Excel
            })
            .then((response) => {
                const blob = new Blob([response.data], { type: mimeType });

                return {
                    data: blob,
                    headers: response.headers,
                };
            });
    }

    // Default (non-file) formats
    return https
        .get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => data);
}
