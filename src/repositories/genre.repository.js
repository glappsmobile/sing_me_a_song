import connection from '../database/connection.js';

const createGenre = async ({ name }) => {
  const transactionQuery = await connection.query(
    'INSERT INTO "genres" ("name") VALUES ($1) RETURNING name;',
    [name],
  );

  return transactionQuery.rows[0];
};

const getGenreByName = async ({ name }) => {
  const genreQuery = await connection.query(
    'SELECT * FROM genres WHERE name = $1',
    [name],
  );

  return genreQuery.rows[0];
};

const getAllGenres = async () => {
  const genresQuery = await connection.query(
    'SELECT * FROM genres;',
  );

  return genresQuery.rows;
};

export {
  createGenre,
  getGenreByName,
  getAllGenres,
};
