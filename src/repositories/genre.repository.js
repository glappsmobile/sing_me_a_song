import connection from '../database/connection.js';

const createGenre = async ({ name }) => {
  const transactionQuery = await connection.query(
    'INSERT INTO "genres" ("naame") VALUES ($1) RETURNING name;',
    [name],
  );

  return transactionQuery.rows[0];
};

const findGenreByName = async ({ name }) => {
  const genreQuery = await connection.query(
    'SELECT * FROM genres WHERE name = $1',
    [name],
  );

  return genreQuery.rows[0];
};

export {
  createGenre,
  findGenreByName,
};
