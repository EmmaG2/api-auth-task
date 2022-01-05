const jwt = require('jsonwebtoken')

const generarJWT = ( uid, username ) => {

    const payload = { uid, username };

    return new Promise( (resolve, reject) => {
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
        expiresIn: '24h'
        }, (err, token) => {
        err ? reject(err) : resolve(token);
         })
    });

}

module.exports = {
    generarJWT
};