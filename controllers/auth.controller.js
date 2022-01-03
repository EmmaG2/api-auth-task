const { validationResult } = require("express-validator");

const errorsValidation = () => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
}

const crearUsuario = ( req, res ) => {

    errorsValidation();

    const { email, username, password } = req.body;
    console.log(email, username, password);

    return res.json({
        ok: true,
        msg: 'Crear usuario /register'
    });

};

const loginUsuario = ( req, res ) => {

    errorsValidation();

    const { email, password } = req.body;
    console.log( email, password );

      return res.json({
        ok: true,
        msg: "Login de usuario /",
      });
};

const renovarToken = ( req, res ) => {

    return res.json({
        ok: true,
        msg: 'Login de usuario /renew'
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};