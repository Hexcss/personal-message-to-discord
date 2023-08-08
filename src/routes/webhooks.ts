import { Router, Request, Response } from 'express';
import { GithubWebhookBody } from '../interfaces/GitHubWebhookBody';
import { config } from '../config';
import twilio from 'twilio';
import { formatWhatsAppMessage } from '../utils/formatWhatsappMessage';

const router = Router();

router.post('/webhook_handler', (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;

    const whatsappMessage = formatWhatsAppMessage(data);

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
