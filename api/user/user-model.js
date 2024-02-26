const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getBy,
  add,
};

function get(id) {
  let query = db("users");
  return id ? query.where({ id }).first() : query;
}

function getBy(filter) {
  return db("users").where(filter).select("id", "username", "password").first();
}

function add(user) {
  return db("users")
    .insert(user)
    .then(([id]) => get(id));
}
