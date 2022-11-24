const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to DB
export const connectDatabase = () => {
  const db = new sqlite3.Database(
    // '../db/database.db',
    path.resolve(__dirname, '../db/database.db'),
    (err) => {
      if (err) return console.error(err);
    }
  );
  return db;
};

export const createTable = () => {
  const db = connectDatabase();
  // Create a table
  const sql = `CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    profile TEXT DEFAULT "default_profile" NOT NULL,
    task TEXT
    );`;
  db.run(sql);
};

export const findAll = async () => {
  const db = connectDatabase();
  const sql = `SELECT * FROM tasks`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const findByProfile = async (profile) => {
  const db = connectDatabase();
  const sql = `SELECT * FROM tasks WHERE profile = ?`;
  return new Promise((resolve, reject) => {
    db.all(sql, [profile], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const create = async (task, profile = 'default_profile') => {
  console.log(task, profile);
  const db = connectDatabase();
  const sql = `INSERT INTO tasks(profile, task) VALUES (?,?)`;
  // return db.all(sql, [profile, task]);
  return new Promise((resolve, reject) => {
    db.all(sql, [profile, task], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

// Drop a table
// db.run('DROP TABLE users');

// Insert data into database
// sql = `INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)`;
// db.run(
//   sql,
//   ['second', 'third', 'last', 'first', 'another_mail@mail.com'],
//   (err) => {
//     if (err) return console.error(err.message);
//   }
// );

// // Updata data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ['newRandomName', 1], (err) => {
//   if (err) return console.error(err.message);
// });

// Delete data
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, [1], (err) => {
//   if (err) return console.error(err.message);
// });

// Query the data
