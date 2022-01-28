// const queries = require("./sql/frequentCommands");
// const tables = require("./sql/tableList");
// const pg = require("pg");

// const pgClient = new pg.Client({
//   connectionString: pgURL,
// });

// pgClient.connect();
// app.get("/", function (req, res, next) {
//   pgClient.query(
//     queries.selectAll + tables.partyList,
//     function (error, result) {
//       if (error) {
//         console.log(error);
//       }
//       res.status(200).send(result.rows);
//     }
//   );
// });

// dynamo: {
//   cs: _dynamoCS,
//   queries: _dynamoQueries,
//   schemas: _dynamoSchemas,
//   tables: _dynamoTables,
// },

const _dynamoCS = {
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};
const _dynamoQueries = require("./dynamo/queries");
const _dynamoTables = require("./dynamo/tables");

const _pgCS = `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const _pgQueries = require("./postgres/queries");
const _pgTables = require("./postgres/tables");

const _qldbCS = "QLDB_CS";
const _qldbQueries = require("./qldb/queries");
const _qldbSchemas = require("./qldb/schemas");
const _qldbLedgers = require("./qldb/ledgers");

module.exports = {
  dynamo: {
    cs: _dynamoCS,
    queries: _dynamoQueries,
    tables: _dynamoTables,
  },
  postgres: {
    cs: _pgCS,
    queries: _pgQueries,
    tables: _pgTables,
  },
  qldb: {
    cs: _qldbCS,
    ledgers: _qldbLedgers,
    schemas: _qldbSchemas,
    queries: _qldbQueries,
  },
};
