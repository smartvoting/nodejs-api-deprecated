module.exports = (app) => {
  const _version = process.env.API_VERSION;
  const apiKeys = require("../controllers/api_keys.controller");
  var router = require("express").Router();

  router.post("/", apiKeys.create);
  router.get("/", apiKeys.findAll);
  router.get("/:id", apiKeys.findOne);
  router.put("/:id", apiKeys.update);
  router.delete("/:id", apiKeys.delete);

  app.use(`/${_version}/api-keys/`, router);
};
