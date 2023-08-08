import { Router, Request, Response } from 'express';
import { GithubWebhookBody } from '../interfaces/GitHubWebhookBody';
import { config } from '../config';
import axios from 'axios';
import { formatDiscordMessage } from '../utils/formatWhatsappMessage';

const router = Router();

router.post('/webhook_handler', (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;

    const discordMessage = formatDiscordMessage(data);

    axios.post(config.DISCORD_WEBHOOK_URL, {
      content: discordMessage
    }).then((response) => {
      console.log(response.data);
      res.sendStatus(200);
    }).catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

export default router;
