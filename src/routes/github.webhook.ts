import axios from "axios";
import { Router, Request, Response } from "express";
import { GithubWebhookBody } from "../interfaces/GitHubWebhookBody";
import { config } from "../config";
import { formatGitHubDiscordMessage } from "../utils/formatGitHubDiscordMessage";

const router = Router();

router.post(
  "/webhook_github",
  (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;

    const discordMessage = formatGitHubDiscordMessage(data);

    axios
      .post(config.DISCORD_GITHUB_WEBHOOK as string, discordMessage)
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
