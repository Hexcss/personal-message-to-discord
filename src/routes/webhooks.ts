import axios from "axios";
import { Router, Request, Response } from "express";
import { GithubWebhookBody } from "../interfaces/GitHubWebhookBody";
import { config } from "../config";
import { formatDiscordMessage } from "../utils/formatDiscordMessage";

const router = Router();

router.post(
  "/webhook_discord",
  (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;

    const discordMessage = formatDiscordMessage(data);

    axios
      .post(config.DISCORD_WEBHOOK_URL as string, discordMessage)
      .then((response) => {
        console.log(response.data);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  }
);

export default router;
