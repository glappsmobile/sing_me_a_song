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
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genres);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should return true when name length is less than 255', async () => {
    const name = stringFactory.createStringWithLength(254);
    const body = recommendationFactory.createRecommendationBody({name});

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genres);

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
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genres);

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
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genres);

    const result = await sut.createRecommendation(body);

    expect(result).toEqual(true);
  });

  it('Should return true when youtubeLink length is less than 255', async () => {
    let youtubeLink = 'https://www.youtube.com/watch?v=';
    youtubeLink += stringFactory.createStringWithLength(254 - youtubeLink.length);
    const body = recommendationFactory.createRecommendationBody({ youtubeLink });

    mockRecommendationRepository.getRecommendationByYoutubeLink().mockImplementationOnce(() => false);
    mockRecommendationRepository.createRecommendation().mockImplementationOnce(() => true);
    mockGenreRepository.getGenresByIds().mockImplementationOnce(() => body.genres);

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

  it('Should return an array with the score when the id is valid and upvoting', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  true);
    mockRecommendationRepository.upvoteRecommendation().mockImplementationOnce(() =>  ({ score: 1 }));

    const result = await sut.voteRecommendation({ id: 1, isUpvote: true});

    expect(result).toEqual({ score: 1 });
  });

  it('Should throw a RecommendationNotFoundError when a non-existent id is given and downvoting', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  false);

    const promise = sut.voteRecommendation({ id: 1, isUpvote: false});

    await expect(promise).rejects.toThrowError(RecommendationNotFoundError);
  });

  it('Should return an array with the score when the id is valid and downvoting', async () => {
    mockRecommendationRepository.getRecommendationById().mockImplementationOnce(() =>  true);
    mockRecommendationRepository.downvoteRecommendation().mockImplementationOnce(() =>  ({ score: 1 }));

    const result = await sut.voteRecommendation({ id: 1, isUpvote: false});

    expect(result).toEqual({ score: 1 });
  });
});

