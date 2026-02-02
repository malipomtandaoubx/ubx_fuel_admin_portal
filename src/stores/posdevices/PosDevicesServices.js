/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchPosDevicesService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/pos`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addPosDevicesService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/pos`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updatePosDevicesService(deviceId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/pos/${deviceId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deletePosDevicesService(deviceId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/pos/${deviceId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}