import * as genreService from '../../src/services/genre.service.js';
import * as genreRepository from '../../src/repositories/genre.repository.js';
import * as genreFactory from '../factories/genre.factory.js';
import GenreParamsError from '../../src/errors/GenreParamsError.js'
import GenreConflictError from '../../src/errors/GenreConflictError.js'
import GenreNotFoundError from '../../src/errors/GenreNotFoundError.js'

const sut = genreService;
const mockGenreRepository = {
  getGenreByName: () => jest.spyOn(genreRepository, 'getGenreByName'),
  createGenre: () =>  jest.spyOn(genreRepository, 'createGenre'),
  getAllGenres: () =>  jest.spyOn(genreRepository, 'getAllGenres'),
  getGenreById: () =>  jest.spyOn(genreRepository, 'getGenreById'),
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

describe('Genre Service: getGenreById', () => {
  it('Should throw a GenreNotFoundError when there are no genres with given id', async () => {
    mockGenreRepository.getGenreById().mockImplementationOnce(() => false);

    const promise = sut.getGenreById({ id: 1 });

    await expect(promise).rejects.toThrowError(GenreNotFoundError);
  });

  it('Should only return id and name when the genre score is null', async () => {
    const genre = {
      id: 1,
      name: "mock",
      score: null,
      recommendations: []
    }

    mockGenreRepository.getGenreById().mockImplementationOnce(() => genre);

    const result = await sut.getGenreById({ id: 1 });

    expect(result).toEqual({ id: genre.id, name: genre.name });
  });

  it('Should return the complete genre when the genre exists and the score is not null', async () => {
    const genre = {
      id: 1,
      name: "mock",
      score: 10,
      recommendations: []
    }

    mockGenreRepository.getGenreById().mockImplementationOnce(() => genre);

    const result = await sut.getGenreById({ id: 1 });

    expect(result).toEqual(genre);
  });
});