const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  const users = [
    {name: 'Gerry Liu', profile: 'android developer'},
    {name: 'Ben Liu', profile: 'nodejs developer'},
    {name: 'Ray Liu', profile: 'c# developer'},
  ];
  res.render('index', { title: 'Home', users });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/users/create', (req, res) => {
  res.render('create', { title: 'Create a new user' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
