class RecommendationConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecommendationConflictError';
  }
}

export default RecommendationConflictError;
