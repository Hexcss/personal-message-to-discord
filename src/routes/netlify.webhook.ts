import axios from "axios";
import { Router, Request, Response } from "express";
import { NetlifyWebhookBody } from "../interfaces/NetlifyWebhookBody";
import { config } from "../config";
import { formatNetlifyDiscordMessage } from "../utils/formatNetlifyDiscordMessage";

const router = Router();

router.post(
  "/webhook_netlify",
  (req: Request<{}, {}, NetlifyWebhookBody>, res: Response) => {
    const data = req.body;

    const discordMessage = formatNetlifyDiscordMessage(data);

    axios
      .post(config.DISCORD_NETLIFY_WEBHOOK as string, discordMessage)
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
