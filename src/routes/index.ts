import { Router } from 'express';
import githubRouter from './github.webhook';
import netlifyRouter from './netlify.webhook';

const router = Router();

router.use(githubRouter);
router.use(netlifyRouter);

export default router;
