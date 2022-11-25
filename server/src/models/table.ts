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
  db.get('PRAGMA foreign_keys = ON');
  return db;
};

export const createTables = () => {
  const db = connectDatabase();
  // Create a table
  let sql = `CREATE TABLE IF NOT EXISTS profiles(
    profileId INTEGER PRIMARY KEY,
    profile TEXT
    );`;
  db.run(sql);
  sql = `CREATE TABLE IF NOT EXISTS tasks(
      taskId INTEGER PRIMARY KEY,
      task TEXT,
      task_date TEXT,
      profileId TEXT, 
      FOREIGN KEY (profileId) REFERENCES profiles(profileId)
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
  const sql = `SELECT * FROM tasks WHERE profileId = ?`;
  return new Promise((resolve, reject) => {
    db.all(sql, [profile], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const create = async (task, task_date, profileId) => {
  const db = connectDatabase();
  const sql = `INSERT INTO tasks(task, task_date, profileId) VALUES (?,?,?)`;
  return new Promise((resolve, reject) => {
    db.all(sql, [task, task_date, profileId], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const remove = async (taskId) => {
  const db = connectDatabase();
  const sql = `DELETE FROM tasks WHERE(taskId) VALUES (?)`;
  return new Promise((resolve, reject) => {
    db.all(sql, [taskId], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const createProfile = async (profile) => {
  const db = connectDatabase();
  const sql = `INSERT INTO profiles(profile) VALUES (?)`;
  return new Promise((resolve, reject) => {
    db.all(sql, [profile], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const findAllProfiles = async () => {
  const db = connectDatabase();
  const sql = `SELECT * FROM profiles`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      console.log(rows);
      resolve(rows);
    });
  });
};

// Drop a table
export const dropTables = () => {
  const db = connectDatabase();
  db.run('DROP TABLE IF EXISTS tasks');
  db.run('DROP TABLE IF EXISTS profiles');
};
