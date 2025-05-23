import pool from "../db/pool";

export const findAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export const insertUser = async (username: string, password: string) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
  return rows[0];
};