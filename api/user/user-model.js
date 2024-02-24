const db = require('../../data/dbConfig.js');

module.exports = {
  get,
  getBy,
  add
}

function get(id) {
  let query = db("users")
  return id ? getBy(id) : query;
}

function getBy(filter) {
  return db("users").where(filter).first();
}

function getById(id) {
  return db("users").where({ id }).select("id", "username", "password").first();
}

function add(user) {
  return db("users").insert(user).then(([id]) => getById(id));
}