const db = require('./db');

const create = 'CREATE TABLE IF NOT EXISTS configs (key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY(key));';
db.prepare(create).run();

exports.insert = (values) => {
  const stmt = db.prepare('INSERT INTO configs (key, value) values (@key, @value);');
  return stmt.run(values).lastInsertRowid;
};

exports.replace = (values) => {
  const stmt = db.prepare(
    'INSERT INTO configs (key, value) values (@key, @value) ON CONFLICT(key) DO UPDATE SET value = @value;'
  );
  return stmt.run(values).lastInsertRowid;
};

exports.select = (values) => {
  const stmt = db.prepare('SELECT value FROM configs WHERE key = @key');
  const row = stmt.get(values);
  return row ? row.value : row;
};

exports.delete = (values) => {
  const stmt = db.prepare('DELETE FROM configs WHERE key = @key;');
  return stmt.run(values).changes;
};
