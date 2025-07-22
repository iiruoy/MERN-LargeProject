import express, { Request, Response } from 'express';
import cors from 'cors';


// const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/*
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});
*/

app.get('/api/items', (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'Item A' }, { id: 2, name: 'Item B' }]);
});

// test
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});