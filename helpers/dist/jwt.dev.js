"use strict";

var jwt = require('jsonwebtoken');

var generarJWT = function generarJWT(uid, username) {
  var payload = {
    uid: uid,
    username: username
  };
  return new Promise(function (resolve, reject) {
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h'
    }, function (err, token) {
      err ? reject(err) : resolve(token);
    });
  });
};

module.exports = {
  generarJWT: generarJWT
};