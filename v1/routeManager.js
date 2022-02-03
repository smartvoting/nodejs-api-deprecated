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

const express = require("express");
const app = express();

const _404 = require("./home/404");
const _admin = require("./admin/router");
const _candidate = require("./candidate/router");
const _contact = require("./contact/router");
const _elections = require("./elections/router");
const _home = require("./home/Index");
const _party = require("./party/router");
const _vote = require("./vote/router");
const _voter = require("./voter/router");

app.use("/admin/", _admin);
app.use("/candidate/", _candidate);
app.use("/contact/", _contact);
app.use("/elections/", _elections);
app.use("/party/", _party);
app.use("/vote/", _vote);
app.use("/voter/", _voter);
app.use("/", _home);
app.use("*", _404);

module.exports = app;
