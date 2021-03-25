/* eslint-disable import/no-extraneous-dependencies */
import { config } from 'dotenv';

config();

export const MAX_TTL_CACHE_IN_SECONDS = +process.env.MAX_TTL_CACHE_IN_SECONDS || 3400;
