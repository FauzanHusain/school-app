const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
mongoose.connect('mongodb+srv://FauzanHusain:smktelkom123@cluster0.ngjhm.mongodb.net/fauzanhusain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});