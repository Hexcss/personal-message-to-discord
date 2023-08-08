import { Router } from 'express';
import discordRouter from './github.webhook';

const router = Router();

router.use('/webhook_handler', discordRouter);

export default router;