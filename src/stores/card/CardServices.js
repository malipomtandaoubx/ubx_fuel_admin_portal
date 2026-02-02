/* eslint-disable prettier/prettier */
import { https } from "../../https/API"

export function fetchCardLevelService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/card/levels`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addCardLevelService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/card/levels`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateCardLevelService(cardId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/card/levels/${cardId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteCardLevelService(cardId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/card/levels/${cardId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchCardTypeService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/card/types`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addCardTypeService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/card/types`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateCardTypeService(cardId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/card/types/${cardId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteCardTypeService(cardId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/card/types/${cardId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function fetchNfcCardService(payload) {
    const token = payload.token;

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.get(`/management/nfc/cards`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function addNfcCardService(payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.post(`/management/nfc/cards`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function updateNfcCardService(cardId, payload, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.put(`/management/nfc/cards/${cardId}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}

export function deleteNfcCardService(cardId, token) {

    if (!token) {
        throw new Error('Authentication required');
    }

    return https.delete(`/management/nfc/cards/${cardId}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => data);
}