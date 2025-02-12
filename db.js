const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: isProduction
    ? process.env.REMOTE_DATABASE_URL
    : process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // Required for remote DB like Koyeb
    : false,
});

pool
  .connect()
  .then(() =>
    console.log(`Connected to ${isProduction ? "Remote" : "Local"} Database`)
  )
  .catch((err) => console.error("Database connection error:", err));

module.exports = pool;
