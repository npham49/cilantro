import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import dotenv from "dotenv";
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

dotenv.config()

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// { schema } is used for relational queries
export const db = drizzle(client, { schema });

export const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessionTable, schema.userTable);
