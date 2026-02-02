/* eslint-disable prettier/prettier */
import { makeAutoObservable, runInAction, action } from 'mobx';
import { fetchCardLevelService, addCardLevelService, updateCardLevelService, deleteCardLevelService, fetchCardTypeService, addCardTypeService, updateCardTypeService, deleteCardTypeService, fetchNfcCardService, addNfcCardService, updateNfcCardService, deleteNfcCardService } from './CardServices';
import { authStore } from '../auth/AuthStore';

class CardStore {
    loading = false;
    error = null;
    cardLevelData = [];
    cardTypeData = [];
    nfcCardData = [];

    constructor() {
        makeAutoObservable(this, {
            fetchCardLevel: action.bound,
            addCardLevel: action.bound,
            updateCardLevel: action.bound,
            deleteCardLevel: action.bound,
            fetchCardType: action.bound,
            addCardType: action.bound,
            updateCardType: action.bound,
            deleteCardType: action.bound,
            fetchNfcCard: action.bound,
            addNfcCard: action.bound,
            updateNfcCard: action.bound,
            deleteNfcCard: action.bound,
            clearCardLevelStore: action.bound,
        });
    }

    async fetchCardLevel() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchCardLevelService(payloads);

            runInAction(() => {
                this.loading = false;
                this.cardLevelData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Card level fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.cardLevelData = [];
            });
        }
    }

    async addCardLevel(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addCardLevelService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add card level failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateCardLevel(cardId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateCardLevelService(cardId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update card level failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteCardLevel(cardId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteCardLevelService(cardId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete card level failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async fetchCardType() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchCardTypeService(payloads);

            runInAction(() => {
                this.loading = false;
                this.cardTypeData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'Card type fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.cardTypeData = [];
            });
        }
    }

    async addCardType(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addCardTypeService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add card type failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateCardType(typeId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateCardTypeService(typeId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update card type failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteCardType(cardId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteCardTypeService(cardId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete card type failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async fetchNfcCard() {
        this.loading = true;
        this.error = null;
        try {
            const token = authStore.token;

            const payloads = {
                token: token,
            };
            let response = await fetchNfcCardService(payloads);

            runInAction(() => {
                this.loading = false;
                this.nfcCardData = response?.data || [];
            });

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || 'NFC Card fetch failed';

            runInAction(() => {
                this.error = errorMessage;
                this.loading = false;
                this.nfcCardData = [];
            });
        }
    }

    async addNfcCard(payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await addNfcCardService(payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Add nfc card failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async updateNfcCard(cardId, payload) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await updateNfcCardService(cardId, payload, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Update nfc card failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async deleteNfcCard(cardId) {
        this.loading = true;
        this.error = null;

        try {
            const token = authStore.token;
            const response = await deleteNfcCardService(cardId, token);

            runInAction(() => {
                this.loading = false;
            });

            // Return the response for further handling in component
            return response;

        } catch (err) {
            let errorMessage = err?.response?.data?.message || err?.message || "Delete nfc card failed";
            let errorFields = err?.response?.data?.errors || null;

            runInAction(() => {
                this.error = { message: errorMessage, errors: errorFields };
                this.loading = false;
            });

            // Throw the error to handle it in component
            throw err;
        }
    }

    async clearCardLevelStore() {
        runInAction(() => {
            this.loading = false;
            this.cardLevelData = [];
            this.cardTypeData = [];
        });
    }
}

export const cardStore = new CardStore();