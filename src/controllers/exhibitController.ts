import { Request, Response } from "express";
import { Exhibit, findExhibits, insertExhibit } from "../models/exhibitModels";

export const getExhibits = async (request: Request, response: Response): Promise <void> => {
    const { userId } = request.params;
    
    if (!userId) {
        response.status(400).json({ error: 'userId is required' });
        return
    }
    
    try {
        const ID = Number(userId)
        const exhibits: Exhibit[] = await findExhibits(ID);
        response.status(200).json(exhibits);
    } catch (error) {
        response.status(500).json({ error: error });
    }
}

export const createExhibit = async (request: Request, response: Response) => {
    const {name, user_id} = request.body
    try {
        const newExhibit = await insertExhibit(name, user_id)
        response.status(201).json(newExhibit)
    } catch (error){
        response.status(500).json({error: error})
    }
}