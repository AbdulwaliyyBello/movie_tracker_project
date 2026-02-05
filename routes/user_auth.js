import express from 'express';

import { signupCont } from '../controllers/signup.js';
import { loginCont } from '../controllers/login.js';

export const router = express.Router()

router.post("/user/signup", signupCont)
router.post("/user/login", loginCont)

