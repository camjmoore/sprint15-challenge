const db = require('../../data/dbConfig.js');

module.exports = {
  get,
  getBy,
  add
}

function get(id) {
  let query = db("user")

  return id ? getBy(id) : query;
}

function getBy(filter) {
  return db("user").where(filter).first();
}

function add(user) {
  return db("user").insert(user).then(([id]) => get(id));
}