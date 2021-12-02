class GenreNameTooBigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenreNameTooBigError';
  }
}

export default GenreNameTooBigError;
