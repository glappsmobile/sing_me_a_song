import * as genreRepository from '../repositories/genre.repository.js';
import GenreConflictError from '../errors/GenreConflictError.js';
import GenreParamsError from '../errors/GenreParamsError.js';

const createGenre = async ({ name }) => {
  if (name.length > 255) {
    throw new GenreParamsError('Name is too big (over 255 chars).');
  }

  const genre = await genreRepository.getGenreByName({ name });

  if (genre) {
    throw new GenreConflictError(`The genre "${name}" already exists.`);
  }

  return genreRepository.createGenre({ name });
};

const getAllGenres = async () => genreRepository.getAllGenres();

const getGenreById = async ({ id }) => genreRepository.getGenreById({ id });

export {
  createGenre,
  getAllGenres,
  getGenreById,
};
