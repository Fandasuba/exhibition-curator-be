import { Pool } from "pg";

interface SeedData {
  userData: any[];
  exhibitionsData: any[];
}

export default async function seed(data: SeedData, pool: Pool): Promise<void> {
  const client = await pool.connect();
  
  try {
    await client.query("BEGIN");
    
    await client.query("DROP TABLE IF EXISTS exhibitions CASCADE");
    await client.query("DROP TABLE IF EXISTS users CASCADE");
    
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    for (const user of data.userData) {
      await client.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", 
        [user.username, user.email, user.password]
      );
    }

    await client.query(`
      CREATE TABLE exhibitions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        savedItems JSONB DEFAULT '[]'
      )
    `);

    for (const exhibition of data.exhibitionsData) {
      await client.query(
        "INSERT INTO exhibitions (name, user_id, savedItems) VALUES ($1, $2, $3)",
        [
          exhibition.name,
          exhibition.user_id,
          JSON.stringify(exhibition.savedItems)
        ]
      );
    }

    await client.query("COMMIT");
    console.log("Database seeded successfully!");
    
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}