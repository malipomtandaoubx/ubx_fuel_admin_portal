/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchBalanceService, fuelUsagesSummaryService, fetchTransactionsService, getDashboardDataService } from './HomeServices';
import { authStore } from '../auth/AuthStore';

class HomeStore {
    loading = false;
    balance = null;
    error = null;
    usageSummary = {};
    transactions = [];
    dashBoardData = {};

    constructor() {
        makeAutoObservable(this, {
            fetchBalance: action.bound,
            clearHomeStore: action.bound,
            fuelUsagesSummary: action.bound,
            fetchTransactions: action.bound,
            getDashboardData: action.bound
        });
    }

    async fetchBalance() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };

            let response = await fetchBalanceService(payloads);

            runInAction(() => {
                this.loading = false;
                this.balance = response?.balance;
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Balance fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
            });
        }
    }

    async fuelUsagesSummary() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };

            let response = await fuelUsagesSummaryService(payloads);

            runInAction(() => {
                this.loading = false;
                // this.usageSummary = response?.balance;
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Failed to Fetch summary';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
            });
        }
    }

    async fetchTransactions() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };

            let response = await fetchTransactionsService(payloads);

            runInAction(() => {
                this.loading = false;
                this.transactions = response?.data;
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Failed to fetch transactions';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
            });
        }
    }

    async clearHomeStore() {
        runInAction(() => {
            this.loading = false;
            this.balance = null;
            this.usageSummary = {};
            this.transactions = [];
        });
    }

    async getDashboardData(){
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };

            let response = await getDashboardDataService(payloads);

            runInAction(() => {
                this.loading = false;
                this.dashBoardData = response?.data;
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Data not found';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
            });
        }
    }

}

export const homeStore = new HomeStore();
