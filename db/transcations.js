const db = require('./db');

const create =
  'CREATE TABLE IF NOT EXISTS transcations (hash TEXT, `from` TEXT, `to` TEXT, value TEXT, status INTEGER, PRIMARY KEY(hash));';
db.prepare(create).run();

exports.insert = (values) => {
  const stmt = db.prepare('INSERT INTO transcations (hash, `from`, `to`, value, status) values (@hash, @from, @to, @value, @status);');
  return stmt.run(values).lastInsertRowid;
};

exports.select = (values) => {
  const stmt = db.prepare('SELECT * FROM transcations WHERE `from` = @address OR `to` = @address ORDER BY rowid DESC LIMIT 1000;');
  return stmt.all(values);
};

