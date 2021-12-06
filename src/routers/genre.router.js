import { Router } from 'express';
import * as genreController from '../controllers/genre.controller.js';

const router = new Router();

router.get('', genreController.getAllGenres);

router.post('', genreController.createGenre);

router.get('/:id', genreController.getGenreById);

export default router;
