module.exports = (sequelize, Sequelize) => {
  const volunteerApplication = sequelize.define(
    "volunteer_applications",
    {
      application_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      party_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        autoIncrement: false,
      },
      riding_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        autoIncrement: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Your first name is required.",
          },
        },
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Your last name is required.",
          },
        },
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Your phone number is required.",
          },
        },
      },
      email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            message: "A valid email address is required.",
          },
          notNull: {
            message: "Your email address is required.",
          },
        },
      },
      legal_resident: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            message:
              "Please indicate if you are a permanent resident or citizen of Canada.",
          },
        },
      },
      past_volunteer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            message:
              "Please indicate if you are a past volunteer with any political party.",
          },
        },
      },
      party_member: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            message: "Please indicate if you are a registered party member.",
          },
        },
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      createdAt: "submitted",
      updatedAt: "updated",
      freezeTableName: true,
    }
  );
  return volunteerApplication;
};
