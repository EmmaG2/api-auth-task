const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res ) => {

    const { email, username, password } = req.body;

    try {

        // verificar el email
        const user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        let dbUser = new User( req.body );

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar JWT 
        const token = await generarJWT( dbUser.id, username );

        // Crear usuario DB
        dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            username,
            token
        });
        
    } catch ( error ) {
        console.log( error );
        
        return res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador'
        });
    }

};

const loginUsuario = async ( req, res ) => {

    const { email, password } = req.body;

    try {

        // Confirmar que la contraseña sea válida
        const dbUser = await User.findOne({ email });
        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'correo o contraseña inválidos'
            });
        }

        // Confirmar que la contraseña haga match
        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if ( !validPassword ) {
            return res.status(400).json({
              ok: false,
              msg: 'Correo o contraseña inválidos'
            });
        }

        // Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.username );

        // Respuesta del servicio



    } catch ( error ) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const renovarToken = ( req, res ) => {

    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      username: dbUser.username,
      token
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};