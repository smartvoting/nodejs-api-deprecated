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
 *   URL: https://api.smartvoting.cc/party/                                              *
 *   NOTES: This file retrieves the entry on the DynamoDB table "systemInfo". It gets    *
 *          entityId 2 (Elections Canada) and docId 1 (About) and returns the list as a  *
 *          JSON document.                                                               *
 *****************************************************************************************/

const db = require("../../sql/databases");
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pgClient = new pg.Client({
  connectionString: db.postgres.cs,
});

pgClient.connect();

router.get("/", (req, res) => {
  res.status(200).send("Smart Voting API - Party Landing\n'/'");
});

router.get("/:id", (req, res) => {
  const _partyId = req.params.id;
  let _query = db.postgres.queries.selectId(
    db.postgres.tables.partyList.name,
    db.postgres.tables.partyList.schema.partyId,
    _partyId
  );
  console.log(_query);
  pgClient.query(_query, (error, result) => {
    if (error) res.status(204).send("No rows found.");
    else res.status(200).send(result.rows);
  });
});

module.exports = router;
