import { Router, Request, Response } from 'express';
import { GithubWebhookBody } from '../interfaces/GitHubWebhookBody';
import { config } from '../config';
import twilio from 'twilio';

const router = Router();

router.post('/webhook_handler', (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;
    const repoName = data.repository.name;
    const pusherName = data.pusher.name;
    const branch = data.ref.split('/').pop();
    const timestamp = data.repository.pushed_at;

    console.log(`Repo: ${repoName}\nBranch: ${branch}\nPushed by: ${pusherName}\nWhen: ${timestamp}`);

    const whatsappMessage = `Repo: ${repoName}\nBranch: ${branch}\nPushed by: ${pusherName}\nWhen: ${timestamp}`;

    const client = twilio((config.TWILIO_ACCOUNT_SID as string), (config.TWILIO_AUTH_TOKEN as string));

    client.messages.create({
      from: `whatsapp:${(config.TWILIO_PHONE_NUMBER as string)}`,
      body: whatsappMessage,
      to: `whatsapp:${(config.RECIPIENT_PHONE_NUMBER as string)}` 
    }).then((message) => {
      console.log(message.sid);
      res.sendStatus(200);
    }).catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

export default router;
