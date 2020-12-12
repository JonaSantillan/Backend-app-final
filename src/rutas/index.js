const express = require('express')
const authRutas = require('./auth')

const router = express.Router();

router.use('/auth', authRutas)

module.exports = router