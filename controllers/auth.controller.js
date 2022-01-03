const crearUsuario = ( req, res ) => {

    return res.json({
        ok: true,
        msg: 'Crear usuario /register'
    });

}

module.exports = {
    crearUsuario
}