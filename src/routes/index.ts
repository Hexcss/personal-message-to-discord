import { Router } from 'express';
import webhookRouter from './webhooks';

const router = Router();

router.use('/', webhookRouter);

export default router;
