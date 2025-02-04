const db = require('./db');

const create =
  'CREATE TABLE IF NOT EXISTS accounts (address TEXT, balance TEXT, lastTxHash TEXT, PRIMARY KEY(address));';
db.prepare(create).run();

exports.insert = (values) => {
  const stmt = db.prepare(
    'INSERT INTO accounts (address, balance, lastTxHash) values (@address, @balance, @lastTxHash);'
  );
  return stmt.run(values).lastInsertRowid;
};

exports.replace = (values) => {
  const stmt = db.prepare(
    'INSERT INTO accounts (address, balance, lastTxHash) values (@address, @balance, @lastTxHash) ON CONFLICT(address) DO UPDATE SET balance = @balance, lastTxHash = @lastTxHash;'
  );
  return stmt.run(values).lastInsertRowid;
};

exports.select = (values) => {
  const stmt = db.prepare(`SELECT * FROM accounts WHERE address = @address;`);
  return stmt.get(values);
};

exports.delete = (values) => {
  const stmt = db.prepare('DELETE FROM accounts WHERE address = @address;');
  return stmt.run(values).changes;
};
