module.exports = (sequelize, Sequelize) => {
  const ridingList = sequelize.define(
    "riding_list",
    {
      riding_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: false,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true,
      },
      province_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
      },
      riding_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      office_address: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
      },
      email_address: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
      },
      fax_number: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
      },
    },
    {
      createdAt: false,
      updatedAt: "updated",
      deletedAt: false,
      freezeTableName: true,
    }
  );
  return ridingList;
};
