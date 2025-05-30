import pool from "../db/pool";

export const findExhibits = async (userId: number) => {
    const { rows } = await pool.query(
    "SELECT * FROM exhibitions WHERE user_id = $1",
    [userId])
    return rows
}