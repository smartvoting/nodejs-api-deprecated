module.exports = (app, version) => {
  const on = require("../controllers/opennorth.controller");
  var router = require("express").Router();
  router.get("/postcode/:id", on.postcode);
  router.get("/representatives/:id", on.district)
  app.use(`/${version}/opennorth/`, router);
};
