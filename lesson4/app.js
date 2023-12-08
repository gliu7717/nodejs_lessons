const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://gliu:WV1udRJDbMzZjCOK@cluster0.1t0asvw.mongodb.net/android?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(result => {
        app.listen(3000);
        console.log("Server started at port 3000")
    }
  )
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/users');
});


// blog routes
app.get('/users/create', (req, res) => {
  res.render('create', { title: 'Create a new user' });
});

app.get('/users', (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { users: result, title: 'All Users' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/users', (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);

  user.save()
    .then(result => {
      res.redirect('/users');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(result => {
      res.render('details', { user: result, title: 'User Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  
  User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/users' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});