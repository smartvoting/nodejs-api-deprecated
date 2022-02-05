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
 *****************************************************************************************/

require("dotenv").config();

const _host = process.env.HOST;
const _port = process.env.PORT;
const _version = process.env.API_VERSION;
const _devURL = `http://${_host}:${_port}/${_version}`;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require(`./${_version}/models`);
db.sequelize.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/v1/", (req, res) => {
  res.status(202).json({ message: `Smart Voting API Root - ${_version}` });
});

// Routes
require(`./${_version}/routes/api_keys.routes`)(app);
require(`./${_version}/routes/province_list.routes`)(app);

app.listen(_port, _host, () => {
  console.log(`server is running at: ${_devURL}`);
});
