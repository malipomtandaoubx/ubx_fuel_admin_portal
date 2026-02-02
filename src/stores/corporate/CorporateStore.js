/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchCorporatesService, addCorporatesService, updateCorporateService, deleteCorporateService, activateCorporateAccountService, deactivateCorporateAccountService, topUpWalletService, fetchCorporateTransactionsDataService } from './CorporateServices';
import { authStore } from '../auth/AuthStore';

class CorporateStore {
    loading = false;
    error = null;
    corporateData = [];
    corporateTransactionData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchCorporates: action.bound,
            addCorporates: action.bound,
            updateCorporate: action.bound,
            deleteCorporate: action.bound,
            activateCorporateAccount: action.bound,
            deactivateCorporateAccount: action.bound,
            topUpWallet: action.bound,
            fetchCorporateTransactionsData: action.bound,
            clearCorporateStore: action.bound,
        });
    }

    async fetchCorporates() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchCorporatesService(payloads);

            runInAction(() => {
                this.loading = false;
                this.corporateData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Corporate fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.corporateData = [];
            });
        }
    }

    async addCorporates(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addCorporatesService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add corporate failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateCorporate(corporateId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateCorporateService(corporateId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update corporate failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteCorporate(corporateId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteCorporateService(corporateId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete corporate failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async activateCorporateAccount(corporateId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await activateCorporateAccountService(corporateId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Activate corporate account failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deactivateCorporateAccount(corporateId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deactivateCorporateAccountService(corporateId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Deactivate corporate account failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async fetchCorporateTransactionsData(corporateId) {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;
            
            let response = await fetchCorporateTransactionsDataService(corporateId, token);

            runInAction(() => {
                this.loading = false;
                this.corporateTransactionData = response?.data?.transactions?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Coporate transaction fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.corporateTransactionData = [];
            });
        }
    }

    async topUpWallet(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await topUpWalletService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Top up corporate wallet failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearCorporateStore() {
        runInAction(() => {
            this.loading = false;
            this.corporateData = [];
            this.corporateTransactionData = [];
        });
    }

}

export const corporateStore = new CorporateStore();
