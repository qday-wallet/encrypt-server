const { utils } = require('ethers');
const { abis, contracts, provider } = require('../../chain');
const event = require('../events');

const ITradeCore = new utils.Interface(abis.TradeCore);

module.exports = {
  interfaces: ITradeCore,
  handles: {
    Complete: async (log) => {
      if (log.address === contracts.TradeCore.address) {
        const dLog = ITradeCore.parseLog(log);
        const { timestamp } = await provider.getBlock(log.blockHash);
        const tx = await provider.getTransaction(log.transactionHash);
        const dTx = ITradeCore.parseTransaction(tx);
        event.saleComplete({
          dLog,
          dTx,
          time: timestamp,
        });
      } else {
        console.log(log.address, 'not tradeCore');
      }
    },
    Cancel: async (log) => {
      if (log.address === contracts.TradeCore.address) {
        const dLog = ITradeCore.parseLog(log);
        const { addr, id, user, nonce } = dLog.args;
        event.saleCancel({
          contract: addr,
          id: id.toString(),
          user: user,
          nonce: nonce.toNumber(),
        });
      } else {
        console.log(log.address, 'not tradeCore');
      }
    },
  },
};
