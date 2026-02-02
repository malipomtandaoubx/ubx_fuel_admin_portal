/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchBankService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/bank`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addBankService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/bank`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateBankService(bankId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/bank/${bankId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}