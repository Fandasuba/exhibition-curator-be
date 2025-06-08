import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { findAllUsers, insertUser, findUserByUsername } from "../models/userModels";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;
  try {
    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = await insertUser(email, username, hashedPassword);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// loginUser function stays the same...
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  
  try {
    const user = await findUserByUsername(username);
    
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ 
      message: "Login successful", 
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};