import { Pool } from "pg";

interface SeedData {
  userData: any[];
  exhibitionsData: any[];
}

// Correct function syntax: async function (no => here)
export default async function seed(data: SeedData, pool: Pool): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query("DROP TABLE IF EXISTS users CASCADE");
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
      )
    `);

    for (const user of data.userData) {
      await client.query("INSERT INTO users (username, name) VALUES ($1, $2)", [
        user.username,
        user.name,
      ]);
    }

    await client.query("DROP TABLE IF EXISTS exhibitions CASCADE");
    await client.query(`
      CREATE TABLE exhibitions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        saved_items JSONB NOT NULL
      )
    `);

    for (const exhibition of data.exhibitionsData) {
      await client.query(
        "INSERT INTO exhibitions (name, saved_items) VALUES ($1, $2)",
        [exhibition.name, JSON.stringify(exhibition.savedItems)]
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