module.exports = (app, _version) => {
  const general = require("../controllers/general.controller");
  var router = require("express").Router();

  router.get("/:docType/:id", general.agencyInfo);

  app.use(`/${_version}/`, router);
};
