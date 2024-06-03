import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// { schema } is used for relational queries
export const db = drizzle(client, { schema });