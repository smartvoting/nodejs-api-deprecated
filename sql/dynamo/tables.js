const _agencyInfo = require("./schemas/AgencyInfo");
const _partyBlogs = require("./schemas/PartyBlogs");
const _partyInfo = require("./schemas/PartyInfo");
const _partyPlatforms = require("./schemas/PartyPlatforms");

const _tables = {
  agencyInfo: _agencyInfo,
  partyBlogs: _partyBlogs,
  partyInfo: _partyInfo,
  partyPlatforms: _partyPlatforms,
};

module.exports = _tables;
