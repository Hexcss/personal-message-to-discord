import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "'unsafe-inline'", 'data:'],
      connectSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  },
  frameguard: false, // to allow iframe on same origin
}));
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(routes);

export default app;
