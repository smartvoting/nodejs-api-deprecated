const db = require("../../sql/databases");
const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  AWS.config.update(db.dynamo.cs);
  const _aws = new AWS.DynamoDB.DocumentClient();
  let _params = {
    TableName: db.dynamo.tables.agencyInfo.name,
    Key: {
      agencyCode: "sv",
      docType: "security",
    },
  };
  _aws.get(_params, (qerr, qres) => {
    if (qerr) {
      res.status(204).send(qerr);
    } else {
      let _item = {
        dateModified: qres.Item.dateModified,
        bodyText: qres.Item.bodyText,
      };
      res.status(200).send(_item);
    }
  });
});

module.exports = router;