const { Contract, Wallet, ZeroAddress } = require('ethers');
const { isAddress, toUtf8Bytes } = require('ethers');
const db = require('../db');
const { provider, signer, abis, contracts } = require('../chain');
const { aesEncrypt } = require('./listen/utils');
require('./listen');

exports.account = async (ctx) => {
  try {
    const { address } = ctx.query;
    if (!isAddress(address)) {
      throw `address format error`;
    }
    ctx.body = db.accounts.select({ address: address.toLowerCase() });
    if (ctx.body === undefined) {
      ctx.body = { address, balance: '0', lastTxHash: '0x0' };
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
    ctx.body = db.transcations.all({ address: address.toLowerCase() });
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
    value = BigInt(value).toString(10);
    const signer = new Wallet(key, provider);
    const wQday = new Contract(contracts.WQDAY, abis.WQday, signer);
    const privacy = new Contract(contracts.PRIVACY, abis.Privacy, signer);
    await wQday.transfer(contracts.PRIVACY, value);
    const data = `{"from":"${ZeroAddress}","to":"${signer.address.toLowerCase()}","value":"${value}"}`;
    ctx.body = await privacy.recordUTXO(toUtf8Bytes(aesEncrypt(data)));
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.toString() };
    ctx.status = 400;
  }
};

exports.encryptTx = async (ctx) => {
  try {
    let { from, to, value } = ctx.request.body;
    if (!isAddress(from)) {
      throw `from format error`;
    }
    if (!isAddress(to)) {
      throw `to format error`;
    }
    from = from.toLowerCase();
    to = to.toLowerCase();
    value = BigInt(value).toString(10);
    const privacy = new Contract(contracts.PRIVACY, abis.Privacy, signer);
    const data = `{"from":"${from}","to":"${to}","value":"${value}"}`;
    const account = db.accounts.select({ address: from });
    if (BigInt(account ? account.balance : '0') < BigInt(value)) {
      throw `account balance not enough`;
    }
    ctx.body = await privacy.recordUTXO(toUtf8Bytes(aesEncrypt(data)));
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.toString() };
    ctx.status = 400;
  }
};
