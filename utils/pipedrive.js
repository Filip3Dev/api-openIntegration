"use strict";

const axios = require("axios");
const { pipeKey } = require('../config');

const pipeInstance = axios.create({
  baseURL: 'https://api.pipedrive.com/v1',
  timeout: 5000,
});

exports.getAllDeals = async () => {
    try {
        const { data: { additional_data, data, success } } = await pipeInstance.get(`deals?status=won&start=0&api_token=${pipeKey}`)
        return { success, additional_data, data };
    } catch (error) {
        return { success: false, error: JSON.stringify(error) };
    }
}

exports.getTimelineDeals = async (date) => {
    try {
        const { data: { additional_data, data, success } } = await pipeInstance.get(`deals/timeline?start_date=${date}&interval=day&amount=1&field_key=update_time&api_token=${pipeKey}`)
        return { success, additional_data, data };
    } catch (error) {
        const { status, statusText } = error.response;
        return { success: false, data: { status, statusText } };
    }
}