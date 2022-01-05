const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

// Crear un nuevo usuario
router.post( '/register', [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().isLength({ min: 15 }),
    check('password', 'La contraseña es onligatoria').isLength({ min: 10 }),
    validarCampos
], crearUsuario );

// Login de usuario
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], loginUsuario );

// Validar y revalidar token
router.get( '/renew', renovarToken );


module.exports = router;
