/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchAgentService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.get(`/management/agents`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addAgentService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }
    
    return https.post(`/management/agents`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}