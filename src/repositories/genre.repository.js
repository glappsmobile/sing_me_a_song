import connection from '../database/connection.js';

const createGenre = async ({ name }) => {
  const transactionQuery = await connection.query(
    'INSERT INTO "genres" ("name") VALUES ($1) RETURNING name;',
    [name],
  );

  return transactionQuery.rows[0];
};

export {
  createGenre,
};
