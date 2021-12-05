import * as recommendationService from '../services/recommendation.service.js';
import * as recommendationSchema from '../schemas/recommendation.schema.js';
import RecommendationParamsError from '../errors/RecommendationParamsError.js';
import RecommendationConflictError from '../errors/RecommendationConflictError.js';
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

export {
  createRecommendation,
};
