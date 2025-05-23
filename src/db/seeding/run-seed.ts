import data from '../data/index';
import seed from './seed';
import pool from '../pool';

const runSeed = async () => {
  try {
    await seed(data, pool);
    console.log("Seeding successful!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await pool.end();
  }
};

runSeed();