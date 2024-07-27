const { isAddress, isHexString, Contract, Wallet, toUtf8Bytes } = require('ethers');
const db = require('../db');
const { provider, abis, contracts } = require('../chain');
const { aesEncrypt } = require("./listen/utils");

exports.account = async (ctx) => {
  try {
    const { address } = ctx.query;
    if (!isAddress(address)) {
      throw `address format error`;
    }
    ctx.body = db.accounts.select({ address: address.toLowerCase() });
    if (ctx.body === undefined) {
      ctx.body = { address, balance: "0", lastTxHash: "0x0", lastBlockHeight: "0" };
    }
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.toString() };
    ctx.status = 400;
  }
};

exports.tx = async (ctx) => {
  try {
    const { address } = ctx.query;
    if (!isAddress(address)) {
      throw `address format error`;
    }
    ctx.body = db.transcations.select({ address: address.toLowerCase() });
    if (ctx.body === undefined) {
      ctx.body = [];
    }
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.toString() };
    ctx.status = 400;
  }
};

exports.stakeTx = async (ctx) => {
  try {
    let { key, value } = ctx.request.body;
    if (key.slice(0, 2) != "0x" && key.slice(0, 2) != "0X") {
      key = "0x" + key;
    }
    if (!isHexString(key) || key.length !== 66) {
      throw `key format error`;
    }
    const signer = new Wallet(key, provider);
    const wQday = new Contract(contracts.WQDAY, abis.WQday, signer);
    const privacy = new Contract(contracts.PRIVACY, abis.Privacy, signer);
    await wQday.transfer(contracts.PRIVACY, value);
    const data = `{"from":"0x0","to":"${signer.address}","value":"${value}"}`;
    ctx.body = await privacy.recordUTXO(toUtf8Bytes(aesEncrypt(data)));
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.toString() };
    ctx.status = 400;
  }
};

exports.encryptTx = async (ctx) => {
  try {
    const { key, from, to, value } = ctx.request.body;
    const signer = new Wallet(key, provider);
    const privacy = new Contract(contracts.PRIVACY, abis.Privacy, signer);
    const data = `{"from":"${from}","to":"${to}","value":"${value}"}`;
    // todo 余额校验
    ctx.body = await privacy.recordUTXO(toUtf8Bytes(aesEncrypt(data)));
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.toString() };
    ctx.status = 400;
  }
};
