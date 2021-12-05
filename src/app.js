import './setup.js';
import express from 'express';
import cors from 'cors';
import serverError from './middlewares/serverError.middleware.js';
import genreRouter from './routers/genre.router.js';
import recommendationRouter from './routers/recommendation.router.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', async (req, res) => {
  res.send("I'm alive");
});

app.use('/genres', genreRouter);
app.use('/recommendation', recommendationRouter);

app.use(serverError);

export default app;
