import { Router } from "express";
import { getExhibits } from "../controllers/exhibitController";



const router = Router();
router.get("/exhibitions", getExhibits)

export default router