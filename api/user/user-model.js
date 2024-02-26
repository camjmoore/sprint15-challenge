const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getByUserName,
  add,
};

function get(id) {
  let query = db("users");
  return id ? query.where({ id }).first() : query;
}

function getByUserName(username) {
  return db("users").where("username", username);
}

function add(user) {
  return db("users")
    .insert(user)
    .then(([id]) => get(id));
}
