import pool from "../db/pool";

export interface SavedItem {
    edmPreview: string;
    title: string;
    description: string;
    source: string;
    provider: string;
    author: string;
}

export interface Exhibit {
    id: number,
    name: string,
    user_id: number,
    savedItems: SavedItem[]
}

export const findExhibits = async (user_id: number): Promise<Exhibit[]> => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM exhibitions WHERE user_id = $1 ORDER BY id DESC",
            [user_id]
        );
        return rows;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to fetch exhibits from the database.");
    }
};


export const insertExhibit = async (name: string, user_id: number) => {
    try {
        const { rows } = await pool.query(
            "INSERT INTO exhibitions (name, user_id) VALUES ($1, $2) RETURNING id, name, user_id, savedItems",
            [name, user_id]
        );
        return rows[0];
    } catch (error) {
        console.error("Database error in insertExhibit:", error);
        throw new Error("Failed to create exhibit in the database.");
    }
}

export const patchExhibit = async (id: number, saveditems: SavedItem[]) => {
    try {
        const { rows } = await pool.query(
            "UPDATE exhibitions SET savedItems = $1 WHERE id = $2 RETURNING *",
            [JSON.stringify(saveditems), id]
        );
        return rows[0];
    } catch (error) {
        console.error("Database error in patchExhibit:", error);
        throw new Error("Failed to update exhibit in the database.");
    }
}

export const deleteExhibitFromTable = async (id: number) => {
    try {
        const { rows } = await pool.query(
            "DELETE FROM exhibitions WHERE id = $1 RETURNING *",
            [id]    
        );
        return rows[0];
    } catch (error) {
        console.error("Database error in deleteExhibitFromTable:", error);
        throw new Error("Failed to delete exhibit from the database.");
    }
}