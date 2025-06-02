import pool from "../db/pool";

// export const getUserExhibitions = async (userId: string) => {
//   const { rows } = await pool.query(
//     "SELECT * FROM exhibitions WHERE user_id = $1 ORDER BY updated_at DESC",
//     [userId]
//   );
//   return rows;
// };

export const insertItem = async (exhibitionId: string, userId: string, newItem: object) => {
  const { rows } = await pool.query(
    "SELECT savedItems FROM exhibitions WHERE id = $1 AND user_id = $2",
    [exhibitionId, userId]
  );
  
  if (rows.length === 0) {
    throw new Error('Exhibition not found or access denied');
  }

  const currentItems = rows[0].savedItems || [];
  const updatedItems = [...currentItems, newItem];

  const { rows: updatedRows } = await pool.query(
    "UPDATE exhibitions SET savedItems = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [JSON.stringify(updatedItems), exhibitionId, userId]
  );
  
  return updatedRows[0];
};