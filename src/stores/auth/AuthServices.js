/* eslint-disable prettier/prettier */
import { https } from "../../https/API"


export function LoginService(payload) {
    return https.post(`/auth/management/login`, payload).then(({ data }) => data);
}

export function fetchCountryService() {
    return https.get(`/pub/nationalities`).then(({ data }) => data);
}

export function updateProfileService(payload, token) {
    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/auth/account/update`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}