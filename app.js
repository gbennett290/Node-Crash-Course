const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb+srv://netninja:Gabe5005@node.yvsq3ej.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=NODE';;

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.redirect('/blogs');
});

app.get('/about', (req, res) =>{
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs',blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});