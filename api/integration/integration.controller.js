'use strict';

const Deal = require("../../models/Deal");
const pipedrive = require('../../utils/pipedrive');
const bling = require('../../utils/bling');
const xml2js = require('xml2js');

exports.listData = async ctx => {
  const { page = 1, limit = 10 } = ctx.query;
  const deals = await Deal.find({}).limit(parseInt(limit) * 1).skip((parseInt(page) - 1) * parseInt(limit)).sort({ createdAt: -1 });
  const count = await Deal.countDocuments();
  
  ctx.status = 200;
  ctx.body = {
    deals,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};

exports.loadData = async (date = new Date()) => {
  console.log('Save into DB!');
  try {
    let date_get = new Date(date).toJSON().slice(0, 10);
    const { data, additional_data, success  } = await pipedrive.getTimelineDeals(date_get);
    if (success) {
      let { deals, totals: { won_count, won_values } } = data[0];
      deals = deals.filter((elem) => elem.status === 'won');
      saveBling(deals);
      won_values = won_values.BRL;
      let deal_return = await new Deal({ deals, won_count, won_values});
      deal_return = await deal_return.save();
      return true;
    }
    console.log('loadData: ', data);
    return false;
  } catch (error) {
      console.log('loadData ERROR: ', error);
      return false;
  }
};

async function saveBling(deals) {
  for await (let obj of deals) {
    let { person_name, value } = obj;
    const deal = {
      pedido: {
        cliente: {
          nome: person_name,
          tipoPessoa: "F",
          cpf_cnpj: "05729279329",
          numero: "392",
          complemento: "Sala 54",
          bairro: "Cidade Alta",
          cep: "95.700-000",
          cidade: "Bento",
          uf: "RS",
          fone: "5481153376",
          email: "teste@teste.com.br"
        },
        itens: {
          item: [
            { codigo: "001", descricao: "SERVICO", un: "UN", qtde: "1", vlr_unit: value },
          ]
        },
        parcelas: {
          parcela: [
            { vlr: value },
          ]
        },
      } 
    }
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(deal);
    await bling.savePedido(xml);
  }
}