const connection = require('./connection');

function questionMark(num) {
    let ar = [];
    for (var i = 0; i < num; i++) {
        ar.push("?");
    }
    return ar
}


function toSql(ob) {
    let array = [];
    for (var key in ob) {
        array.push(key + "=" + ob[key]);
    }
    return array
}

// ORM object to perform SQL queries
module.exports = {

    // Function that returns all table entries
    selectAll: function (tableInput, cb) {
        // Construct the query string that returns all rows from the target table
        let queryString = "SELECT * FROM " + tableInput + ";";

        // Perform the database query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    },

    // Function that insert a single table entry
    insertOne: function (table, cols, vals, cb) {
        // Construct the query string that inserts a single row into the target table
        let queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + questionMark(vals.length) + ") ";

        // Perform the database query
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            // Return results in callback
            cb(result);
        });
    },

    // Eat the burger!!!
    updateOne: function (table, objColVals, condition, cb) {
        // Construct the query string that updates a single entry in the target table
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += toSql(objColVals); //"devoured = 1"//
        queryString += " WHERE ";
        queryString += condition;

        // console.log(queryString);

        // Perform the database query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    }
};