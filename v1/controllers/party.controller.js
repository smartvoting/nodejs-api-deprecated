const AWS = require("aws-sdk");
const db = require("../models");
const { ValidationError } = require("sequelize");
const PartyList = db.party_list;
const PlatformTopics = db.platform_topics;
const VolunteerApplications = db.volunteer_applications;

function formatApplication(a) {
  return `Application ID Number: ${a.application_id}\n
    Party ID Number: ${a.party_id}\n
    Riding ID Number: ${a.riding_id}\n
    First Name: ${a.first_name}\n
    Last Name: ${a.last_name}\n
    Phone Number: ${a.phone_number}\n
    Email Address: ${a.email_address}\n
    Legal Resident: ${a.legal_resident}\n
    Past Volunteer: ${a.past_volunteer}\n
    Party Member: ${a.party_member}\n
    Time Submitted: ${a.submitted}`;
}

exports.findAll = (req, res) => {
  PartyList.findAll({
    order: ["party_name"],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json({
        msg:
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
        msg:
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
      res.status(500).json({
        msg:
          error.message || "An error occured while retrieving the blog list.",
      });
    } else {
      if (reply.Count == 0) {
        res.status(200).json({
          msg: "No blog posts found for this party.",
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
      res.status(500).json({
        msg:
          error.message || "An error occured while retrieving the blog list.",
      });
    } else {
      if (reply.Count == 0) {
        res.status(200).json({
          msg: "No blog post found for this id number.",
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
        msg:
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
      msg:
        error.message || "An error occured while retrieving the topic policy.",
    });
  }
};

exports.volunteerApply = async (req, res) => {
  try {
    let application = await VolunteerApplications.create(req.body);
    application = application.dataValues;
    let domain = await PartyList.findByPk(application.party_id, {
      attributes: ["party_domain"],
    });
    // let email = "volunteer@" + domain.dataValues.party_domain;
    let email = "smartvoting@skdprojects.net";
    console.log(application);
    let params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: formatApplication(application),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "New Volunteer Application",
        },
      },
      Source: "noreply@smartvoting.cc",
    };
    let sendEmail = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    sendEmail
      .then((data) => {
        res.status(200).json({
          msg: "Application submitted",
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg:
            error.message ||
            "Something went wrong when submitting your volunteer application. Please try again later or contact your local riding office.",
        });
      });
  } catch (error) {
    res.status(500).json({
      msg:
        error.message ||
        "Something went wrong when submitting your volunteer application. Please try again later or contact your local riding office.",
    });
  }
};
