const ethers = require('ethers');
const db = require('../db');
const { signer, contracts } = require('../chain');

exports.account = async (ctx) => {
  try {
    const contract = contracts.NFT1155.address;
    const { name, description, amount = 1, collectionId, creator, royaltyRatio = 0 } = ctx.request.body;

    ctx.body = { contract };
  } catch (err) {
    ctx.throw(400, err);
  }
};

exports.stakeTx = async (ctx) => {};

exports.encryptTx = async (ctx) => {};
