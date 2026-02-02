/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchUsersService, addUserService, updateUserService } from './UserServices';
import { authStore } from '../auth/AuthStore';

class UserStore {
    loading = false;
    error = null;
    userData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchUsers: action.bound,
            addUser: action.bound,
            updateUser: action.bound,
            clearUserStore: action.bound,
        });
    }

    async fetchUsers() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchUsersService(payloads);

            runInAction(() => {
                this.loading = false;
                this.userData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Users fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.userData = [];
            });
        }
    }

    async addUser(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addUserService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add user failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateUser(userId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateUserService(userId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update user failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearUserStore() {
        runInAction(() => {
            this.loading = false;
            this.userData = [];
        });
    }

}

export const userStore = new UserStore();
