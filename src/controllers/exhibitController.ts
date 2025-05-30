import { Request, Response } from "express";
import { findExhibits, insertExhibit } from "../models/exhibitModels";

export const getExhibits = async (request: Request, response: Response) => {
    const { id } = request.body
    try{
        const exhibits = await findExhibits(id)
        response.status(200).json(exhibits)
    } catch(error){
        response.status(500).json({error: error })
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