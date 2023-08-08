import { Router } from 'express';
import githubRouter from './github.webhook';
import netlifyRouter from './netlify.webhook';

const router = Router();

router.use('/webhook_github', githubRouter);
router.use('/webhook_netlify', netlifyRouter)

export default router;