require("dotenv").config();
const env = process.env;

const development = {
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

const production = {
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

const test = {
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
