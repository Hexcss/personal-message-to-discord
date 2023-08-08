import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.static(path.join(__dirname, '../public')));

app.use(routes);

export default app;
