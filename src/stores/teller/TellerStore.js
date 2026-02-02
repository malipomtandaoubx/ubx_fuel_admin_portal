/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { addTellerService } from './TellerServices';
import { authStore } from '../auth/AuthStore';

class TellerStore {
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this, {
            addTeller: action.bound,
            clearTellerStore: action.bound,
        });
    }

    async addTeller(payload, id) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addTellerService(payload, id, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add teller failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearTellerStore() {
        runInAction(() => {
            this.loading = false;
        });
    }

}

export const tellerStore = new TellerStore();
