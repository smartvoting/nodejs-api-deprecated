module.exports = {
  HOST: process.env.RDS_HOSTNAME,
  USER: process.env.RDS_USERNAME,
  PASSWORD: process.env.RDS_PASSWORD,
  PORT: process.env.RDS_PORT,
  DB: process.env.RDS_DB_NAME,
  dialect: "postgres",
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
