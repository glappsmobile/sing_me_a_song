import * as recommendationService from '../services/recommendation.service.js';
import * as recommendationSchema from '../schemas/recommendation.schema.js';
import RecommendationParamsError from '../errors/RecommendationParamsError.js';
import RecommendationConflictError from '../errors/RecommendationConflictError.js';
import RecommendationNotFoundError from '../errors/RecommendationNotFoundError.js';
import { statusCode } from '../enums/httpStatus.js';

const createRecommendation = async (req, res, next) => {
  try {
    if (recommendationSchema.createRecommendation.validate(req.body).error) {
      return res.sendStatus(statusCode.BAD_REQUEST);
    }

    const { name, youtubeLink, genres } = req.body;

    await recommendationService.createRecommendation({ name, youtubeLink, genres });

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
  try {
    if (recommendationSchema.voteRecommendation.validate(req.params).error) {
      return res.sendStatus(statusCode.BAD_REQUEST);
    }

    const { id, action } = req.params;
    const isUpvote = action === 'upvote';
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

const getTopRecommendations = async (req, res, next) => {
  if (recommendationSchema.getTopRecommendations.validate(req.params).error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  try {
    const { amount } = req.params;

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
};
