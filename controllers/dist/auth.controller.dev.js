"use strict";

var User = require('../models/User');

var bcrypt = require('bcryptjs');

var _require = require('../helpers/jwt'),
    generarJWT = _require.generarJWT;

var crearUsuario = function crearUsuario(req, res) {
  var _req$body, email, username, password, user, _dbUser, salt, _token;

  return regeneratorRuntime.async(function crearUsuario$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            ok: false,
            msg: 'Un usuario ya existe con ese email'
          }));

        case 7:
          // Crear usuario con el modelo
          _dbUser = new User(req.body); // Hashear la contraseña

          salt = bcrypt.genSaltSync();
          _dbUser.password = bcrypt.hashSync(password, salt); // Generar JWT 

          _context.next = 12;
          return regeneratorRuntime.awrap(generarJWT(_dbUser.id, username));

        case 12:
          _token = _context.sent;

          // Crear usuario DB
          _dbUser.save(); // Generar respuesta exitosa


          return _context.abrupt("return", res.status(201).json({
            ok: true,
            uid: _dbUser.id,
            username: username,
            token: _token
          }));

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

var loginUsuario = function loginUsuario(req, res) {
  var _req$body2, email, password, _dbUser2, validPassword, _token2;

  return regeneratorRuntime.async(function loginUsuario$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          _dbUser2 = _context2.sent;

          if (_dbUser2) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            ok: false,
            msg: 'correo o contraseña inválidos'
          }));

        case 7:
          // Confirmar que la contraseña haga match
          validPassword = bcrypt.compareSync(password, _dbUser2.password);

          if (validPassword) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            ok: false,
            msg: 'Correo o contraseña inválidos'
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(generarJWT(_dbUser2.id, _dbUser2.username));

        case 12:
          _token2 = _context2.sent;
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
          }));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

var renovarToken = function renovarToken(req, res) {
  return res.status(201).json({
    ok: true,
    uid: dbUser.id,
    username: dbUser.username,
    token: token
  });
};

module.exports = {
  crearUsuario: crearUsuario,
  loginUsuario: loginUsuario,
  renovarToken: renovarToken
};