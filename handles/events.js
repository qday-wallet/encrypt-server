const { constants, utils } = require('ethers');
const db = require('../db');
const { contracts } = require('../chain');
require('./listen');

exports.transfer = (params) => {
  const { contract, from, to } = params;
  db.events.strictInsert({
    ...params,
    type: db.events.types.transfer,
  });
  if (from !== to) {
    if (to !== constants.AddressZero) {
      if (contract !== contracts.NFT1155.address) {
        db.external.tryMint(params);
      }
    } else {
      db.external.tryBurn(params);
    }

    db.owner.transfer(params);
  }
};
