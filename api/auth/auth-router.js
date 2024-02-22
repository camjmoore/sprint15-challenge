const router = require('express').Router();
const Users = require('../user/user-model.js');
const { validateUser } = require('../user/user-middleware.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', validateUser, (req, res) => {

  const userCreds = req.body;

  const ROUNDS = process.env.BCRYPT_ROUNDS || 8;

  const hash = bcrypt.hashSync(userCreds.password, ROUNDS);

  userCreds.password = hash;

  Users.add(userCreds)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    })
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
