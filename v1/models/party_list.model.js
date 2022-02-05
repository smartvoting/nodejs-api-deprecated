module.exports = (sequelize, Sequelize) => {
  const partyList = sequelize.define(
    "party-list",
    {
      party_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      party_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      party_domain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_registered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deregister_reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      head_office: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_address: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fax_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      twitter_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      instagram_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebook_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      youtube_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      snapchat_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flickr_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      createdAt: "created",
      updatedAt: "updated",
      freezeTableName: true,
    }
  );
  return partyList;
};
