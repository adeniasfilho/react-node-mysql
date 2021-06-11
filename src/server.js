const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');

const app = express();

app.use(myconn(mysql, {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'vareshow123',
    database: 'images'
}))
app.use(cors());
app.use(express.static(path.join(_dirname, 'imagesdb')))
app.listen(9000, () => {
    console.log('server running on', 'http://localhost: ' + 9000);
});

module.exports = server;