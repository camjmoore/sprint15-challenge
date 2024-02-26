module.exports = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "username and password required" });
  } else {
    next();
  }
};
