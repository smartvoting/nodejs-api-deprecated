module.exports.selectAll = function (table) {
  return `SELECT * FROM ${table};`;
};

module.exports.selectId = function (table, primaryKey, searchId) {
  return `SELECT * FROM ${table} WHERE ${primaryKey} = ${searchId};`;
};

// const AWS = require("aws-sdk");

// module.exports.selectSingleEntry = function(table, partitionKey, sortKey, )
