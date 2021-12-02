class GenreAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenreAlreadyExistsError';
  }
}

export default GenreAlreadyExistsError;
