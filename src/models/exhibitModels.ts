import pool from "../db/pool";

export const findExhibits = async (user_id: number) => {
    console.log(user_id, "testing if userId is coming through")
    const { rows } = await pool.query(
    "SELECT * FROM exhibitions WHERE user_id = $1",
    [user_id])
    console.log(rows, "Rows in findExhibits")
    return rows
}

export const insertExhibit = async (name: string, user_id: number) => {
    const { rows } = await pool.query("INSERT into exhibitions (name, user_id) VALUES ($1, $2, $3) RETURNING name, user_id, savedItems",
    [name, user_id])
    return rows
}