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

import { cs } from "../../databases/postgres/data";
import { DynamoDB } from "aws-sdk";
import { Router } from "express";
const router = Router();
import { Client } from "pg";
const pgClient = new Client({
  connectionString: cs,
});

pgClient.connect();

const validateId = (id) => {
  if (!isNaN(id)) {
    let _id = parseInt(id);
    return Number.isInteger(_id) && _id > 0;
  } else {
    return false;
  }
};

// ROUTE: /v1/party/:id/platform/:topicId
router.get("/:partyId/platform/:topicId", (req, res) => {
  let _partyId = req.params.partyId;
  let _validPartyId = validateId(_partyId);
  let _topicId = req.params.topicId;
  let _validTopicId = validateId(_topicId);

  if (_validPartyId) {
    if (_validTopicId) {
      const _aws = new DynamoDB.DocumentClient();
      let _params = {
        TableName: 
      }
    } else {
      res
        .status(400)
        .send(
          "Topic ID must be a whole number, greater than 0, and not a string."
        );
    }
  } else {
    res
      .status(400)
      .send(
        "Party ID must be a whole number, greater than 0, and not a string."
      );
  }
});

// ROUTE: /v1/party/:id/platform/
router.get("/:partyId/platform/", (req, res) => {
  let _partyId = req.params.partyId;
  let _validId = validateId(_partyId);

  if (_validId) {
    let _query = `SELECT * FROM platform_topics;`;
    pgClient.query(_query, (qerr, qres) => {
      if (qerr) res.status(200).send("An error occured.");
      if (qres.rows.length > 0) {
        res.status(200).send(qres.rows);
      } else {
        res.status(200).send("An error occured.");
      }
    });
  } else {
    res
      .status(400)
      .send(
        "Party ID must be a whole number, greater than 0, and not a string."
      );
  }
});

// ROUTE: /v1/party/:id/
router.get("/:partyId", (req, res) => {
  let _partyId = req.params.partyId;
  let _validId = validateId(_partyId);

  if (_validId) {
    let _query = `SELECT * FROM party_list WHERE party_id = ${_partyId};`;
    pgClient.query(_query, (qerr, qres) => {
      if (qerr) res.status(200).send("An error occured.");
      if (qres.rows.length > 0) {
        res.status(200).send(qres.rows);
      } else {
        res
          .status(200)
          .send(
            `No data found for Party ID: ${_partyId}. Please try a different ID number.`
          );
      }
    });
  } else {
    res
      .status(400)
      .send(
        "Party ID must be a whole number, greater than 0, and not a string."
      );
  }
});

export default router;
