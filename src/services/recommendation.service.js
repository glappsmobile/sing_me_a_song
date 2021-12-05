import * as recommendationRepository from '../repositories/recommendation.repository.js';
import * as genreRepository from '../repositories/genre.repository.js';
import RecommendationParamsError from '../errors/RecommendationParamsError.js';
import RecommendationConflictError from '../errors/RecommendationConflictError.js';
import RecommendationNotFoundError from '../errors/RecommendationNotFoundError.js';

const createRecommendation = async ({ name, youtubeLink, genres }) => {
  if (name.length > 255) {
    throw new RecommendationParamsError('Name is too big (over 255 chars).');
  }

  if (genres.length === 0) {
    throw new RecommendationParamsError('The recommendation must contain at least one genre.');
  }

  const youtubePattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/gm;

  if (!youtubePattern.test(youtubeLink)) {
    throw new RecommendationParamsError('The link must be a valid youtube link.');
  }

  if (youtubeLink.length > 255) {
    throw new RecommendationParamsError('YouTube link is too big (over 255 chars).');
  }

  const youtubeLinkWasRecommended = Boolean(await recommendationRepository
    .getRecommendationByYoutubeLink({ youtubeLink }));

  if (youtubeLinkWasRecommended) {
    throw new RecommendationConflictError('This YouTube link has already been recommended.');
  }

  const uniqueGenresIds = genres.filter((genre, index) => genres.indexOf(genre) === index);

  const existingGenresWithGivenIds = await genreRepository
    .getGenresByIds({ genresIds: uniqueGenresIds });

  if (uniqueGenresIds.length !== existingGenresWithGivenIds.length) {
    throw new RecommendationParamsError('At least one of the genres ids does not exist.');
  }

  return recommendationRepository
    .createRecommendation({ name, youtubeLink, genresIds: uniqueGenresIds });
};

const voteRecommendation = async ({ id, isUpvote }) => {
  const existingRecommendationWithGivenId = await recommendationRepository
    .getRecommendationById({ id });

  if (!existingRecommendationWithGivenId) {
    throw new RecommendationNotFoundError('There is no such recommendation with given id.');
  }

  if (isUpvote) {
    return recommendationRepository.upvoteRecommendation({ id });
  }

  if (existingRecommendationWithGivenId.score <= -5) {
    await recommendationRepository.deleteRecommendation({ id });
    return ({ message: 'deleted' });
  }

  return recommendationRepository.downvoteRecommendation({ id });
};

const getRandomRecommendation = async () => {
  const randomNumber = Math.floor(Math.random() * 101);

  let recommendations;
  if (randomNumber <= 70) {
    recommendations = await recommendationRepository
      .getRecommendationsByScore({ greaterOrEqual: 11 });
  } else {
    recommendations = await recommendationRepository
      .getRecommendationsByScore({ greaterOrEqual: -5, lessOrEqual: 10 });
  }

  if (recommendations.length === 0) {
    recommendations = await recommendationRepository
      .getRecommendationsByScore({ greaterOrEqual: -5 });
  }

  if (recommendations.length === 0) {
    throw new RecommendationNotFoundError('There are no recommendations registered.');
  }

  const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

  return randomRecommendation;
};

export {
  createRecommendation,
  voteRecommendation,
  getRandomRecommendation,
};
