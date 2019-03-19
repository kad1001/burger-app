// * Inside the `connection.js` file, setup the code to connect Node to MySQL.

const mysql = require('mysql');

// MySql config
const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
  database: "burgers_db"
});

// Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;