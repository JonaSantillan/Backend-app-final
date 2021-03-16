const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
});

module.exports = mongoose.model('usuario', productoSchema)