import express from'express';
import { searchMovie } from '../controllers/searchmovie.js';
import { verifyUser } from '../middleware/uservalidator.js';
import {getAllWaitlist, wantToWatch} from "../controllers/wantTowatch.js"
import { addToWatched } from '../controllers/watched.js';
import { getDashboardStats } from '../controllers/dashboard.js';
export const router = express.Router()

router.get("/getShows/:title/:id/:year/:type", verifyUser, searchMovie)
router.post("/addToWaitlist", verifyUser, wantToWatch)
router.post("/addTowatchedlist", verifyUser, addToWatched)
router.get("/getAllWatched", verifyUser, )
router.get("/getAllWaitlist", verifyUser, getAllWaitlist)
router.post("/feedback/addreview", verifyUser, )
router.get("/stats", verifyUser, getDashboardStats)