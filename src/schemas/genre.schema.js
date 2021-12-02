import joi from 'joi';

const createGenre = joi.object({
  name: joi.string().required(),
});

export { createGenre };
