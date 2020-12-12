const express = require('express')
const UsuarioSchema = require('../../schemas/usuarios')

const router = express.Router();

router
  .route('/login')
  .post((req, res) => {
    if(!req.body.email || typeof req.body.email !== 'string') {
      return res
        .status(400)
        .send({ message: "Email no valido" })
    }
    if(!req.body.password || typeof req.body.password !== 'string') {
      return res
        .status(400)
        .send({ message: "Contraseña no valida" })
    }
    UsuarioSchema.findOne({ email: req.body.email, password: req.body.password})
      .then((usuario) => {
        if(usuario) {
          res
            .status(200)
            .send(usuario)
        } else {
          res
            .status(404)
            .send({ message: "Email o contraseña incorrecta" })
        }
      })
      .catch((error) => {
        res
          .status(400)
          .send(error)
      })
  })

router
  .route('/usuario')
  .post((req, res) => {
    if(!req.body.name || typeof req.body.name !== 'string') {
      return res
        .status(400)
        .send({ message: "Nombre no valido" })
    }
    if(!req.body.email || typeof req.body.email !== 'string') {
      return res
        .status(400)
        .send({ message: "Email no valido" })
    }
    if(!req.body.password || typeof req.body.password !== 'string') {
      return res
        .status(400)
        .send({ message: "Contraseña no valida" })
    }
    const usuario = new UsuarioSchema({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    usuario.save()
      .then((usuarioCreado) => {
        res
          .status(201)
          .send(usuarioCreado)
      })
      .catch((error) => {
        res
          .status(400)
          .send(error)
      })
  })

module.exports = router