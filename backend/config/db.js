import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

// ✅ Create database if it doesn't exist
export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "raghu", // change this if needed
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS raithumithra;`);
    console.log("✅ MySQL connected successfully and database ensured.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

// ✅ Sequelize instance (ORM)
export const sequelize = new Sequelize("raithumithra", "root", "raghu", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // disable SQL spam in console
});
