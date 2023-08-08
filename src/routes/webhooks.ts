import { Router, Request, Response } from 'express';
import { GithubWebhookBody } from '../interfaces/GitHubWebhookBody';
import { axiosInstance } from '../utils/axiosInstance';
import { config } from '../config';

const router = Router();

router.post('/webhook_handler', (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;
    const repoName = data.repository.name;
    const pusherName = data.pusher.name;
    const branch = data.ref.split('/').pop();
    const timestamp = data.repository.pushed_at;

    console.log(`Repo: ${repoName}\nBranch: ${branch}\nPushed by: ${pusherName}\nWhen: ${timestamp}`);

    const slackMessage = {
        text: `Repo: ${repoName}\nBranch: ${branch}\nPushed by: ${pusherName}\nWhen: ${timestamp}`
    };

    axiosInstance.post(config.SLACK_WEBHOOK_URL, slackMessage)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
});

export default router;
