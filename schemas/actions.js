const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    given: {
        type: Number,
        default: 0
    },
    bark: {
        type: Number,
        default: 0,
    },
    bite: {
        type: Number,
        default: 0
    },
    boop: {
        type: Number,
        default: 0
    },
    hug: {
        type: Number,
        default: 0
    },
    kiss: {
        type: Number,
        default: 0
    },
    nuzzle: {
        type: Number,
        default: 0
    },
    pet: {
        type: Number,
        default: 0
    },
    poke: {
        type: Number,
        default: 0
    },
    slap: {
        type: Number,
        default: 0
    },
    spank: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('actions', schema)