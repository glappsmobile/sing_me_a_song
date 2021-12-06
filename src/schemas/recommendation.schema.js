import joi from 'joi';

const createRecommendation = joi.object({
  name: joi.string().required(),
  youtubeLink: joi.string().required(),
  genresIds: joi.array().items(joi.number()).required(),
});

const voteRecommendation = joi.object({
  id: joi.number().required(),
  action: joi.string().valid('upvote', 'downvote').required(),
});

const getTopRecommendations = joi.object({
  amount: joi.number().required(),
});

export {
  createRecommendation,
  voteRecommendation,
  getTopRecommendations,
};
