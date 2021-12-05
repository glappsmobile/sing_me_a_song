import { Router } from 'express';
import * as genreController from '../controllers/genre.controller.js';

const router = new Router();

router.get('', genreController.getAllGenres);

router.post('', genreController.createGenre);

router.post('/:id', genreController.getGenreById);

export default router;
