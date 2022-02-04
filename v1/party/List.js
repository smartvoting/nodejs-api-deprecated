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
import { Router } from "express";
const router = Router();
import { Client } from "pg";
const pgClient = new Client({
  connectionString: cs,
});

pgClient.connect();

// ROUTE: /v1/party/list/
router.get("/", (req, res) => {
  let _query = `SELECT * FROM party_list;`;
  pgClient.query(_query, (qerr, qres) => {
    if (qerr) res.status(200).send("No rows found.");
    else res.status(200).send(qres.rows);
  });
});

export default router;
