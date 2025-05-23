import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers); // go to the getUsers controller
router.post("/users/create", createUser); // intended for creating a new user.

export default router;