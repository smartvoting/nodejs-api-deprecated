module.exports = (app, version) => {
  const riding = require("../controllers/riding.controller");
  var router = require("express").Router();
  router.get("/locate/:id", riding.locate);
  // router.get("/representatives/:id", on.district)
  app.use(`/${version}/riding/`, router);
};
