import { Router } from "express";
import { getExhibits } from "../controllers/exhibitController";



const router = Router();
router.get("/exhibitions", getExhibits)
router.post("/exhibitions/create")

export default router