/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchBusinessTypesService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/business/types`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addBusinessTypesService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/business/types`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateBusinessTypesService(businessId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/business/types/${businessId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteBusinessTypesService(businessId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/business/types/${businessId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}