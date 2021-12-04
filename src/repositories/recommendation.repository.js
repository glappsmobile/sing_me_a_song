import connection from '../database/connection.js';

const createRecommendation = async ({ name, youtubeLink, genres }) => {
  const songQuery = await connection.query(
    'INSERT INTO "songs" ("name", "youtube_link") VALUES ($1, $2) RETURNING *;',
    [name, youtubeLink],
  );

  const recommendation = songQuery.rows[0];

  let genreValues = '';

  genres.forEach((genreId) => {
    genreValues += `
      (${recommendation.id}, ${genreId}),`;
  });

  genreValues = `${genreValues.substring(0, genreValues.length - 1)};`;

  const recommendationsGenresQueryString = `INSERT INTO songs_genres ("song_id", "genre_id")  VALUES ${genreValues}`;

  await connection.query(recommendationsGenresQueryString);

  return recommendationsGenresQueryString;
};

const getRecommendationByYoutubeLink = async ({ youtubeLink }) => {
  const recommendationQuery = await connection.query(
    'SELECT * FROM songs WHERE youtube_link = $1 LIMIT 1',
    [youtubeLink],
  );

  return recommendationQuery.rows[0];
};

export {
  createRecommendation,
  getRecommendationByYoutubeLink,
};
