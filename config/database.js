import dotenv from 'dotenv';
dotenv.config();

export default{
  development: {
    username: process.env.NEON_OWNER,
    password: process.env.NEON_SECRET,
    database: process.env.NEON_DATABASE,
    host: process.env.NEON_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
