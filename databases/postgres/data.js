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

const _cs = `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const _partyList = require("./schemas/party_list");
const _partyStaff = require("./schemas/party_staff");
const _ridingList = require("./schemas/riding_list");
const _roleList = require("./schemas/role_list");
const _voterList = require("./schemas/voter_list");
const _voterSecurity = require("./schemas/voter_security");
const _electionOfficials = require("./schemas/election_officials");
const _platformTopics = require("./schemas/platform_topics");
const _provinceList = require("./schemas/province_list");

const _data = {
  cs: _cs,
  tables: {
    partyList: _partyList,
    partyStaff: _partyStaff,
    ridingList: _ridingList,
    roleList: _roleList,
    voterList: _voterList,
    voterSecurity: _voterSecurity,
    electionOfficials: _electionOfficials,
    platformTopics: _platformTopics,
    provinceList: _provinceList,
  },
};

module.exports = _data;
