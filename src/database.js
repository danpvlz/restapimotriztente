process.env.PORT
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'bbyoozip4dqamyfg4ehp-mysql.services.clever-cloud.com',
  user: 'u4stqwk7jvaaldbg',
  password: 'l6joEfd1cMrK9KQEGwcN',
  database: 'bbyoozip4dqamyfg4ehp',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
