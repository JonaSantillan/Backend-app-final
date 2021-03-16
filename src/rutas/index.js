const express = require('express')
const authRutas = require('./auth')
const ProductoSchema = require('../schemas/productos')
const router = express.Router();

router.use('/auth', authRutas)
router.use('/', (res, req) => req.send("server running"))

router.route('/productos')
  .get((req, res) => {
      ProductoSchema.find().then((usuarios) => {
        res.status(200).send(usuarios);
      }).catch((error) => {
        res.status(400).send(error);
      });
  })
  .post((req, res) => {
    if (!req.body.name || typeof req.body.name !== 'string') {
      return res.status(400).send({message: 'Nombre invalido'});
    }
    if (typeof req.body.email !== 'string') {
      return res.status(400).send({message: 'Email invalido'});
    }

    const usuario = new ProductoSchema( {
      name: req.body.name,
      email: req.body.email
    })
    usuario.save().then((usuarioNuevo) => {
      res.status(201).send(usuarioNuevo);
    }).catch((error) => {
      res.status(400).send(error);
    });
  })
  .put((req, res) => {
    if (!req.query.id || typeof req.query.id !== 'string') {
      return res.status(400).send({message: 'ID invalido'});
    }
    if (!req.body.name || typeof req.body.name !== 'string') {
      return res.status(400).send({message: 'Nombre invalido'});
    }
    if (typeof req.body.email !== 'string') {
      return res.status(400).send({message: 'Email invalido'});
    }

    ProductoSchema.findByIdAndUpdate( 
      req.query.id,
      {name: req.body.name,
      email: req.body.email}
    ).then((usuarioEditado) => {
      if (!usuarioEditado) {
        return res.status(400).send({message: 'invalido'});
      } else {
        res.status(200).send(usuarioEditado);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  })
  .delete((req, res) => {
    console.log(req.query.id);
    if (!req.query.id) {
      return res.status(400).send({message: 'ID invalido'});
    }
    ProductoSchema.findOneAndDelete({id: req.query.id}).then((usuarioEliminado) => {
      res.status(200).send(usuarioEliminado);
    }).catch((error) => {
      res.status(400).send(error);
    });
  })

module.exports = router