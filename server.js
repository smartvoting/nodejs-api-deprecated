/***************************************************************************************
 *     _________                      __    ____   ____     __  .__                    *
 *    /   _____/ _____ _____ ________/  |_  \   \ /   /____/  |_|__| ____    ____      *
 *    \_____  \ /     \\__  \\_  __ \   __\  \   Y   /  _ \   __\  |/    \  / ___\     *
 *    /        \  Y Y  \/ __ \|  | \/|  |     \     (  <_> )  | |  |   |  \/ /_/  >    *
 *   /_______  /__|_|  (____  /__|   |__|      \___/ \____/|__| |__|___|  /\___  /     *
 *           \/      \/     \/                                          \//_____/      *
 ***************************************************************************************
 *   Project Title: Smart Voting                                                       *
 *   Project Website: https://smartvoting.cc/                                          *
 *   Documentation: https://docs.smartvoting.cc/                                       *
 *   Project Source Code: https://github.com/smartvoting/                              *
 ***************************************************************************************
 *   Project License: GNU General Public License v3.0                                  *
 *   Project Authors: Matthew Campbell, Stephen Davis, Satabdi Sangma, Michael Sirna   *
 *   George Brown College - Computer Programmer Analyst (T127)                         *
 *   Capstone I & II Project - September 2021 to April 2022                            *
 ***************************************************************************************/

require("dotenv").config();
const queries = require("./sql/frequentCommands");
const tables = require("./sql/tableList");
const pg = require("pg");
const express = require("express");
const app = express();
const pgURL = `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@smartvoting.cbh05r7ygr2w.us-east-1.rds.amazonaws.com:5432/${process.env.RDS_DB_NAME}`;

const pgClient = new pg.Client({
  connectionString: pgURL,
});

pgClient.connect();

app.get("/", function (req, res, next) {
  pgClient.query(
    queries.selectAll + tables.partyList,
    function (error, result) {
      if (error) {
        console.log(error);
      }
      res.status(200).send(result.rows);
    }
  );
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `server is running at: http://${process.env.HOST}:${process.env.PORT}/`
  );
});
