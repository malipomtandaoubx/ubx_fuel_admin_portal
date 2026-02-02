/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchRolesService, addRolesService, updateRoleService, deleteRoleService } from './RoleServices';
import { authStore } from '../auth/AuthStore';

class RoleStore {
    loading = false;
    error = null;
    roleData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchRoles: action.bound,
            addRole: action.bound,
            updateRole: action.bound,
            clearRoleStore: action.bound,
        });
    }

    async fetchRoles() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchRolesService(payloads);

            runInAction(() => {
                this.loading = false;
                this.roleData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Roles fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.roleData = [];
            });
        }
    }

    async addRole(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addRolesService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add role failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateRole(deviceId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateRoleService(deviceId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update role failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteRole(deviceId){
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteRoleService(deviceId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete role failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearRoleStore() {
        runInAction(() => {
            this.loading = false;
            this.roleData = [];
        });
    }

}

export const roleStore = new RoleStore();
