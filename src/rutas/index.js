const express = require('express')
const authRutas = require('./auth')

const router = express.Router();

router.use('/auth', authRutas)
router.use('/', (res, req) => req.send("server running"))

module.exports = router