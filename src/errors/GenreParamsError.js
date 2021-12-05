class GenreParamsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenreParamsError';
  }
}

export default GenreParamsError;
