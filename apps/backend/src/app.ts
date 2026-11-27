import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors';
import favouriteRoutes from './routes/favouriteRoutes';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/favourite-routes', favouriteRoutes);

export default app;