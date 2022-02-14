const pgConfig = require("../../config/postgres.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(pgConfig.DB, pgConfig.USER, pgConfig.PASSWORD, {
  host: pgConfig.HOST,
  dialect: pgConfig.dialect,
  pool: {
    min: pgConfig.pool.min,
    acquire: pgConfig.pool.acquire,
    idle: pgConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.api_keys = require("./api_keys.model")(sequelize, Sequelize);
db.party_list = require("./party_list.model")(sequelize, Sequelize);
db.platform_topics = require("./platform_topics.model")(sequelize, Sequelize);
db.province_list = require("./province_list.model")(sequelize, Sequelize);

module.exports = db;
