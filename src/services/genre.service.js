import * as genreRepository from '../repositories/genre.repository.js';
import GenreAlreadyExistsError from '../errors/GenreAlreadyExistsError.js';
import GenreNameTooBigError from '../errors/GenreNameTooBigError.js';

const createGenre = async ({ name }) => {
  if (name.length > 255) {
    throw new GenreNameTooBigError('Name is too big (over 255 chars).');
  }

  const genre = await genreRepository.getGenreByName({ name });

  if (genre) {
    throw new GenreAlreadyExistsError(`The genre "${name}" already exists.`);
  }

  return genreRepository.createGenre({ name });
};

const getAllGenres = async () => genreRepository.getAllGenres();

export {
  createGenre,
  getAllGenres,
};
