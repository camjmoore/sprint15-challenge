const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  const secret = process.env.JWT_SECRET || 'is it secret? is it safe?';

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if(!err){
        req.decodedToken = decodedToken;
        next();
      } else {
        res.status(401).send('token invalid');
      }
    })
  } else {
    res.status(401).send("token required");
  }
};
