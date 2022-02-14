module.exports = (app, _version) => {
  const party = require("../controllers/party.controller");
  var router = require("express").Router();

  router.get("/", party.findAll);
  router.get("/:id", party.findOne);
  router.get("/:id/blog", party.blogList);
  router.get("/:id/blog/:postId", party.blogPost);
  router.get("/:id/platform", party.platform);
  router.get("/:id/platform/:topicId", party.platformPolicy);
  router.post("/:id/volunteer/apply", party.volunteerApply);

  app.use(`/${_version}/party/`, router);
};
