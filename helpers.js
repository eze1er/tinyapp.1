const bcrypt = require('bcryptjs');
const getUserByEmail = (email, users) => {
  for (let user in users) {
    if (users[user].email === email) {
      return true;
    }
  }
  return false;
};

// urlsForUser function is for checking the user in DB
const urlsForUser = (id, database) => {
  let userUrls = {};

  for (const shortURL in database) {
    if (database[shortURL].userID === id) {
      userUrls[shortURL] = database[shortURL];
    }
  }

  return userUrls;
};

const generateRandomString = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  
  while (randomString.length < 6) {
    randomString += chars[Math.floor(Math.random() * chars.length)];
  }
  // console.log(randomString);
  return randomString;
};

const passwordValidation = function(password, user) {
  if (bcrypt.compareSync(password, user.password)) {
    return true;
  }
  return false;
}
const authUser = function(users, email, password) {
  console.log(`users: ${users}`);
  for (let user in users) {
    const userEmail = getUserByEmail(email, users);
    if (userEmail && bcrypt.compareSync(password, users[user].password)) {
      return users[user];
    }
  }
  return false;
}

const fetchUserUrls = (urlDatabase, sessionID) => {
  let userUrls = {};
  for (let shortUrl in urlDatabase) {
    if (urlDatabase[shortUrl].userID == sessionID) {
      userUrls[shortUrl] = urlDatabase[shortUrl].longURL;
    }
  }
  return userUrls;
};
// fetching all urls for unregistered user
const fetchAllUrls = () => {
  let userUrls = {};
  for (let shortUrl in urlDatabase) {
    userUrls[shortUrl] = urlDatabase[shortUrl].longURL;
  }
  return userUrls;
};


module.exports = { getUserByEmail, urlsForUser, generateRandomString, passwordValidation, authUser, fetchAllUrls, fetchUserUrls };