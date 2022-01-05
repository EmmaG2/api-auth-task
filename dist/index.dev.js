"use strict";

var express = require('express');

var cors = require('cors');

var _require = require('./db/config.js'),
    dbConnection = _require.dbConnection;

require('dotenv').config(); // crear el server


var app = express();
var port = process.env.PORT; // Db

dbConnection(); // Directorio público

app.use(express["static"]('public')); // CORS

app.use(cors()); // lectura y parseo del bodyasdf 

app.use(express.json()); // Rutas

app.use('/api/auth', require('./routes/auth.js'));
app.listen(port, function () {
  console.log("server corriendo en el puerto ".concat(port));
});