const Users = require('../user/user-model.js');

function validateUser (req, res, next) {
  const { username, password } = req.body;

  const taken = Users.getBy(username) ? true : false;

  if (taken) {
    res.status(400).json({ message: 'username taken' });
  }

  if (!username || !password) {
    res.status(400).json({ message: 'username and password required' });
  }

  next();
}

module.exports = validateUser;