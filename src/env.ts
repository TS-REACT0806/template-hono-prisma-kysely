import { config } from 'dotenv';
import { z } from 'zod';
import { STAGES } from './constants/env';

config();

export function isTest() {
  return process.env.NODE_ENV === 'test';
}

const envSchema = z.object({
  STAGE: z.nativeEnum(STAGES).default(STAGES.Dev),
  DB_URL: z.string(),
  TEST_DB_URL: z.string(),
});

export const envConfig = envSchema.parse({
  STAGE: process.env.STAGE,
  DB_URL: process.env.DB_URL,
  TEST_DB_URL: process.env.TEST_DB_URL,
});

export type EnvConfig = z.infer<typeof envSchema>;
