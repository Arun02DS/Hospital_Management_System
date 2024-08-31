import express from "express";
import { getAllMesages, sendMessage } from "../controller/messageController.js";
import {isAdminAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall",isAdminAuthenticated,getAllMesages)

export default router;