const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 3000;

// panggil mongodb
require('./utils/db');
const List = require('./model/list');

// setup method override
app.use(methodOverride('_method'))

// setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    saveUninitialized: true
}));
app.use(flash());

// halaman home
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Beranda'
    });
});

// halaman jurusan
app.get('/jurusan', (req, res) => {
    res.render('jurusan', {
        title: 'Daftar Jurusan'
    });
});

// halaman form daftar
app.get('/add', (req, res) => {
    res.render('add-siswa', {
        title: 'Form Daftar',
        msg: req.flash('msg')
    });
});

// menambahkan data contact dengan validasi
app.post('/siswa', [
    // validasi
    check('email', 'Email Tidak Valid!').isEmail(),
    check('nowa', 'Nomor Hp Tidak Valid!').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.render('add-siswa', {
            title: 'Form Daftar',
            errors: errors.array(),
        })
    } else {
        List.insertMany(req.body, (error, result) => {
            // kirimkan flash massage
            req.flash('msg', 'Siswa berhasil ditambahkan!');
            res.redirect('/add');
        })
    }
});

app.listen(PORT) => {
    console.log(`Server is Listening on Port ${PORT}`);
});
