const express = require('express')
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create_table_command = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;

const sql = `INSERT INTO people(name) values('Darlan')`;

connection.query(create_table_command)
connection.query(sql)

app.get('/', (req, res) => {
    var response = `<h1>Full Cycle Rocks!</h1>`
    connection.query('SELECT name FROM people', function(err, results){
        if (err) {
            throw err;
        }
        response = response + `<ul>`
        results.forEach(function(item) {
            response = response + `<li>${item.name}</li>`
        })
        response = response + `</ul>`
        res.send(response);
    });
});

app.listen(port, () => {
    console.log("running in port "+port+"....");
});

