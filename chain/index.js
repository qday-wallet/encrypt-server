require('dotenv').config({ path: '../../.env' });
const ethers = require('ethers');
const constants = require('./constants');
const abis = require('./abis');
const { NETWORKS } = require('./constants');

const network = NETWORKS.localhost;
const { chainId, rpcUrl, wsUrl } = network;

const allContracts = (() => {
  try {
    return require('./contracts.json');
  } catch (_) {
    return {};
  }
})();

exports.network = network;
exports.provider = new ethers.JsonRpcProvider(wsUrl || rpcUrl);
exports.constants = constants;
exports.abis = abis;
exports.contracts = allContracts[chainId];
