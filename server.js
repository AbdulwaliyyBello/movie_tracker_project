import express from 'express';
import { config } from './config/env.js';
import { initDB } from './db/models/index.js';
import { router } from './routes/movies.js';
import {router as auth} from './routes/user_auth.js'
const PORT  = process.env.PORT || 4500;
const app = express()

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