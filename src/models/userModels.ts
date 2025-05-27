import pool from "../db/pool";

export const findAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export const insertUser = async (email: string, username: string, password: string) => {
  const { rows } = await pool.query(
    "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
    [email, username, password]
  );
  return rows[0];
};