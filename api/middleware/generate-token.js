const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    username: user.username,
  };
  
  const secret = process.env.JWT_SECRET || 'is it secret? is it safe?';

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;