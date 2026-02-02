/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchNationalityService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.get(`/management/merchants`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchBusinessTypesService(token) {

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.get(`/management/business/types`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchPermissionService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.get(`/management/abilities`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}
