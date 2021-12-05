import connection from '../database/connection.js';

const createRecommendation = async ({ name, youtubeLink, genresIds }) => {
  const songQuery = await connection.query(
    'INSERT INTO "songs" ("name", "youtube_link") VALUES ($1, $2) RETURNING *;',
    [name, youtubeLink],
  );

  const recommendation = songQuery.rows[0];

  let genreValues = '';

  genresIds.forEach((genreId) => {
    genreValues += `
      (${recommendation.id}, ${genreId}),`;
  });

  genreValues = `${genreValues.substring(0, genreValues.length - 1)};`;

  const recommendationsGenresQueryString = `INSERT INTO songs_genres ("song_id", "genre_id")  VALUES ${genreValues};`;

  await connection.query(recommendationsGenresQueryString);

  return true;
};

const getRecommendationByYoutubeLink = async ({ youtubeLink }) => {
  const recommendationQuery = await connection.query(
    'SELECT * FROM songs WHERE youtube_link = $1 LIMIT 1;',
    [youtubeLink],
  );

  return recommendationQuery.rows[0];
};

const getRecommendationById = async ({ id }) => {
  const recommendationQuery = await connection.query(
    'SELECT * FROM songs WHERE id = $1 LIMIT 1;',
    [id],
  );

  return recommendationQuery.rows[0];
};

const upvoteRecommendation = async ({ id }) => {
  const recommendationQuery = await connection.query(
    'UPDATE songs SET score = score + 1 WHERE id = $1 RETURNING score;',
    [id],
  );

  return recommendationQuery.rows[0];
};

const downvoteRecommendation = async ({ id }) => {
  const recommendationQuery = await connection.query(
    'UPDATE songs SET score = score - 1 WHERE id = $1 RETURNING score;',
    [id],
  );

  return recommendationQuery.rows[0];
};

const deleteRecommendation = async ({ id }) => {
  await connection.query('DELETE FROM songs_genres WHERE song_id = $1;', [id]);
  await connection.query('DELETE FROM songs WHERE id = $1;', [id]);
};

const getRecommendationsByScore = async ({ greaterOrEqual = null, lessOrEqual = null } = {}) => {
  let queryString = `
    SELECT 
      songs.id, songs.name, songs.score, songs.youtube_link AS "youtubeLink",
      json_agg(CAST(ROW(genres.id, genres.name) AS genres )) AS genres
    FROM songs
      JOIN songs_genres
        ON songs_genres.song_id = songs.id
          JOIN genres
            ON songs_genres.genre_id = genres.id
    `;

  const preparedValues = [];

  if (greaterOrEqual !== null || lessOrEqual !== null) {
    queryString += ' WHERE';

    if (greaterOrEqual !== null) {
      preparedValues.push(greaterOrEqual);
      queryString += ` songs.score >= $${preparedValues.length}`;
    }

    if (lessOrEqual !== null) {
      if (preparedValues.length > 0) {
        queryString += ' AND';
      }

      preparedValues.push(lessOrEqual);
      queryString += ` songs.score <= $${preparedValues.length}`;
    }
  }

  queryString += ' GROUP BY songs.id;';

  const recommendationQuery = await connection.query(
    queryString,
    preparedValues,
  );

  return recommendationQuery.rows;
};

const getTopRecommendations = async ({ amount }) => {
  const queryString = `
    SELECT 
      songs.id, songs.name, songs.score, songs.youtube_link AS "youtubeLink",
      json_agg(CAST(ROW(genres.id, genres.name) AS genres )) AS genres
    FROM songs
      JOIN songs_genres
        ON songs_genres.song_id = songs.id
          JOIN genres
            ON songs_genres.genre_id = genres.id
    GROUP BY songs.id
    ORDER BY songs.score DESC
    LIMIT $1
  `;

  const recommendationQuery = await connection.query(
    queryString,
    [amount],
  );

  return recommendationQuery.rows;
};

export {
  createRecommendation,
  getRecommendationByYoutubeLink,
  upvoteRecommendation,
  getRecommendationById,
  downvoteRecommendation,
  deleteRecommendation,
  getRecommendationsByScore,
  getTopRecommendations,
};
