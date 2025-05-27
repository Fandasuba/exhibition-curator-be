import { Request, Response } from "express";
import { findAllUsers, insertUser } from "../models/userModels";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const newUser = await insertUser(email, username, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};