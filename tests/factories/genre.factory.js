import faker from 'faker';

const createTooBigGenreNameBody = () => {
  let name = '';
  for (let i = 0; i < 256; i += 1) {
    name += 'a';
  }

  return {
    name,
  };
};

const createGenreBody = () => {
  const name = faker.music.genre();

  return {
    name,
  };
};

export {
  createTooBigGenreNameBody,
  createGenreBody,
};
