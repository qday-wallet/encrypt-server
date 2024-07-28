const { transcations, accounts, rowDB } = require('../db');

exports.transfer = (params) => {
  rowDB.transaction(() => {
    transcations.insert(params);
    const { hash, from, to, value, status } = params;
    if (status === 0) {
      return;
    }
    let account = accounts.select({ address: from });
    accounts.replace({
      address: from,
      balance: (BigInt(account ? account.balance : '0') - BigInt(value)).toString(10),
      lastTxHash: hash,
    });
    account = accounts.select({ address: to });
    accounts.replace({
      address: to,
      balance: (BigInt(account ? account.balance : '0') + BigInt(value)).toString(10),
      lastTxHash: hash,
    });
  })();
};
