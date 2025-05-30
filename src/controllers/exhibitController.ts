import { Request, Response } from "express";
import { findExhibits } from "../models/exhibitModels";

export const getExhibits = async (request: Request, response: Response) => {
    const { id } = request.body
    try{
        const exhibits = await findExhibits(id)
        response.status(200).json(exhibits)
    } catch(error){
        response.status(500).json({error: error })
    }
}