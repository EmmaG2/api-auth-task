const { Router } = require('express');
const { crearUsuario } = require('../controllers/auth.controller');

const router = Router();

// Crear un nuevo usuario
router.post( '/register', crearUsuario );

// Login de usuario
router.post( '/', ( req, res ) => {

    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });

});

// Validar y revalidar token
router.get( '/renew', ( req, res ) => {

    return res.json({
        ok: true,
        msg: 'Login de usuario /renew'
    });

});


module.exports = router;
