const crearUsuario = ( req, res ) => {

    const { email, username, password } = req.body;
    console.log(email, username, password);

    return res.json({
        ok: true,
        msg: 'Crear usuario /register'
    });

};

const loginUsuario = ( req, res ) => {

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