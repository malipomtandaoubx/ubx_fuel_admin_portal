/* eslint-disable prettier/prettier */
import axios from "axios";
export const base_url = "https://uhurupaytestapi.ubx.co.tz/api/v1";
export const download_url = "https://uhurupaytestapi.ubx.co.tz/";
export const api_route = "";


export const https = axios.create(
    {
        baseURL: `${base_url}`
    }
);
