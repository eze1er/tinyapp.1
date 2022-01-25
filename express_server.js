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
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// variables

const urlDatabase = {   "b2xVn2": "http://www.lighthouselabs.ca",   "9sm5xK": "http://www.google.com" };
const users = {};
app.get("/urls.json", (req, res) => {
  console.log(urlDatabase);
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  
  const templateVars = { urls: urlDatabase };
  // console.log(templateVars);
  res.render("urls_index", templateVars);
});
// Creation new url page - GET

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(req);
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL]
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});