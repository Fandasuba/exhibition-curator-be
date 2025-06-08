import { Request, Response } from "express";
import { deleteExhibitFromTable, Exhibit, findExhibits, insertExhibit, patchExhibit } from "../models/exhibitModels";

export const getExhibits = async (request: Request, response: Response): Promise<void> => {
    const { userId } = request.query;
   
    if (!userId) {
        response.status(400).json({ error: 'userId query parameter is required' });
        return;
    }
   
    try {
        const ID = Number(userId);
        const exhibits: Exhibit[] = await findExhibits(ID);
        response.status(200).json(exhibits);
    } catch (error) {
        response.status(500).json({ error: error });
    }
};

export const createExhibit = async (request: Request, response: Response): Promise<void> => {
    const { name, user_id } = request.body;
    try {
        const newExhibit = await insertExhibit(name, user_id);
        response.status(201).json(newExhibit);
    } catch (error) {
        response.status(500).json({ error: error });
    }
};

export const updateExhibit = async (request: Request, response: Response): Promise<void> => {
    const { exhibitionId } = request.params;
    const { saveditems } = request.body;
    try {
        const ID = Number(exhibitionId);
        const exhibit: Exhibit[] = await patchExhibit(ID, saveditems);
        response.status(200).json(exhibit);
    } catch (error) {
        response.status(500).json({ error: error });
    }
};

export const deleteExhibit = async (request: Request, response: Response): Promise<void> => {
    const { exhibitionId } = request.params;
    try {
        const ID = Number(exhibitionId);
        const deletedExhibit = await deleteExhibitFromTable(ID);
        response.status(200).json(deletedExhibit);
    } catch (error) {
        response.status(500).json({ error: error });
    }
};