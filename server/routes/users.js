import express from "express";
import { getProfile, updateProfile, signin, signup } from "../controllers/users.js";

const router = express.Router();

router.get('/profile', getProfile)
router.post('/profile', updateProfile)
router.post('/signin', signin)
router.post('/signup', signup)

export default router