"use strict";

const axios = require("axios");
const { blingKey } = require('../config');

const blingInstance = axios.create({
    baseURL: 'https://bling.com.br/Api/v2/',
    timeout: 5000,
});

exports.savePedido = async (data) => {
    return await blingInstance.post(`pedido/json/?xml=${data}&apikey=${blingKey}`)
}