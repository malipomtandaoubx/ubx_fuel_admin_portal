/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchCustomersService, fetchCustomerRolesService, addCustomersService } from './CustomerServices';
import { authStore } from '../auth/AuthStore';

class CustomerStore {
    loading = false;
    error = null;
    customersData = [];
    customersRoles = [];

    constructor() {
        makeAutoObservable(this, {
            fetchCustomers: action.bound,
            fetchCustomerRoles: action.bound,
            addCustomers: action.bound,
            clearHomeStore: action.bound,
        });
    }

    async fetchCustomers() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            let response = await fetchCustomersService(token);

            runInAction(() => {
                this.loading = false;
                this.customersData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Customers fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.customersData = [];
            });
        }
    }

    async fetchCustomerRoles() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchCustomerRolesService(payloads);

            runInAction(() => {
                this.loading = false;
                this.customersRoles = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Customers role fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.customersRoles = [];
            });
        }
    }

    async addCustomers(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addCustomersService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add customer failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearCustomerStore() {
        runInAction(() => {
            this.loading = false;
            this.customersData = [];
            this.customersRoles = [];
        });
    }

}

export const customerStore = new CustomerStore();
