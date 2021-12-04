import * as recommendationRepository from '../repositories/recommendation.repository.js';
import * as genreRepository from '../repositories/genre.repository.js';
import RecommendationParamsError from '../errors/RecommendationParamsError.js';
import RecommendationConflictError from '../errors/RecommendationConflictError.js';

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

  const existingGenresWithGivenIds = await genreRepository.getGenresByIds({ ids: genres });

  if (genres.length !== existingGenresWithGivenIds.length) {
    throw new RecommendationParamsError('At least one of the genres ids does not exist.');
  }

  return recommendationRepository.createRecommendation({ name, youtubeLink, genres });
};

export {
  createRecommendation,
};
