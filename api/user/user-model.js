const db = require('../data/db-config.js');

module.exports = {
  get,
  insert
}

function get(id) {
  let query = db("user")

  return id ? query.where({ id }).first() : query;
}

function insert(user) {
  return db("user").insert(user).then(([id]) => get(id));
}