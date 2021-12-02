import * as genreService from '../../src/services/genre.service.js';
import * as genreRepository from '../../src/repositories/genre.repository.js';
import * as genreFactory from '../factories/genre.factory.js';
import BadRequestError from '../../src/errors/BadRequestError.js'
import ConflictError from '../../src/errors/ConflictError.js'

const sut = genreService;
const mockGenreRepository = {
  findGenreByName: () => jest.spyOn(genreRepository, 'findGenreByName'),
  createGenre: () =>  jest.spyOn(genreRepository, 'createGenre'),
}

describe('genreService', () => {
  it('Should throw a BadRequestError when name is too big', async () => {
    try {
      const body = genreFactory.createTooBigGenreNameBody();

      await sut.createGenre(body);
    } catch (error) {
      expect(error instanceof BadRequestError).toEqual(true);
    }
  });

  it('Should throw a ConflictError when genre already exists', async () => {
    try {
      mockGenreRepository.findGenreByName().mockImplementationOnce(() => ({ name: 'genre name' }));
      const body = genreFactory.createGenreBody();
      await sut.createGenre(body);
    } catch (error) {
      expect(error instanceof ConflictError).toEqual(true);
    }
  });

  it("Should return an array with the genre name if the genre is valid and doesn't exist", async () => {
    const body = genreFactory.createGenreBody();
    
    mockGenreRepository.findGenreByName().mockImplementationOnce(() => false);
    mockGenreRepository.createGenre().mockImplementationOnce(() => body);

    const result = await sut.createGenre(body);
    expect(result).toEqual(body);
  });
});
