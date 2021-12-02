import * as genreService from '../services/genre.service.js';
import * as genreSchema from '../schemas/genre.schema.js';
import GenreAlreadyExistsError from '../errors/GenreAlreadyExistsError.js';
import GenreNameTooBigError from '../errors/GenreNameTooBigError.js';
import { statusCode } from '../enums/httpStatus.js';

const createGenre = async (req, res, next) => {
  try {
    if (genreSchema.createGenre.validate(req.body).error) {
      return res.sendStatus(statusCode.BAD_REQUEST);
    }

    const { name } = req.body;
    const genre = await genreService.createGenre({ name });

    return res.status(statusCode.CREATED).send(genre);
  } catch (error) {
    if (error instanceof GenreAlreadyExistsError) {
      return res.status(statusCode.CONFLICT).send(error.message);
    }

    if (error instanceof GenreNameTooBigError) {
      return res.status(statusCode.BAD_REQUEST).send(error.message);
    }

    next(error);
  }
};

const getAllGenres = async (req, res, next) => {
  try {
    const genres = await genreService.getAllGenres();

    return res.send(genres);
  } catch (error) {
    next(error);
  }
};

export {
  createGenre,
  getAllGenres,
};
