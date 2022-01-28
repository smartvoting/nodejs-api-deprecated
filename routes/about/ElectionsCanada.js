/*****************************************************************************************
 *     _________                      __       ____   ____     __  .__                   *
 *    /   _____/ _____ _____ ________/  |_     \   \ /   /____/  |_|__| ____    ____     *
 *    \_____  \ /     \\__  \\_  __ \   __\     \   Y   /  _ \   __\  |/    \  / ___\    *
 *    /        \  Y Y  \/ __ \|  | \/|  |        \     (  <_> )  | |  |   |  \/ /_/  >   *
 *   /_______  /__|_|  (____  /__|   |__|         \___/ \____/|__| |__|___|  /\___  /    *
 *           \/      \/     \/                                             \//_____/     *
 *****************************************************************************************
 *   Project Title: Smart Voting                                                         *
 *   Project Website: https://smartvoting.cc/                                            *
 *   Documentation: https://docs.smartvoting.cc/                                         *
 *   Project Source Code: https://github.com/smartvoting/                                *
 *****************************************************************************************
 *   Project License: GNU General Public License v3.0                                    *
 *   Project Authors: Matthew Campbell, Stephen Davis, Satabdi Sangma, Michael Sirna     *
 *   George Brown College - Computer Programmer Analyst (T127)                           *
 *   Capstone I & II - September 2021 to April 2022                                      *
 *****************************************************************************************
 *   FILE: ROUTES/ABOUT/ELECTIONSCANADA.JS                                               *
 *   URL: https://api.smartvoting.cc/about/electionscanada/                              *
 *   NOTES: This file retrieves the entry on the DynamoDB table "systemInfo". It gets    *
 *          entityId 2 (Elections Canada) and docId 1 (About) and returns the list as a  *
 *          JSON document.                                                               *
 *****************************************************************************************/

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
      agencyCode: "ec",
      docType: "about",
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
