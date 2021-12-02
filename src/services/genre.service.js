import * as genreRepository from '../repositories/genre.repository.js';
import ConflictError from '../errors/ConflictError.js';

const createGenre = async ({ name }) => {
  const genre = await genreRepository.findGenreByName({ name });

  if (genre) {
    throw new ConflictError(`The genre "${name}" already exists.`);
  }

  return genreRepository.createGenre({ name });
};

export {
  createGenre,
};
