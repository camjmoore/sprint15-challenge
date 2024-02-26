const router = require("express").Router();

const Users = require("./user-model.js");

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.send(error));
});

module.exports = router;
