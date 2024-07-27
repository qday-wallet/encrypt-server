const ethers = require('ethers');
const abis = require('./abis');
const { NETWORKS } = require('./constants');
const { WQDAY, PRIVACY } = require("../config");

const network = NETWORKS.qday;
const { rpcUrl, wsUrl } = network;


exports.network = network;
exports.provider = new ethers.JsonRpcProvider(wsUrl || rpcUrl);
exports.abis = abis;
exports.contracts = { WQDAY, PRIVACY };
