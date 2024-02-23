const router = require('express').Router();
const Users = require('../user/user-model.js');
const validateUser = require('../middleware/user-validation.js');
const generateToken = require('../middleware/generate-token.js');
const bcrypt = require('bcryptjs');

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
  
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'username and password required' });
  }

  Users.getBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome, ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    })
});

module.exports = router;
