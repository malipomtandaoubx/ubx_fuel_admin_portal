/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchBusinessTypesService, addBusinessTypesService, updateBusinessTypesService, deleteBusinessTypesService } from './BusinessServices';
import { authStore } from '../auth/AuthStore';

class BusinessStore {
    loading = false;
    error = null;
    businessTypeData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchBusinessTypes: action.bound,
            addBusinessTypes: action.bound,
            updateBusinessTypes: action.bound,
            deleteBusinessTypes: action.bound,
            clearBusinessStore: action.bound,
        });
    }

    async fetchBusinessTypes() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchBusinessTypesService(payloads);

            runInAction(() => {
                this.loading = false;
                this.businessTypeData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Business type fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.businessTypeData = [];
            });
        }
    }

    async addBusinessTypes(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addBusinessTypesService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add business type failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateBusinessTypes(cardId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateBusinessTypesService(cardId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update business type failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteBusinessTypes(cardId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteBusinessTypesService(cardId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete business type failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearBusinessStore() {
        runInAction(() => {
            this.loading = false;
            this.businessTypeData = [];
        });
    }

}

export const businessStore = new BusinessStore();