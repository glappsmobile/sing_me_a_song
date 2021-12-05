import joi from 'joi';

const createGenre = joi.object({
  name: joi.string().required(),
});

const getGenreById = joi.object({
  id: joi.number().required(),
});

export {
  createGenre,
  getGenreById,
};
