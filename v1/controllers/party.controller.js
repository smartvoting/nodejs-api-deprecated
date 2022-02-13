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
    KeyConditionExpression: "#pId = :p",
    ExpressionAttributeNames: {
      "#pId": "partyId",
    },
    ExpressionAttributeValues: {
      ":p": _id,
    },
  };
  _aws.query(_params, (error, reply) => {
    if (error) {
      res.status(200).json({
        message:
          error.message || "An error occured while retrieving the blog list.",
      });
    } else {
      if (reply.Count == 0) {
        res.status(200).json({
          message: "No blog posts found for this party.",
        });
      } else {
        res.status(200).send(reply.Items);
      }
    }
  });
};

exports.blogPost = (req, res) => {
  let _id = parseInt(req.params.id);
  let _postId = req.params.postId;
  const _aws = new AWS.DynamoDB.DocumentClient();
  let _params = {
    TableName: "partyBlogs",
    KeyConditionExpression: "#pId = :p and #bId = :b",
    ExpressionAttributeNames: {
      "#pId": "partyId",
      "#bId": "blogId",
    },
    ExpressionAttributeValues: {
      ":p": _id,
      ":b": _postId,
    },
  };
  _aws.query(_params, (error, reply) => {
    if (error) {
      res.status(200).send({
        message:
          error.message || "An error occured while retrieving the blog list.",
      });
    } else {
      if (reply.Count == 0) {
        res.status(200).json({
          message: "No blog post found for this id number.",
        });
      } else {
        res.status(200).send(reply.Items);
      }
    }
  });
};
