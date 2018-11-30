'use strict';
const mysql = require('mysql2');

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT * FROM wt_media',
      (err, results, fields) => {
        console.log(err);
        callback(results, res);
      },
  );
};

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO wt_media (category, title, details, thumbnail, image, original, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(err);
        callback();
      },
  );
};

const update = (data, connection, callback) => {
  connection.execute(
      `UPDATE wt_media SET category = ?, title = ?, details = ? WHERE mID = ?;`,
      data,
      (err, results, fields) => {
        console.log(err);
        callback();
      },
  );
};

const remove = (data, connection, callback) => {
  connection.execute(
      `DELETE FROM wt_media WHERE mID = ?;`,
      [data],
      (err, results, fields) => {
        console.log(err);
        callback();
      },
  );
};

const search = (text, connection, callback, res) => {
  connection.query(
      'SELECT * FROM wt_media WHERE category LIKE "%' + text + '%" OR title LIKE "%' + text + '%" OR details LIKE "%' + text + '%"',
      (err, results, fields) => {
        if(err) console.log(err);
        else callback(results, res);
      },
  );
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  update: update,
  remove: remove,
  search: search,
};