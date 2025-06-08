import { Router } from "express";
import { addItems } from "../controllers/itemController";

const router = Router()

router.post("/additem", addItems)

export default router