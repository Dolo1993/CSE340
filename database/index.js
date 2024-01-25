/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */

const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.NODE_ENV === "development") {
  // For local development, use SSL with rejectUnauthorized set to false
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // For production, rely on Render.com's environment settings
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

// Function for executing queries with logging
async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    console.log("Executed query", { text, params });
    return res;
  } catch (error) {
    console.error("Error in query", { text, params, error });
    throw error;
  }
}

module.exports = {
  pool,
  query,
};
