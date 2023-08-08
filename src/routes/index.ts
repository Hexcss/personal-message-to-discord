import { Router } from 'express';
import webhookRouter from './webhooks';

const router = Router();

router.use('/', webhookRouter);
router.use('/webhook_handler', webhookRouter);

export default router;