module.exports = (sequelize, Sequelize) => {
  const platformTopics = sequelize.define(
    "platform_topics",
    {
      topic_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      topic_title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return platformTopics;
};
