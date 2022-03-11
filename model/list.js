const mongoose = require('mongoose');

const List = mongoose.model('List', {
    nama: {
        type: String,
        required: true
    },
    nis: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nowa: {
        type: String,
        required: true
    },
    jurusan: {
        type: String,
        required: true
    }
});

module.exports = List;