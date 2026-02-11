import express from 'express';
import { config } from './config/env.js';
import { initDB } from './db/models/index.js';
import { router } from './routes/movies.js';
import {router as auth} from './routes/user_auth.js'
import sequelize from './config/sequelize.js';
const PORT  = process.env.PORT || 4500;

sequelize.sync()
    .then(() => {
        console.log("Database synced successfully");
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database sync failed:", err);
    });

const app = express()
app.use(express.json())
app.use("/movies", router)
app.use("/authenticate", auth)
app.listen(config.port, async ()=>{
    try{
        console.log(`Server running on http://localhost:${PORT}`)
        await initDB()
    }catch (error) {
        console.error("Error starting server", error)
    }
    
})