import dotenv from 'dotenv';

dotenv.config();

export const config = {
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL || '',
  PORT: process.env.PORT || 5000,
};