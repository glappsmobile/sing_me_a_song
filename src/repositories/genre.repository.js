import connection from '../database/connection.js';

const createGenre = async ({ name }) => {
  const genreQuery = await connection.query(
    'INSERT INTO "genres" ("name") VALUES ($1) RETURNING name;',
    [name],
  );

  return genreQuery.rows[0];
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

const getGenresByIds = async ({ ids }) => {
  const genresQuery = await connection.query(
    `SELECT * FROM genres WHERE id in (${ids.join(',')});`,
  );

  return genresQuery.rows;
};

export {
  createGenre,
  getGenreByName,
  getAllGenres,
  getGenresByIds,
};
