import * as genreService from '../../src/services/genre.service.js';
import * as genreRepository from '../../src/repositories/genre.repository.js';
import * as genreFactory from '../factories/genre.factory.js';
import GenreParamsError from '../../src/errors/GenreParamsError.js'
import GenreConflictError from '../../src/errors/GenreConflictError.js'

const sut = genreService;
const mockGenreRepository = {
  getGenreByName: () => jest.spyOn(genreRepository, 'getGenreByName'),
  createGenre: () =>  jest.spyOn(genreRepository, 'createGenre'),
  getAllGenres: () =>  jest.spyOn(genreRepository, 'getAllGenres'),
}

describe('Genre Service', () => {
  it('Should throw a GenreParamsError when name is too big', async () => {
    const body = genreFactory.createTooBigGenreNameBody();

    await expect(async () => {
      await sut.createGenre(body);
    }).rejects.toThrowError(GenreParamsError);
  });

  it('Should throw a GenreConflictError when genre already exists', async () => {
      mockGenreRepository.getGenreByName().mockImplementationOnce(() => ({ name: 'genre name' }));
      const body = genreFactory.createGenreBody();
      const promise = sut.createGenre(body);

      await expect(promise).rejects.toThrowError(GenreConflictError);
  });

  it("Should return an array with", async () => {

    const mockedGenres = [
      {id: 1, name: 'rock'}, 
      {id: 2, name: 'samba'}
    ];
    
    mockGenreRepository.getAllGenres().mockImplementationOnce(() => mockedGenres);

    const result = await sut.getAllGenres();

    expect(result).toEqual(mockedGenres);
  });
});
