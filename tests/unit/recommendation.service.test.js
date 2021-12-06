import * as recommendationService from '../../src/services/recommendation.service.js';
import * as recommendationRepository from '../../src/repositories/recommendation.repository.js';
import * as genreRepository from '../../src/repositories/genre.repository.js';
import * as stringFactory from '../factories/string.factory.js';
import * as recommendationFactory from '../factories/recommendation.factory.js';
import RecommendationParamsError from '../../src/errors/RecommendationParamsError.js'
import RecommendationConflictError from '../../src/errors/RecommendationConflictError.js'
import RecommendationNotFoundError from '../../src/errors/RecommendationNotFoundError.js'

const sut = recommendationService;

const mockRecommendationRepository = {
  getRecommendationByYoutubeLink: () => jest.spyOn(recommendationRepository, 'getRecommendationByYoutubeLink'),
  createRecommendation: () => jest.spyOn(recommendationRepository, 'createRecommendation'),
  getRecommendationById: () => jest.spyOn(recommendationRepository, 'getRecommendationById'),
  upvoteRecommendation: () => jest.spyOn(recommendationRepository, 'upvoteRecommendation'),
  downvoteRecommendation: () => jest.spyOn(recommendationRepository, 'downvoteRecommendation'),
  deleteRecommendation: () => jest.spyOn(recommendationRepository, 'deleteRecommendation'),
  getRecommendations: () => jest.spyOn(recommendationRepository, 'getRecommendations'),
  getTopRecommendations: () => jest.spyOn(recommendationRepository, 'getTopRecommendations'),
}

const mockGenreRepository = {
  getGenresByIds: () => jest.spyOn(genreRepository, 'getGenresByIds'),
}

describe('Recommendation Service: createRecommendation', () => {

  it('Should throw a RecommendationParamsError when name length is over 255', async () => {
    const name = stringFactory.createStringWithLength(256);
    const body = recommendationFactory.createRecommendationBody({name});

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationParamsError);
  });

  it('Should return true when name length is 255', async () => {
    const name = stringFactory.createStringWithLength(255);
    const body = recommendationFactory.createRecommendationBody({name});

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genresIds);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should return true when name length is less than 255', async () => {
    const name = stringFactory.createStringWithLength(254);
    const body = recommendationFactory.createRecommendationBody({name});

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genresIds);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should throw a RecommendationParamsError when genres length is 0', async () => {
    const body = recommendationFactory.createRecommendationBody({ genres: [] });

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationParamsError);
  });

  it('Should return true when genres length is over 0', async () => {
    const body = recommendationFactory.createRecommendationBody({ genres: [1] });

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genresIds);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should throw a RecommendationParamsError when the link is not a link', async () => {
    const body = recommendationFactory.createRecommendationBody({ youtubeLink: 'not a link' });

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationParamsError);
  });

  it('Should throw a RecommendationParamsError when the link is not a youtube link', async () => {
    const body = recommendationFactory.createRecommendationBody({ youtubeLink: 'https://thispersondoesnotexist.com/' });

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationParamsError);
  });

  it('Should throw a RecommendationParamsError when the link is over 255 characters', async () => {
    let youtubeLink = 'https://www.youtube.com/watch?v=';
    youtubeLink += stringFactory.createStringWithLength(256 - youtubeLink.length);
    const body = recommendationFactory.createRecommendationBody({ youtubeLink });

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationParamsError);
  });

  it('Should return true when youtubeLink length is 255', async () => {
    let youtubeLink = 'https://www.youtube.com/watch?v=';
    youtubeLink += stringFactory.createStringWithLength(255 - youtubeLink.length);
    const body = recommendationFactory.createRecommendationBody({ youtubeLink });

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genresIds);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should return true when youtubeLink length is less than 255', async () => {
    let youtubeLink = 'https://www.youtube.com/watch?v=';
    youtubeLink += stringFactory.createStringWithLength(254 - youtubeLink.length);
    const body = recommendationFactory.createRecommendationBody({ youtubeLink });

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genresIds);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should throw a RecommendationParamsError when the link is over 255 characters', async () => {
    const body = recommendationFactory.createRecommendationBody();

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => true);

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationConflictError);
  });

  it('Should throw a RecommendationParamsError when there are less genres in the database than unique genres in the param', async () => {
    const body = recommendationFactory.createRecommendationBody({ genres: [1, 2, 3] });

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => [1, 2]);

    const promise = sut.createRecommendation(body);

    await expect(promise).rejects.toThrowError(RecommendationParamsError);
  });
});

