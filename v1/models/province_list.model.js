module.exports = (sequelize, Sequelize) => {
  const provinceList = sequelize.define(
    "province_list",
    {
      province_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      province_name: {
        type: Sequelize.STRING(32),
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return provinceList;
};
