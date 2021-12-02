import * as genreService from '../services/genre.service.js';
import * as genreSchema from '../schemas/genre.schema.js';

const createGenre = async (req, res) => {
  if (genreSchema.createGenre.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const { name } = req.body;

  const genre = await genreService
    .createGenre({ name });

  if (!genre) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

export {
  createGenre,
};
