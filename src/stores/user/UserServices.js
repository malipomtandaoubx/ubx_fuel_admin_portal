/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchUsersService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.get(`/management/users`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addUserService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/users`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateUserService(userId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/card/levels/${userId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}
