const AWS = require("aws-sdk");
const db = require("../models");
const PartyList = db.party_list;

exports.findAll = (req, res) => {
  PartyList.findAll({
    order: ["party_name"],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || "An error occured while retrieving the party list.",
      });
    });
};

exports.findOne = (req, res) => {
  let _id = parseInt(req.params.id);
  PartyList.findByPk(_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message ||
          "An error occured while retrieving the party with id number " + _id,
      });
    });
};

exports.blogList = (req, res) => {
  let _id = parseInt(req.params.id);
  const _aws = new AWS.DynamoDB.DocumentClient();
  let _params = {
    TableName: "partyBlogs",
    Key: {
      partyId: `${_id}`,
    },
  };
  _aws.get(_params, (error, reply) => {
    if (error) {
      res.status(200).send({
        message:
          error.message || "An error occured while retrieving the blog list.",
      });
    } else {
      // let _item = {
      //   blogId: reply.Item.blogId,
      //   datePosted: reply.Item.datePosted,
      //   writerId: reply.Item.writerId,
      // };
      res.status(200).send(reply);
    }
  });
};

exports.blogPost = (req, res) => {
  let _id = parseInt(req.params.id);
  let _postId = req.params.postId;
  console.log(`ID: ${_id} ||| Post ID: ${_postId}`);
  const _aws = new AWS.DynamoDB.DocumentClient();
  let _params = {
    TableName: "partyBlogs",
    Key: {
      partyId: `${_id}`,
      blogId: `${_postId}`,
    },
  };
  _aws.get(_params, (error, reply) => {
    if (error) {
      res.status(200).send({
        message:
          error.message || "An error occured while retrieving the blog post.",
      });
    } else {
      res.status(200).send(reply);
    }
  });
};
