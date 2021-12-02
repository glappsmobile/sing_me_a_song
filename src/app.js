import './setup.js';
import express from 'express';
import cors from 'cors';
import * as genreController from './controllers/genre.controller.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', async (req, res) => {
  res.send("I'm alive");
});

app.post('/genre', genreController.createGenre);

export default app;
