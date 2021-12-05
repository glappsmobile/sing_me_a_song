const createStringWithLength = (length) => {
  let string = '';
  for (let i = 0; i < length; i += 1) {
    string += 'a';
  }

  return string;
};

export {
  createStringWithLength,
};
