const db = require('./db');

const create =
  'CREATE TABLE IF NOT EXISTS utxos (user TEXT NOT NULL COLLATE NOCASE, contract TEXT NOT NULL COLLATE NOCASE, id TEXT NOT NULL, value UNSIGNED INTEGER, PRIMARY KEY(user, contract, id));';
db.prepare(create).run();

exports.insert = (values) => {
  const stmt = db.prepare('INSERT INTO nonces (user, contract, id, value) values (@user, @contract, @id, @value);');
  return stmt.run(values).lastInsertRowid;
};

exports.replace = (values) => {
  const stmt = db.prepare(
    'INSERT INTO nonces (user, contract, id, value) values (@user, @contract, @id, @value) ON CONFLICT(user, contract, id) DO UPDATE SET value = @value;'
  );
  return stmt.run(values).lastInsertRowid;
};

exports.select = (values) => {
  const stmt = db.prepare('SELECT * FROM nonces WHERE user = @user AND contract = @contract AND id = @id;');
  return stmt.get(values);
};

exports.delete = (values) => {
  const stmt = db.prepare('DELETE FROM nonces WHERE user = @user AND contract = @contract AND id = @id;');
  return stmt.run(values).changes;
};
