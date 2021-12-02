import * as genreService from '../../src/services/genre.service.js';
import * as genreRepository from '../../src/repositories/genre.repository.js';
import * as genreFactory from '../factories/genre.factory.js';
import GenreNameTooBigError from '../../src/errors/GenreNameTooBigError.js'
import GenreAlreadyExistsError from '../../src/errors/GenreAlreadyExistsError.js'

const sut = genreService;
const mockGenreRepository = {
  getGenreByName: () => jest.spyOn(genreRepository, 'getGenreByName'),
  createGenre: () =>  jest.spyOn(genreRepository, 'createGenre'),
}

describe('Genre Service', () => {
  it('Should throw a GenreNameTooBigError when name is too big', async () => {
    try {
      const body = genreFactory.createTooBigGenreNameBody();

      await sut.createGenre(body);
    } catch (error) {
      expect(error instanceof GenreNameTooBigError).toEqual(true);
    }
  });

  it('Should throw a GenreAlreadyExistsError when genre already exists', async () => {
    try {
      mockGenreRepository.getGenreByName().mockImplementationOnce(() => ({ name: 'genre name' }));
      const body = genreFactory.createGenreBody();
      await sut.createGenre(body);
    } catch (error) {
      expect(error instanceof GenreAlreadyExistsError).toEqual(true);
    }
  });

  it("Should return an array with the genre name if the genre is valid and doesn't exist", async () => {
    const body = genreFactory.createGenreBody();
    
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);
    mockGenreRepository.createGenre().mockImplementationOnce(() => body);

    const result = await sut.createGenre(body);
    expect(result).toEqual(body);
  });
});
