import { Router } from "express";
import { createExhibit, deleteExhibit, getExhibits, updateExhibit } from "../controllers/exhibitController";

const router = Router();

router.get("/:userId", getExhibits);
router.post("/", createExhibit);
router.patch("/:exhibitionId", updateExhibit)
router.delete("/:exhibitionId", deleteExhibit)


export default router;