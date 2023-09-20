import dotenv from 'dotenv';
import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';

dotenv.config();
functions.runWith({ secrets: ['DISCORD_GITHUB_WEBHOOK', 'DISCORD_NETLIFY_WEBHOOK'] })

export const config = {
  DISCORD_GITHUB_WEBHOOK: process.env.DISCORD_GITHUB_WEBHOOK || '',
  DISCORD_NETLIFY_WEBHOOK: process.env.DISCORD_NETLIFY_WEBHOOK || '',
};