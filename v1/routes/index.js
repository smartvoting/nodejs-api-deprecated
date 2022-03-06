module.exports = (app, version) => {
  // require(`./${version}/routes/admin.eo.routes`)(app, version);
  // require(`./${version}/routes/admin.lr.routes`)(app, version);
  // require(`./${version}/routes/admin.pp.routes`)(app, version);
  require("./api_keys.routes")(app, version);
  // require(`./${version}/routes/candidate.routes`)(app, version);
  // require(`./${version}/routes/election.routes`)(app, version);
  require("./party.routes")(app, version);
  require("./riding.routes")(app, version);
  // require(`./${version}/routes/vote.routes`)(app, version);
  // require(`./${version}/routes/voter.routes`)(app, version);
  require("./general.routes")(app, version);
};
