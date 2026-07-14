// src/config/env.config.js

import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.example' });
}

const port = Number(process.env.PORT || 8080);
if (!Number.isInteger(port)) {
  throw new Error('PORT debe ser un número entero. Revisa tu archivo .env o .env.example.');
}

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export const isDevelopment = env.nodeEnv === 'development';
