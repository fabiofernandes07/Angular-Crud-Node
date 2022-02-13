const mongoose = require('mongoose')

const Element = mongoose.model('Element', {
    position: Number,
    name: String,
    weight: Number,
    symbol: String
})

module.exports = Element