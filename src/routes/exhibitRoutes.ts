import { Router } from "express";
import { createExhibit, getExhibits } from "../controllers/exhibitController";

const router = Router();

router.get("/:userId", getExhibits);
router.post("/create", createExhibit);

export default router;