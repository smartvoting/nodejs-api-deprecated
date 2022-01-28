module.exports = function (sequelize, DataTypes) {
  return sequelize.define("partyList", {
    partyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    partyName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    partyDomain: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
};
