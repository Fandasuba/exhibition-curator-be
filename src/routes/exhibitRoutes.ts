import { Router } from "express";
import { createExhibit, getExhibits, updateExhibit } from "../controllers/exhibitController";

const router = Router();

router.get("/:userId", getExhibits);
router.post("/create", createExhibit);
router.patch("/:exhibitionId", updateExhibit)

export default router;