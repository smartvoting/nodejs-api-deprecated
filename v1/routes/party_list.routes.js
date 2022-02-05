module.exports = (app) => {
  const _version = process.env.API_VERSION;
  const partyList = require("../controllers/party_list.controller");
  var router = require("express").Router();

  router.get("/", partyList.findAll);
  router.get("/:id", partyList.findOne);

  app.use(`/${_version}/party-list/`, router);
};
