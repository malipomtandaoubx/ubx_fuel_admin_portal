/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchCorporatesService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/corporates`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addCorporatesService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/corporates`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateCorporateService(corporateId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/corporates/update/${corporateId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteCorporateService(corporateId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/corporates/${corporateId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function activateCorporateAccountService(corporateId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/corporates/${corporateId}/activate`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deactivateCorporateAccountService(corporateId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/corporates/${corporateId}/deactivate`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function topUpWalletService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/corporates/wallet/topup`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchCorporateTransactionsDataService(corporateId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`management/corporates/${corporateId}/wallet/transactions`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}