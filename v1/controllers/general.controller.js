const AWS = require("aws-sdk");

exports.agencyInfo = (req, res) => {
  let _id = req.params.id;
  let _docType = req.params.docType;
  const _aws = new AWS.DynamoDB.DocumentClient();
  let _params = {
    TableName: "agencyInfo",
    Key: {
      agencyCode: `${_id}`,
      docType: `${_docType}`,
    },
  };
  _aws.get(_params, (error, reply) => {
    if (error) {
      res.status(200).send({
        message:
          error.message || "An error occured while retrieving the information.",
      });
    } else {
      let _item = {
        dateModified: reply.Item.dateModified,
        bodyText: reply.Item.bodyText,
      };
      res.status(200).send(_item);
    }
  });
};
