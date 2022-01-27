// Express server is th logic program. The one who communicate with all files in he application.

/*
***************
SETUP         *
FUNCTIONS     *
VARIABLES     *
***************
*/

// APP CONFIG

const express = require("express");
const { urlsForUser } = require("../../../w3/tinyapp/helpers");
const app = express();
const PORT = 8080; // default port 8080

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const res = require("express/lib/response");
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const { cookie } = require("express/lib/response");


// const cookieParser = require("cookie-parser");
app.use(cookieSession({name: 'session', secret: 'grey-rose-juggling-volcanoes'}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


// variables

const urlDatabase = {   
  "b2xVn2": "http://www.lighthouselabs.ca",   
  "9sm5xK": "http://www.google.com" 
};
const users = {};

///////////////////////////////////////////
/*
ROUTING
*/
// root Login


// functions 
const generateRandomString = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  
  while (randomString.length < 6) {
    randomString += chars[Math.floor(Math.random() * chars.length)];
  }
  // console.log(randomString);
  return randomString;
};

app.get("/", (req, res) => {
  // const userID = req.session.userID;
  if (req.session.userID) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
});

app.get("/urls", (req, res) => {
  const userID = req.session.userID;
  const userUrls = urlsForUser(userID, urlDatabase);
  const templateVars = { urls: userUrls, user: users[userID] };
  res.render('urls_index', templateVars);
});
// // Creation new url page - GET

app.get("/urls/new", (req, res) => {
  if (req.session.userID) {
    const templateVars = {user: users[req.session.userID]};
    res.render('urls_new', templateVars);
  } else {
    res.redirect('/login');
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const userID = req.session.userID;
  const userUrls = urlsForUser(userID, urlDatabase);
  const templateVars = { urlDatabase, userUrls, shortURL, user: users[userID] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  if (req.session.userID) {
    const shortURL = generateRandomString();
    urlDatabase[shortURL] = {
      longURL: req.body.longURL,
      userID: req.session.userID
    };
    res.redirect(`/urls/${shortURL}`);
    return;

  } 
  res.redirect(`/urls/${shortURL}`);

});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(`shortURL: ${shortURL}`);
    delete urlDatabase[shortURL];
  res.redirect("/urls");
}); 

app.post("/urls/:id", (req, res) => {
  res.redirect("/urls")
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  // const { username } = req.body;
  console.log(`username: ${username}`);

  res.cookie('username', username);
  return res.redirect('/urls/new', username);
})

app.post("/logout", (req, res) => {
  res.redirect("/login");
});

  app.get("/register", (req, res) => {
    if (req.session.userID) {
      res.redirect('/urls');
      return;
    }
    const templateVars = {user: users[req.session.userID]};
    res.render('urls_registration', templateVars);
  });

app.post('/register', (req, res) => {
  console.log(req.body);
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Tiny App listening on port ${PORT}!`);
});
