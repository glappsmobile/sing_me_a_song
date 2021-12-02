import './setup.js';
import express from 'express';
import cors from 'cors';
import * as genreController from './controllers/genre.controller.js';
import serverError from './middlewares/serverError.middleware.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', async (req, res) => {
  res.send("I'm alive");
});

app.post('/genres', genreController.createGenre);

app.get('/genres', genreController.getAllGenres);

app.use(serverError);

export default app;
