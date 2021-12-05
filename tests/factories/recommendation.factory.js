import faker from 'faker';

const createRecommendationBody = ({ name, youtubeLink, genres } = {}) => {
  const fakeName = name || faker.name.findName();
  const fakeYoutubeLink = youtubeLink || 'https://www.youtube.com/watch?v=ujb2CIWE8zY';
  const fakeGenres = genres || [1, 2];

  return {
    name: fakeName,
    youtubeLink: fakeYoutubeLink,
    genres: fakeGenres,
  };
};

export {
  createRecommendationBody,
};
