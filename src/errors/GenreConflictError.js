class GenreConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenreConflictError';
  }
}

export default GenreConflictError;
