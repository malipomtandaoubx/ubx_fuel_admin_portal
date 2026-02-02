/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchMerchantsService, addMerchantService, updateMerchantService, deleteMerchantService, activateDeactivateMerchantAccountService } from './MerchantServices';
import { authStore } from '../auth/AuthStore';

class MerchantStore {
    loading = false;
    error = null;
    merchantData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchMerchants: action.bound,
            addMerchant: action.bound,
            updateMerchant: action.bound,
            deleteMerchant: action.bound,
            activateMerchantAccount: action.bound,
            deactivateMerchantAccount: action.bound,
            clearAgentStore: action.bound,
        });
    }

    async fetchMerchants() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchMerchantsService(payloads);

            runInAction(() => {
                this.loading = false;
                this.merchantData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Merchant fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.merchantData = [];
            });
        }
    }

    async addMerchant(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addMerchantService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add agent failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateMerchant(merchantId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateMerchantService(merchantId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update merchant failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteMerchant(merchantId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteMerchantService(merchantId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete merchant failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }


    async activateMerchantAccount(merchantId) {
        this.loading = true;
        this.error = null;

        try {
            var payload = {
                merchant_id: merchantId,
                status: 1
            }
            const token = authStore.token;
            const response = await activateDeactivateMerchantAccountService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Activate merchant account failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deactivateMerchantAccount(merchantId) {
        this.loading = true;
        this.error = null;

        try {
            var payload = {
                merchant_id: merchantId,
                status: 0
            }

            const token = authStore.token;
            const response = await activateDeactivateMerchantAccountService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Deactivate merchant account failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearAgentStore() {
        runInAction(() => {
            this.loading = false;
            this.merchantData = [];
        });
    }

}



export const merchantStore = new MerchantStore();
