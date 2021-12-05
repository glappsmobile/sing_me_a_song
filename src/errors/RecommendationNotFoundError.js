class RecommendationNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecommendationNotFoundError';
  }
}

export default RecommendationNotFoundError;
