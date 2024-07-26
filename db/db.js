const Database = require('better-sqlite3');
const db = new Database('service.db');

module.exports = db;
