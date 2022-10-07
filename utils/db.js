const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
mongoose.connect('mongodb+srv://FauzanHusain:<password>@cluster0.ngjhm.mongodb.net/dbName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
