import { Request, Response } from "express";
import { insertItem } from "../models/itemModels";

export const addItems = async (req: Request, res: Response) => {
    const { id, user_id, item } = req.body;
    
    try {
        const newItem = await insertItem(id, user_id, item);
        res.status(200).json(newItem);
    } catch (error) {
        console.error("Error in addItems controller:", error);
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error occurred" });
        }
    }
}