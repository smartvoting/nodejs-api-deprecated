module.exports = (sequelize, Sequelize) => {
  const apiKeys = sequelize.define(
    "api_keys",
    {
      key: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING(32),
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            message: "A name for the API Key is required.",
          },
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      createdAt: "created",
      updatedAt: "updated",
      freezeTableName: true,
    }
  );
  return apiKeys;
};
