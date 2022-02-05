module.exports = (app) => {
  const _version = process.env.API_VERSION;
  const provinceList = require("../controllers/province_list.controller");
  var router = require("express").Router();

  router.get("/", provinceList.findAll);

  app.use(`/${_version}/province-list/`, router);
};
