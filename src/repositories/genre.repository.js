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

const getGenresByIds = async ({ genresIds }) => {
  const genresQuery = await connection.query(
    `SELECT * FROM genres WHERE id in (${genresIds.join(',')});`,
  );

  return genresQuery.rows;
};

const getGenreById = async ({ id }) => {
  const genresQuery = await connection.query(`
    SELECT 
      genres.id, genres.name, SUM(songs.score) AS score,
      json_agg(
        json_build_object(
          'id', songs.id,
          'name', songs.name,
          'youtubeLink', songs.youtube_link, 
          'score', songs.score,
          'genres', (
            SELECT
              json_agg(genres.*)
            FROM songs_genres
              JOIN genres
                ON songs_genres.genre_id = genres.id
            WHERE songs_genres.song_id = songs.id
          )
        )
      ) AS recommendations
    FROM genres 
      LEFT JOIN songs_genres
        ON songs_genres.genre_id = genres.id
        LEFT JOIN songs
            ON songs_genres.song_id = songs.id
    WHERE genres.id = $1 
    GROUP BY genres.id
    LIMIT 1;
  `, [id]);

  return genresQuery.rows[0];
};

export {
  createGenre,
  getGenreByName,
  getAllGenres,
  getGenresByIds,
  getGenreById,
};
