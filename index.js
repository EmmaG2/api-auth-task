const express = require('express');

// crear el server

const app = express();
const port = 3000;

// Rutas
app.use( '/api/auth', require( './routes/auth.js' ) );

app.listen( port, () => {
    console.log(`server corriendo en el puerto ${ port }`);
} )