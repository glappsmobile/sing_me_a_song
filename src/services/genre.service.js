import * as genreRepository from '../repositories/genre.repository.js';

const createGenre = async ({ name }) => genreRepository.createGenre({ name });

export {
  createGenre,
};
