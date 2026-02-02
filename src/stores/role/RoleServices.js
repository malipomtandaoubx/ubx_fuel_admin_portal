/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchRolesService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/roles`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addRolesService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/roles`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateRoleService(deviceId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/roles/${deviceId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteRoleService(deviceId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/roles/${deviceId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}