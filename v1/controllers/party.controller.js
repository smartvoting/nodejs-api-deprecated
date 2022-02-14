const AWS = require("aws-sdk");
const db = require("../models");
const PartyList = db.party_list;
const PlatformTopics = db.platform_topics;

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
      res.status(200).json({
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

exports.platform = (req, res) => {
  PlatformTopics.findAll({
    order: ["topic_title"],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message ||
          "An error occured while retrieving the platform topic list.",
      });
    });
};

exports.platformPolicy = async (req, res) => {
  let _partyId = parseInt(req.params.id);
  let _topicId = parseInt(req.params.topicId);
  let _data = {};
  const _aws = new AWS.DynamoDB.DocumentClient();
  let _params = {
    TableName: "partyPlatforms",
    KeyConditionExpression: "#pId = :p and #tId = :s",
    ExpressionAttributeNames: {
      "#pId": "partyId",
      "#tId": "topicId",
    },
    ExpressionAttributeValues: {
      ":p": _partyId,
      ":s": _topicId,
    },
  };
  try {
    const _topic = await PlatformTopics.findByPk(_topicId);
    const _policy = await _aws.query(_params).promise();
    _data.topic = _topic.dataValues;
    _data.policy = _policy.Items[0];
    res.status(200).send(_data);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An error occured while retrieving the topic policy.",
    });
  }
};
