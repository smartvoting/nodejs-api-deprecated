/**
 * * Smart Voting API
 * * License: GNU General Public License v3.0
 * * https://github.com/smartvoting
 */

require("dotenv").config();
const pg = require("pg");
const express = require("express");
const app = express();
const pgURL = `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@smartvoting.cbh05r7ygr2w.us-east-1.rds.amazonaws.com:5432/${process.env.RDS_DB_NAME}`;

const pgClient = new pg.Client({
  connectionString: pgURL,
});

pgClient.connect();

app.get("/", function (req, res, next) {
  pgClient.query('SELECT * FROM public."partyList"', function (error, result) {
    if (error) {
      console.log(error);
    }
    res.status(200).send(result.rows);
  });
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `server is running at: http://${process.env.HOST}:${process.env.PORT}/`
  );
});
