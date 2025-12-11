import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { PG_USERNAME, PG_PASSWORD, PG_DATABASE, PG_HOST, PG_PORT } = process.env;

export const sequelize = new Sequelize(
  PG_DATABASE as string,
  PG_USERNAME as string,
  PG_PASSWORD as string,
  {
    host: PG_HOST || "localhost",
    port: Number(PG_PORT || 5432),
    dialect: "postgres",
    logging: false,
  }
);

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Postgres");
  } catch (err) {
    console.error("❌ DB connection error", err);
    process.exit(1);
  }
}
