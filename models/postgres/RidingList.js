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
 *   FILE: MODELS/RIDINGLIST.JS                                                          *
 *   NOTES: This file is the model for the database table Riding List.                   *
 *****************************************************************************************/

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("ridingList", {
    ridingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
    },
    ridingName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    officeAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
};
