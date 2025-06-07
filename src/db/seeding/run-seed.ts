import data from '../data/index';
import seed from './seed';
import pool from '../pool';

const checkIfSeedNeeded = async () => {
  const resultUsers = await pool.query('SELECT COUNT(*) FROM USERS');
  const count = parseInt(resultUsers.rows[0].count, 10);
  return count === 0;
};

const runSeed = async () => {
  try {
    const shouldSeed = await checkIfSeedNeeded();

    if (!shouldSeed) {
      console.log('Skipping seed: Data already exists.');
      return;
    }

    await seed(data, pool);
    console.log("Seeding successful!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await pool.end();
  }
};

runSeed();
