import dotenv from 'dotenv';
import { defineString } from 'firebase-functions/params';

dotenv.config();

export const config = {
  DISCORD_GITHUB_WEBHOOK: defineString("DISCORD_GITHUB_WEBHOOK ")|| '',
  DISCORD_NETLIFY_WEBHOOK: defineString("DISCORD_NETLIFY_WEBHOOK")|| '',
};