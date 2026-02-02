/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchBankService, addBankService, updateBankService } from './BankServices';
import { authStore } from '../auth/AuthStore';

class BankStore {
    loading = false;
    error = null;
    bankData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchBanks: action.bound,
            addBanks: action.bound,
            updateBank: action.bound,
            clearBankStore: action.bound,
        });
    }

    async fetchBanks() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchBankService(payloads);

            runInAction(() => {
                this.loading = false;
                this.bankData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Bank fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.bankData = [];
            });
        }
    }

    async addBanks(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addBankService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add bank failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateBank(bankId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateBankService(bankId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update bank failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }


    async clearBankStore() {
        runInAction(() => {
            this.loading = false;
            this.bankData = [];
        });
    }

}

export const bankStore = new BankStore();
