// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, year INTEGER)");
  db.run("CREATE TABLE grades (id INTEGER PRIMARY KEY, user_id INTEGER, subject TEXT, grade INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");
});

module.exports = db;
