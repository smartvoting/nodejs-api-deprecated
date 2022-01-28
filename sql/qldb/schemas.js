const _audits = require("./schemas/Audits");
const _ballots = require("./schemas/Ballots");
const _voters = require("./schemas/Voters");

const _schemas = {
  audits: _audits,
  ballots: _ballots,
  voters: _voters,
};

module.exports = _schemas;
