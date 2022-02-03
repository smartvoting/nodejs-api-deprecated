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
 *   FILE: ROUTES/PARTIES/PARTY.JS                                                       *
 *   URL: https://api.smartvoting.cc/party/list/                                         *
 *   NOTES: This file retrieves the entry on the DynamoDB table "systemInfo". It gets    *
 *          entityId 2 (Elections Canada) and docId 1 (About) and returns the list as a  *
 *          JSON document.                                                               *
 *****************************************************************************************/

const db = require("../../sql/databases");
const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pgClient = new pg.Client({
  connectionString: db.postgres.cs,
});

pgClient.connect();

const validatePartyId = (_partyId) =>
  Number.isInteger(_partyId) && _partyId > 0;

router.get("/:partyId/platform/", async (req, res) => {
  let _returnJSON = {};
  // let _labels;
  let _partyId = req.params.partyId;
  // let _topics = db.postgres.queries.selectAll(
  //   db.postgres.tables.platformTopics.name
  // );
  // pgClient.query(_topics, (qerr, qres) => {
  //   if (qerr) {
  //     res.status(204).send("No rows found.");
  //   } else {
  //     _returnJSON.labels = qres.rows;
  //     // console.log(_returnJSON);
  //   }
  // });
  console.log(_returnJSON.labels);
  // console.log(_labels);
});

router.get("/:partyId", (req, res) => {
  let _partyId = req.params.partyId;

  if (validatePartyId(_partyId)) {
    let _query = db.postgres.queries.selectId(
      db.postgres.tables.partyList.name,
      db.postgres.tables.partyList.schema.partyId,
      _partyId
    );
    pgClient.query(_query, (qerr, qres) => {
      if (qerr) res.status(204).send("No rows found.");
      else res.status(200).send(qres.rows);
    });
  } else {
    res
      .status(400)
      .send(
        "Party ID must be a whole number, greater than 0, and not a string."
      );
  }
});

module.exports = router;