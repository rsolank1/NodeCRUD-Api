
let dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
}

const mysql = require('mysql');

exports.executeSql = (sql, data, callback) => {

    var connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error(err.message);
            callback(null, err);
        } else {
            connection.query(sql, data, (err, result) => {
                if (err) {
                    console.error(err.message);
                    callback(null, err);
                } else if (result) {
                    callback(result);
                }
            });
        }
    });
}