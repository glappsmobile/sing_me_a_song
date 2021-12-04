import joi from 'joi';

const createRecommendation = joi.object({
  name: joi.string().required(),
  youtubeLink: joi.string().required(),
  genres: joi.array().required(),
});

export { createRecommendation };
