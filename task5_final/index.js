'use strict';
require('dotenv').config();
const express = require('express');
const db = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');
const fs = require('fs');
const https =require('https');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const session = require('express-session');



const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

const connection = db.connect();

const cb = (result, res) => {
  console.log(result);
  res.send(result);
};

app.use(express.static('public'));

passport.serializeUser((user, done) => {
  console.log('serialize: ' + user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({

  secret:'keyboard LOL cat',
  resave:true,
  saveUninitialized:true,
  cookie: {secure:true}

}));

passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Way to go: ' + username);
      if (username !== process.env.USR_NAME || password !== process.env.USR_PWD) { return done(null, false); }
      return done(null, { username: username } );
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', { successRedirect: '/node/profile.html', failureRedirect: '/node/index.html' }));

app.set('trust proxy');
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

const options = {
  key: sslkey,
  cert: sslcert
};

console.log('hello there....');

app.get('/', (req,res) => {
  if (req.secure) {
    console.log(req.user);
    if(req.user !== undefined) res.send('Hello ' + req.user.username);
    else res.send('https :)');
  }
  else res.send('hello not secure?');
});


// respond to post and save file
app.post('/upload', upload.single('mediafile'), (req, res, next) => {
  next();
});

// create thumbnail
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300,
      './public/thumbs/' + req.file.filename + '_thumb', next);
});

// create medium image
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 640,
      './public/medium/' + req.file.filename + '_medium', next);
});

// get coordinates
app.use('/upload', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  }).catch(() => {
    console.log('No coordinates');
    req.coordinates = {};
    next();
  });
});

// insert to database
app.use('/upload', (req, res, next) => {
  console.log('insert is here');
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.file.filename + '_thumb',
    req.file.filename + '_medium',
    req.file.filename,
    req.coordinates,
  ];
  db.insert(data, connection, next);
});

// get updated data form database and send to client
app.use('/upload', (req, res) => {
  db.select(connection, cb, res);
});

app.get('/images', (req, res) => {
  db.select(connection, cb, res);
});
//update item on the database
app.patch('/images', (req, res, next) => {
  console.log('body', req.body);
  res.send(JSON.stringify(req.body));

  db.update(req.body, connection, next);
});

app.get('/search/:value', (req, res, next) => {
  //eval(require('locus'));
  const text = req.params.value;
  //console.log('search word: ', text);
  //res.send(console.log('search word: ', text));
  db.search(text, connection, searchResults, res);
});


const searchResults = (data, res) => {
  res.send(data.map((image) => {
    return {
      'mID': image.mID,
      'category': image.category,
      'title': image.title,
      'details': image.details,
      'coordinates': image.coordinates,
      'thumbnail': image.thumbnail,
      'image': image.image,
      'original': image.original};
    }
  ));
};


app.delete('/delete', (req, res, next) => {
  console.log('deleteID', req.body);
  //res.send(JSON.stringify(req.body));
  const id = req.body[0];
  const imageName = req.body[1];
  //console.log('id for del: ' + id);
  db.remove(id, connection, next);

  //remove files from server
  fs.unlink('./public/uploads/' + imageName, (err) => {
    if (err) console.log(err);
  });

  fs.unlink('./public/thumbs/' + imageName + '_thumb', (err) => {
    if (err) console.log('thumb img: ' + err);
  });

  fs.unlink('./public/medium/' + imageName + '_medium', (err) => {
    if (err) console.log('medium img: ' + err);
  });
});

//app.listen(3000);
http.createServer((req,res)=>{
  const redir ='https://' + req.headers.host + '/node' + req.url;
  console.log(redir);
  res.writeHead(301,{'Location': redir});
  res.end();
}).listen(8000);
https.createServer(options,app).listen(3000);

