/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchBalanceService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/customer/balance`, null, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fuelUsagesSummaryService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/customer/balance`, null, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchTransactionsService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/customer/transactions`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function getDashboardDataService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/summary/dashboard`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}