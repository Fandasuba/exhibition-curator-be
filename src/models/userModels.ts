import pool from "../db/pool";

export const findAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export const insertUser = async (email: string, username: string, password: string) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return rows[0];
};

export const findUserByUsername = async (username: string) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return rows[0];
};