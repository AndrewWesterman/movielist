const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    release_date: {
        type: Date,
        required: true,
    },
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
