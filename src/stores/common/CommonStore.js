/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchNationalityService, fetchBusinessTypesService, fetchPermissionService } from './CommonServices';
import { authStore } from '../auth/AuthStore';

class CommonStore {
    loading = false;
    error = null;
    nationalityData = [];
    businessTypeData = [];
    permissionsData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchNationality: action.bound,
            fetchPermission: action.bound,
            clearCommonStore: action.bound,
        });
    }

    async fetchNationality() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            // let response = await fetchNationalityService(payloads);

            // runInAction(() => {
            //     this.loading = false;
            //     this.nationalityData = response?.data || [];
            // });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Merchant fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.nationalityData = [];
            });
        }
    }

    async fetchBusinessTypes() {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await fetchBusinessTypesService(token);

            runInAction(() => {
                this.loading = false;
                this.businessTypeData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Fetch business types failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
                this.businessTypeData = [];
            });
        }
    }

    async fetchPermission() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchPermissionService(payloads);

            runInAction(() => {
                this.loading = false;
                this.permissionsData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Permissions fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.permissionsData = [];
            });
        }
    }

    async clearCommonStore() {
        runInAction(() => {
            this.loading = false;
            this.merchantData = [];
            this.businessTypeData = [];
            this.permissionsData = [];
        });
    }

}

export const commonStore = new CommonStore();
