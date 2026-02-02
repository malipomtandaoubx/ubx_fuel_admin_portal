/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function addTellerService(payload, id, token) {
    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/merchants/${id}/teller`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}