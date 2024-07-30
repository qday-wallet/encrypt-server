const { JsonRpcProvider, Wallet } = require('ethers');
const abis = require('./abis');
const { NETWORKS } = require('./constants');
const { PRV_KEY, CHAIN, WQDAY, PRIVACY } = require('../config');

const network = NETWORKS[CHAIN];
const { rpcUrl, wsUrl } = network;

exports.network = network;
exports.provider = new JsonRpcProvider(wsUrl || rpcUrl);
exports.signer = new Wallet(PRV_KEY, this.provider);
exports.abis = abis;
exports.contracts = { WQDAY, PRIVACY };
