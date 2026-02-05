import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";


// const sequelize = new Sequelize(
//     process.env.NEON_DATABASE,
//     process.env.NEON_OWNER,
//     process.env.NEON_SECRET,
//     {
//         host: process.env.NEON_HOST,
//         dialect: 'postgres',
//         dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         }
//         },
//         logging: false,
//     }
// );

const isProduction = config.nodeEnv === 'production';
export  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialect: 'postgres',
    dialectOptions:{
        ssl: isProduction? {
            require: true,
            rejectUnauthorized: false
        } : false 
    }
})
export default sequelize;