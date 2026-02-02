/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchMerchantsService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/merchants`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addMerchantService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/merchants`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateMerchantService(merchantId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/merchants/update/${merchantId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteMerchantService(merchantId, token) {

    var payload = {
        merchant_id: merchantId
    }

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`management/merchants`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function activateDeactivateMerchantAccountService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/merchants/status`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}
