import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

