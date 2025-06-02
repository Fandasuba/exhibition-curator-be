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
            "SELECT * FROM exhibitions WHERE user_id = $1",
            [user_id]
        );
        return rows;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to fetch exhibits from the database.");
    }
};


export const insertExhibit = async (name: string, user_id: number) => {
    const { rows } = await pool.query("INSERT into exhibitions (name, user_id) VALUES ($1, $2, $3) RETURNING name, user_id, savedItems",
    [name, user_id])
    return rows
}

export const patchExhibit = async (id: number, saveditems: SavedItem) => {
try{
    const {rows} = await pool.query(
        "UPDATE exhibitions SET savedItems = $1 WHERE id = $2",
      [JSON.stringify(saveditems), id]
    )
    return rows
} catch(error){
     console.error("Database error:", error);
        throw new Error("Failed to Update Exhibit");
}
}