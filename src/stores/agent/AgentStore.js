/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchAgentService, addAgentService } from './AgentServices';
import { authStore } from '../auth/AuthStore';

class AgentStore {
    loading = false;
    error = null;
    agentData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchAgents: action.bound,
            addAgent: action.bound,
            clearAgentStore: action.bound,
        });
    }

    async fetchAgents() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchAgentService(payloads);

            runInAction(() => {
                this.loading = false;
                this.agentData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Agent fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.agentData = [];
            });
        }
    }

    async addAgent(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addAgentService(payload, token);

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


    async clearAgentStore() {
        runInAction(() => {
            this.loading = false;
            this.agentData = [];
        });
    }

}

export const agentStore = new AgentStore();
