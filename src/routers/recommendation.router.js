import { Router } from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';

const router = new Router();

router.post('', recommendationController.createRecommendation);

router.post('/:id/:action', recommendationController.voteRecommendation);

router.get('/random', recommendationController.getRandomRecommendation);

router.get('/genres/:id/random', recommendationController.getRandomRecommendationWithGenre);

router.get('/top/:amount', recommendationController.getTopRecommendations);

export default router;
