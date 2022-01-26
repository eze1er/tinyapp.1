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
app.use(bodyParser.urlencoded({extended: true}));

const cookieSession = require('cookie-session');
const { cookie } = require("express/lib/response");
// const cookieParser = require("cookie-parser");
app.use(cookieSession({name: 'session', secret: 'grey-rose-juggling-volcanoes'}));
app.use(cookieParser());
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

// app.get("/urls.json", (req, res) => {
//   console.log(urlDatabase);
//   res.json(urlDatabase);
// });
app.get("/", (req, res) => {
  const templateVars = {
    username: req.cookies['username'],
  };
  // res.render("urls_new", templateVars);
  // console.log(`templateVars: ${templateVars}`);
  res.redirect("/login");
  
});

app.get("/urls", (req, res) => {
  
  const templateVars = { urls: urlDatabase };
  console.log(templateVars);
  res.render("urls_index", templateVars);
});
// Creation new url page - GET

app.get("/urls/new", (req, res) => {
  // const username = req.cookies.username;
  // if (username == null || username == undefined) {
  //   return res.redirect('/login');
  // }
  const templateVars = {

    username: req.cookies['username'],
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL]
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  
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
}) 

app.post("/urls/:id", (req, res) => {
  res.redirect("/urls")
})

// app.get("/login", (req, res) => {
//   return res.end('You must be login');
//   res.render('/login');
// })

app.post("/login", (req, res) => {
  // const username = req.body.username;
  const { username } = req.body;
  res.cookie('username', username);
  return res.redirect('/urls/new');
  // const templateVars = {
  //   username: req.cookies["username"],
  // };
  // // console.log(`user: ${user}`);
  // res.render("/urls", templateVars);
})

app.post("/logout", (req, res) => {

  res.redirect("/login");
});

app.get("/register", (req, res) => {
//   if user is logged in:
// (Minor) redirects to /urls
// if user is not logged in:
// returns HTML with:
// a form which contains:
// input fields for email and password
// a register button that makes a POST request to /register
const { username } = req.body;
if (username) {
  res.redirect("/urls");
}
res.render("/registration");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
