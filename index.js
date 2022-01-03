const express = require('express');
const cors = require('cors');
require('dotenv').config();

// crear el server
const app = express();
const port = process.env.PORT; 

// Directorio público
app.use( express.static('public') )

// CORS
app.use( cors() );

// lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require( './routes/auth.js' ) );

app.listen( port, () => {
    console.log(`server corriendo en el puerto ${ port }`);
})