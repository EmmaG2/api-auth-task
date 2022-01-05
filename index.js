const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config.js');
require('dotenv').config();

// crear el server
const app = express();
const port = process.env.PORT; 

// Db
dbConnection();

// Directorio público
app.use( express.static('public') )

// CORS
app.use( cors() );

// lectura y parseo del bodyasdf 
app.use( express.json() );

// Rutas
app.use( '/api/auth', require( './routes/auth.js' ) );

app.listen( port, () => {
    console.log(`server corriendo en el puerto ${ port }`);
})