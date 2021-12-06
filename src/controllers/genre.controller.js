import * as genreService from '../services/genre.service.js';
import * as genreSchema from '../schemas/genre.schema.js';
import GenreConflictError from '../errors/GenreConflictError.js';
import GenreParamsError from '../errors/GenreParamsError.js';
import GenreNotFoundError from '../errors/GenreNotFoundError.js';
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
    if (error instanceof GenreConflictError) {
      return res.status(statusCode.CONFLICT).send(error.message);
    }

    if (error instanceof GenreParamsError) {
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

const getGenreById = async (req, res, next) => {
  try {
    if (genreSchema.getGenreById.validate(req.params).error) {
      return res.sendStatus(statusCode.BAD_REQUEST);
    }

    const { id } = req.params;

    const genre = await genreService.getGenreById({ id });

    return res.send(genre);
  } catch (error) {
    if (error instanceof GenreNotFoundError) {
      return res.status(statusCode.NOT_FOUND).send(error.message);
    }
    next(error);
  }
};

export {
  createGenre,
  getAllGenres,
  getGenreById,
};
