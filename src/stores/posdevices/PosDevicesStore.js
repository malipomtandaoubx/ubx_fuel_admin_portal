/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchPosDevicesService, addPosDevicesService, updatePosDevicesService, deletePosDevicesService } from './PosDevicesServices';
import { authStore } from '../auth/AuthStore';

class PosdevicesStore {
    loading = false;
    error = null;
    posDevicesData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchPosDevices: action.bound,
            addPosDevices: action.bound,
            updatePosDevices: action.bound,
            clearPosDevicesStore: action.bound,
        });
    }

    async fetchPosDevices() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchPosDevicesService(payloads);

            runInAction(() => {
                this.loading = false;
                this.posDevicesData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Pos devices fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.posDevicesData = [];
            });
        }
    }

    async addPosDevices(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addPosDevicesService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add pos device failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updatePosDevices(deviceId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updatePosDevicesService(deviceId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update pos device failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deletePosDevices(deviceId){
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deletePosDevicesService(deviceId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete pos device failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearPosDevicesStore() {
        runInAction(() => {
            this.loading = false;
            this.posDevicesData = [];
        });
    }

}

export const posdevicesStore = new PosdevicesStore();
