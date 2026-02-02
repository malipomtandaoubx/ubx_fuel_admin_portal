/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchCustomersService(token) {
    
    return https.get(`/management/customers`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchCustomerRolesService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.get(`/management/roles`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addCustomersService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.post(`/management/users`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}