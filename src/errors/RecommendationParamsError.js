class RecommendationParamsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecommendationParamsError';
  }
}

export default RecommendationParamsError;
