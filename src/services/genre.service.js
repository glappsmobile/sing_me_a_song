import * as genreRepository from '../repositories/genre.repository.js';
import GenreConflictError from '../errors/GenreConflictError.js';
import GenreParamsError from '../errors/GenreParamsError.js';
import GenreNotFoundError from '../errors/GenreNotFoundError.js';

const createGenre = async ({ name }) => {
  const trimmedName = name.trim();

  if (trimmedName.length > 255) {
    throw new GenreParamsError('Name length must me less than 255 characters.');
  }

  if (trimmedName.length === 0) {
    throw new GenreParamsError('Name length must be greater than 0 characters.');
  }

  const genre = await genreRepository.getGenreByName({ name: trimmedName });

  if (genre) {
    throw new GenreConflictError(`The genre "${trimmedName}" already exists.`);
  }

  return genreRepository.createGenre({ name: trimmedName });
};

const getAllGenres = async () => genreRepository.getAllGenres();

const getGenreById = async ({ id }) => {
  const genre = await genreRepository.getGenreById({ id });

  if (!genre) {
    throw new GenreNotFoundError('There is no such genre with given id.');
  }

  if (genre.score === null) {
    return {
      id: genre.id,
      name: genre.name,
    };
  }

  return genre;
};

export {
  createGenre,
  getAllGenres,
  getGenreById,
};
