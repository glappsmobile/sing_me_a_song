import { Router } from 'express';
import * as recommendationController from '../controllers/recommendation.controller.js';

const router = new Router();

router.post('', recommendationController.createRecommendation);

router.post('/:id/:action', recommendationController.voteRecommendation);

// router.post('/:id/downvote', recommendationController.downvoteRecommendation);

export default router;
