import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import * as models from "../models";

dotenv.config();

const sequelize: Sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",

    protocol: process.env.DB_PROTOCOL || undefined,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Required for Supabase
      },
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 3,
    }, 
    models: Object.values(models),
    logging: false,
  }
);

export default sequelize;
