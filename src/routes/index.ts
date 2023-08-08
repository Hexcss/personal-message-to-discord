import { Router } from 'express';
import webhookRouter from './webhook';

const router = Router();

router.use('/', webhookRouter);

export default router;
