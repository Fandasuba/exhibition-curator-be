import pool from "../db/pool";

interface SavedItem {
  title: string;
  source: string;
  description?: string;
  author?: string;
  provider?: string;
  edmPreview?: string;
}

export const insertItem = async (exhibitionId: string, userId: string, newItem: SavedItem) => {
  console.log("insertItem called with:", { exhibitionId, userId, newItem });
  
  const { rows } = await pool.query(
    "SELECT saveditems FROM exhibitions WHERE id = $1 AND user_id = $2",
    [exhibitionId, userId]
  );
 
  console.log("Current exhibition data:", rows[0]);
  
  if (rows.length === 0) {
    throw new Error('Exhibition not found or access denied');
  }
  
  const currentItems: SavedItem[] = rows[0].saveditems || [];
  console.log("Current items:", currentItems);
  
  const isDuplicate = currentItems.some((existingItem: SavedItem) => 
    existingItem.title === newItem.title && 
    existingItem.source === newItem.source
  );
  
  if (isDuplicate) {
    throw new Error('This item is already in the exhibition');
  }
  
  const updatedItems = [...currentItems, newItem];
  console.log("Updated items:", updatedItems);
  
  const { rows: updatedRows } = await pool.query(
    "UPDATE exhibitions SET saveditems = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [JSON.stringify(updatedItems), exhibitionId, userId]
  );
 
  console.log("Final result:", updatedRows[0]);
  return updatedRows[0];
};