describe('Recommendation Service: voteRecommendation', () => {

  it('Should throw a RecommendationNotFoundError when a non-existent id is given and upvoting', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  false);

    const promise = sut.voteRecommendation({ id: 1, isUpvote: true});

    await expect(promise).rejects.toThrowError(RecommendationNotFoundError);
  });

  it('Should return an object with the score when the id is valid and upvoting', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  ({ score: 1 }));
    mockRecommendationRepository.upvoteRecommendation().mockImplementationOnce(() =>  ({ score: 2 }));

    const result = await sut.voteRecommendation({ id: 1, isUpvote: true});

    expect(result).toEqual({ score: 2 });
  });

  it('Should throw a RecommendationNotFoundError when a non-existent id is given and downvoting with score above -5', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  false);

    const promise = sut.voteRecommendation({ id: 1, isUpvote: false});

    await expect(promise).rejects.toThrowError(RecommendationNotFoundError);
  });

  it('Should return an object with the score when the id is valid and downvoting with score above -5', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  ({ score: 1 }));
    mockRecommendationRepository.downvoteRecommendation().mockImplementationOnce(() =>  ({ score: 0 }));

    const result = await sut.voteRecommendation({ id: 1, isUpvote: false});

    expect(result).toEqual({ score: 0 });
  });

  it('Should return an object with the deletion message when the id is valid and downvoting with score -5', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  ({ score: -5 }));
    mockRecommendationRepository.deleteRecommendation().mockImplementationOnce(() => true);

    const result = await sut.voteRecommendation({ id: 1, isUpvote: false});

    expect(result).toEqual({ message: 'deleted' });
  });
});

describe('Recommendation Service: getRandomRecommendation', () => {

  it('Should return a recommendation with score greater than or equal 11 when Math.random is equal 0.7', async () => {
    global.Math.random = () => 0.7;
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(({ lessOrEqual, greaterOrEqual, genreId }) =>  {
      if (greaterOrEqual === 11, lessOrEqual === undefined , genreId === undefined) {
        return [{ score: 11 }];
      }

      return [];
    });

    const result = await sut.getRandomRecommendation();

    expect(result.score).toBeGreaterThanOrEqual(11);
  });

  it('Should return a recommendation with score greater than or equal 11 when Math.random is less than 0.7', async () => {
    global.Math.random = () => 0.69;
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(({ lessOrEqual, greaterOrEqual, genreId }) =>  {
      if (greaterOrEqual === 11, lessOrEqual === undefined, genreId === undefined) {
        return [{ score: 11 }];
      }

      return [];
    });

    const result = await sut.getRandomRecommendation();

    expect(result.score).toBeGreaterThanOrEqual(11);
  });

  it('Should return a recommendation with score greater than or equal -5 and less than or equal 10 when Math.random is greater than 0.7', async () => {
    global.Math.random = () => 0.71;
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(({ lessOrEqual, greaterOrEqual, genreId }) =>  {
      if (greaterOrEqual === -5 && lessOrEqual === 10, genreId === undefined) {
        return [{ score: -2 }];
      }

      return [];
    });

    const result = await sut.getRandomRecommendation();

    expect(result.score).toBeLessThanOrEqual(10);
    expect(result.score).toBeGreaterThanOrEqual(-5);
  });

  it('Should return a recommendation with score greater than -5 when Math.random is equal 0.7 but there are no recommendations with score less than or equal 10', async () => {
    global.Math.random = () => 0.70;
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(() => []);
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(({ lessOrEqual, greaterOrEqual, genreId }) =>  {
      if (greaterOrEqual === -5 && lessOrEqual === undefined, genreId === undefined) {
      return [{ score: 11 }];
    }

    return [];
  });

    const result = await sut.getRandomRecommendation();

    expect(result.score).toBeGreaterThanOrEqual(-5);
  });


  it('Should return a recommendation with score greater than -5 when Math.random is less than 0.7 but there are no recommendations with score less than or equal 10', async () => {
    global.Math.random = () => 0.69;
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(() => []);
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(({ lessOrEqual, greaterOrEqual, genreId }) =>  {
      if (greaterOrEqual === -5 && lessOrEqual === undefined, genreId === undefined) {
      return [{ score: 11 }];
    }

    return [];
  });

    const result = await sut.getRandomRecommendation();

    expect(result.score).toBeGreaterThanOrEqual(-5);
  });

  it('Should throw a RecommendationNotFoundError when there are no recommendations registered', async () => {
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(() => []);
    mockRecommendationRepository.getRecommendations().mockImplementationOnce(() => []);

    const promise = sut.getRandomRecommendation();

    await expect(promise).rejects.toThrowError(RecommendationNotFoundError);
  });
});

describe('Recommendation Service: getTopRecommendations', () => {

  it('Should return an empty array when amount is less than 0', async () => {
    const result = await sut.getTopRecommendations({ amount: -1 });

    expect(result).toEqual([]);
  });

  it('Should return an empty array when amount is 0', async () => {
    const result = await sut.getTopRecommendations({ amount: 0 });

    expect(result).toEqual([]);
  });

  it('Should return a recommendation when amount is greater than 0', async () => {
    const recommendation = { id: 9 };
    
    mockRecommendationRepository.getTopRecommendations().mockImplementationOnce(() => recommendation);

    const result = await sut.getTopRecommendations({ amount: 1 });

    expect(result).toEqual(recommendation);
  });
});
