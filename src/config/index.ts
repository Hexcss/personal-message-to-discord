import dotenv from 'dotenv';

dotenv.config();

export const config = {
  DISCORD_GITHUB_WEBHOOK: process.env.DISCORD_GITHUB_WEBHOOK || '',
  DISCORD_NETLIFY_WEBHOOK: process.env.DISCORD_NETLIFY_WEBHOOK || '',
  PORT: process.env.PORT || 5000,
};