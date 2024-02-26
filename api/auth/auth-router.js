const router = require("express").Router();
const Users = require("../user/user-model.js");
const generateToken = require("../middleware/generate-token.js");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const userCreds = req.body;

  const ROUNDS = process.env.BCRYPT_ROUNDS || 8;

  const hash = bcrypt.hashSync(userCreds.password, ROUNDS);

  userCreds.password = hash;

  if (!userCreds.username || !userCreds.password) {
    res.status(400).send({ message: "username and password required" });
  } else {
    Users.getByUserName(userCreds.username).then((user) => {
      if (user?.username) {
        res.status(400).send({ message: "username taken" });
      } else {
        Users.add(userCreds)
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            res.status(500).send({ message: "this user was not added" });
          });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "username and password required" });
  } else {
    Users.getByUserName(username)
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `welcome, ${user.username}`, token });
        } else {
          res.status(401).send({ message: "invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).end();
      });
  }
});

module.exports = router;
