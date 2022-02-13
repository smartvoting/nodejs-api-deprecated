module.exports = (app, _version) => {
  const party = require("../controllers/party.controller");
  var router = require("express").Router();

  router.get("/", party.findAll);
  router.get("/:id", party.findOne);
  router.get("/:id/blog", party.blogList);
  router.get("/:id/blog/:postId", party.blogPost);

  app.use(`/${_version}/party/`, router);
};
