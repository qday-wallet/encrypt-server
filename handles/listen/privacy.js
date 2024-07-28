const { Interface, toUtf8String } = require('ethers');
const { abis, contracts } = require('../../chain');
const { aesDecrypt } = require('./utils');
const { transfer } = require('../events');

const IPrivacy = new Interface(abis.Privacy);

module.exports = {
  interfaces: IPrivacy,
  handles: {
    UTXORecorded: async (log) => {
      const { address, transactionHash, removed } = log;
      if (address.toLowerCase() === contracts.PRIVACY.toLowerCase()) {
        const {
          args: { utxoId, encryptedData },
        } = IPrivacy.parseLog(log);
        try {
          const { from, to, value } = JSON.parse(aesDecrypt(toUtf8String(encryptedData)));
          transfer({
            hash: transactionHash,
            from: from.toLowerCase(),
            to: to.toLowerCase(),
            value,
            status: removed ? 0 : 1,
          });
          console.log('Decrypt data success:', utxoId, from, to, value);
        } catch (error) {
          console.log('Decrypt data fail:', utxoId, encryptedData);
        }
      }
    },
  },
};
