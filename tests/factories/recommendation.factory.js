import faker from 'faker';

const createRecommendationBody = ({ name, youtubeLink, genresIds } = {}) => {
  const fakeName = name !== undefined ? name : faker.name.findName();
  const fakeYoutubeLink = youtubeLink || 'https://www.youtube.com/watch?v=ujb2CIWE8zY';
  const fakeGenres = genresIds || [1, 2];

  return {
    name: fakeName,
    youtubeLink: fakeYoutubeLink,
    genresIds: fakeGenres,
  };
};

export {
  createRecommendationBody,
};
