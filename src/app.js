import './setup.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', async (req, res) => {
  res.send("I'm alive");
});

export default app;
