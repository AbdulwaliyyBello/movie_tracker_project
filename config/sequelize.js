import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
    process.env.NEON_DATABASE,
    process.env.NEON_OWNER,
    process.env.NEON_SECRET,
    {
        host: process.env.NEON_HOST,
        dialect: 'postgres',
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
        },
        logging: false,
    }
);
export default sequelize;