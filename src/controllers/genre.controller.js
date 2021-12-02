import * as genreService from '../services/genre.service.js';
import * as genreSchema from '../schemas/genre.schema.js';
import ConflictError from '../errors/ConflictError.js';
import BadRequestError from '../errors/BadRequestError.js';

const createGenre = async (req, res, next) => {
  try {
    if (genreSchema.createGenre.validate(req.body).error) {
      return res.sendStatus(400);
    }

    const { name } = req.body;
    const genre = await genreService.createGenre({ name });

    return res.send(genre);
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(404).send(error.message);
    }

    if (error instanceof BadRequestError) {
      return res.status(400).send(error.message);
    }

    next(error);
  }
};

export {
  createGenre,
};
