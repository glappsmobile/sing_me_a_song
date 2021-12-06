class GenreNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenreNotFoundError';
  }
}

export default GenreNotFoundError;
