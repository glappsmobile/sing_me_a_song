import * as recommendationService from '../services/recommendation.service.js';
import * as recommendationSchema from '../schemas/recommendation.schema.js';
import * as genreSchema from '../schemas/genre.schema.js';
import RecommendationParamsError from '../errors/RecommendationParamsError.js';
import RecommendationConflictError from '../errors/RecommendationConflictError.js';
import RecommendationNotFoundError from '../errors/RecommendationNotFoundError.js';
import { statusCode } from '../enums/httpStatus.js';

const createRecommendation = async (req, res, next) => {
  if (recommendationSchema.createRecommendation.validate(req.body).error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const { name, youtubeLink, genresIds } = req.body;

  try {
    await recommendationService.createRecommendation({ name, youtubeLink, genresIds });

    return res.sendStatus(statusCode.CREATED);
  } catch (error) {
    if (error instanceof RecommendationParamsError) {
      return res.status(statusCode.BAD_REQUEST).send(error.message);
    }

    if (error instanceof RecommendationConflictError) {
      return res.status(statusCode.CONFLICT).send(error.message);
    }

    next(error);
  }
};

const voteRecommendation = async (req, res, next) => {
  if (recommendationSchema.voteRecommendation.validate(req.params).error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const { id, action } = req.params;

  const isUpvote = action === 'upvote';

  try {
    const recommendationNewScore = await recommendationService.voteRecommendation({ id, isUpvote });

    res.status(statusCode.OK).send(recommendationNewScore);
  } catch (error) {
    if (error instanceof RecommendationNotFoundError) {
      return res.status(statusCode.NOT_FOUND).send(error.message);
    }

    next(error);
  }
};

const getRandomRecommendation = async (req, res, next) => {
  try {
    const recommendation = await recommendationService.getRandomRecommendation();
    res.send(recommendation);
  } catch (error) {
    if (error instanceof RecommendationNotFoundError) {
      return res.status(statusCode.NOT_FOUND).send(error.message);
    }

    next(error);
  }
};

const getRandomRecommendationWithGenre = async (req, res, next) => {
  if (genreSchema.getGenreById.validate(req.params).error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const { id } = req.params;

  try {
    const recommendation = await recommendationService
      .getRandomRecommendation({ genreId: id });

    res.send(recommendation);
  } catch (error) {
    if (error instanceof RecommendationNotFoundError) {
      return res.status(statusCode.NOT_FOUND).send(error.message);
    }

    next(error);
  }
};

const getTopRecommendations = async (req, res, next) => {
  if (recommendationSchema.getTopRecommendations.validate(req.params).error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const { amount } = req.params;

  try {
    const recommendations = await recommendationService.getTopRecommendations({ amount });

    res.send(recommendations);
  } catch (error) {
    next(error);
  }
};

export {
  createRecommendation,
  voteRecommendation,
  getRandomRecommendation,
  getTopRecommendations,
  getRandomRecommendationWithGenre,
};
