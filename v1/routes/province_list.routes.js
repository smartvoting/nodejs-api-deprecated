module.exports = (app, version) => {
  const province_list = require("../controllers/province_list.controller");
  var router = require("express").Router();
  router.get("/list", province_list.findAll);
  app.use(`/${version}/provinces/`, router);
};
