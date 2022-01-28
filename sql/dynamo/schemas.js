const _partyBlog = require("./schemas/PartyBlogs");
const _partyInfo = require("./schemas/PartyInfo");
const _partyPlatforms = require("./schemas/PartyPlatforms");
const _systemInfo = require("./schemas/SystemInfo");

const _objects = {
  partyBlog: _partyBlog,
  partyInfo: _partyInfo,
  partyPlatforms: _partyPlatforms,
  systemInfo: _systemInfo,
};

module.exports = _objects;
