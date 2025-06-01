import express from 'express';
import registroRoutes from './routes/registroRoutes';

const app = express();

app.use(express.json());
app.use('/registro', registroRoutes);

export default app;
