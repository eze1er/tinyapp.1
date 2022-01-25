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

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(req);
  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL]
  };
  res.render("urls_show", templateVars);
});


 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});