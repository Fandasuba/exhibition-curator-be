import { Request, Response } from "express";
import { insertItem } from "../models/itemModels";

export const addItems = async (req:Request, res: Response) => {
    const {id, user_id, item} = req.body
try {
    const newItem = await insertItem(id, user_id, item)
    res.status(200).json(newItem)
} catch(error){
    res.status(500).json({error: error})
}
}