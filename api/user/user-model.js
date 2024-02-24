const db = require('../../data/dbConfig.js');

module.exports = {
  get,
  getById,
  add
}

function get(id) {
  let query = db("users")
  return id ? query.where({ id }).first() : query;
}

function getById(id) {
  return db("users").where({ id }).select("id", "username", "password").first();
}

function add(user) {
  return db("users").insert(user).then(([id]) => getById(id));
}