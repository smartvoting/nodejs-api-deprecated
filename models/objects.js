const _dynamo = require("./dynamo/objects");
const _postgres = require("./postgres/objects");
const _qldb = require("./qldb/objects");

const _objects = {
  dynamo: _dynamo,
  postgres: _postgres,
  qldb: _qldb,
};

module.exports = _objects;
