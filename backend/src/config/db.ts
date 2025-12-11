import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

export const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize(
      process.env.PG_DATABASE!,
      process.env.PG_USERNAME!,
      process.env.PG_PASSWORD!,
      {
        host: process.env.PG_HOST || "localhost",
        port: Number(process.env.PG_PORT || 5432),
        dialect: "postgres",
        logging: false,
      }
    );
