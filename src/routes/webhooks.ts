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
    const timestamp = new Date(Number(data.repository.pushed_at)* 1000); // convert Unix timestamp to JavaScript Date object
    const formattedDate = timestamp.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

    // Formatting the message with markdown
    const whatsappMessage = `*Repository:* _${repoName}_\n*Branch:* _${branch}_\n*Pushed by:* _${pusherName}_\n*When:* _${formattedDate}_`;

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
