import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV || "development";

let sequelize: Sequelize;

if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions:
      NODE_ENV === "production"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        : {}
  });
} else {
  const {
    PG_USERNAME,
    PG_PASSWORD,
    PG_DATABASE,
    PG_HOST,
    PG_PORT
  } = process.env;

  sequelize = new Sequelize(
    PG_DATABASE as string,
    PG_USERNAME as string,
    PG_PASSWORD as string,
    {
      host: PG_HOST || "localhost",
      port: Number(PG_PORT || 5432),
      dialect: "postgres",
      logging: false
    }
  );
}

export { sequelize };

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Postgres");
  } catch (err) {
    console.error("❌ DB connection error", err);
    throw err;
  }
}
