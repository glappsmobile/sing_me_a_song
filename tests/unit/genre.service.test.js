import * as genreService from '../../src/services/genre.service.js';
import * as genreRepository from '../../src/repositories/genre.repository.js';
import * as genreFactory from '../factories/genre.factory.js';
import GenreParamsError from '../../src/errors/GenreParamsError.js'
import GenreConflictError from '../../src/errors/GenreConflictError.js'
import GenreNotFoundError from '../../src/errors/GenreNotFoundError.js'
import * as stringFactory from '../factories/string.factory.js';

const sut = genreService;

const mockGenreRepository = {
  getGenreByName: () => jest.spyOn(genreRepository, 'getGenreByName'),
  createGenre: () =>  jest.spyOn(genreRepository, 'createGenre'),
  getAllGenres: () =>  jest.spyOn(genreRepository, 'getAllGenres'),
  getGenreById: () =>  jest.spyOn(genreRepository, 'getGenreById'),
}

describe('Genre Service: createGenre', () => {
  it('Should throw a GenreParamsError when name length is greater than 255', async () => {
    const name = stringFactory.createStringWithLength(256);

    const promise = sut.createGenre({ name });

    await expect(promise).rejects.toThrowError(GenreParamsError);
  });

  it('Should return an object with the genre name and id when name length is equal to 255 and genre does not exist', async () => {
    const name = stringFactory.createStringWithLength(255);

    const genre = { id: 1, name }

    mockGenreRepository.createGenre().mockImplementationOnce(() => genre);
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);

    const result = await sut.createGenre({ name });

    expect(result).toBe(genre);
  });

  it('Should return an object with the genre name and id when name length is less than 255 and genre does not exist', async () => {
    const name = stringFactory.createStringWithLength(254);

    const genre = { id: 1, name }

    mockGenreRepository.createGenre().mockImplementationOnce(() => genre);
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);

    const result = await sut.createGenre({ name });

    expect(result).toBe(genre);
  });

  it('Should throw a GenreParamsError when name length is equal 0', async () => {
    const name = "";

    const promise = sut.createGenre({ name });

    await expect(promise).rejects.toThrowError(GenreParamsError);
  });

  it('Should return an object with the genre name and id when name length is greater than 0 and genre does not exist', async () => {
    const name = "a";

    const genre = { id: 1, name }

    mockGenreRepository.createGenre().mockImplementationOnce(() => genre);
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);

    const result = await sut.createGenre({ name });

    expect(result).toBe(genre);
  });

  it('Should throw a GenreParamsError when trimmed name length is greater than 255', async () => {
    const name = "     " + stringFactory.createStringWithLength(256) + "     ";

    const promise = sut.createGenre({ name });

    await expect(promise).rejects.toThrowError(GenreParamsError);
  });

  it('Should return an object with the genre name and id when name length is equal to 255 and genre does not exist', async () => {
    const name = "     " + stringFactory.createStringWithLength(255) + "     ";

    const genre = { id: 1, name }

    mockGenreRepository.createGenre().mockImplementationOnce(() => genre);
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);

    const result = await sut.createGenre({ name });

    expect(result).toBe(genre);
  });

  it('Should return an object with the genre name and id when name length is less than 255 and genre does not exist', async () => {
    const name = "     " + stringFactory.createStringWithLength(254) + "     ";

    const genre = { id: 1, name }

    mockGenreRepository.createGenre().mockImplementationOnce(() => genre);
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);

    const result = await sut.createGenre({ name });

    expect(result).toBe(genre);
  });

  it('Should throw a GenreParamsError when name length is equal 0', async () => {
    const name = "     ";

    const promise = sut.createGenre({ name });

    await expect(promise).rejects.toThrowError(GenreParamsError);
  });

  it('Should return an object with the genre name and id when name length is greater than 0 and genre does not exist', async () => {
    const name = "     a     ";

    const genre = { id: 1, name }

    mockGenreRepository.createGenre().mockImplementationOnce(() => genre);
    mockGenreRepository.getGenreByName().mockImplementationOnce(() => false);

    const result = await sut.createGenre({ name });

    expect(result).toBe(genre);
  });

  it('Should throw a GenreConflictError when genre already exists', async () => {
      mockGenreRepository.getGenreByName().mockImplementationOnce(() => ({ name: 'genre name' }));
      
      const body = genreFactory.createGenreBody();

      const promise = sut.createGenre(body);

      await expect(promise).rejects.toThrowError(GenreConflictError);
  });
});

describe('Genre Service: getAllGenres', () => {
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