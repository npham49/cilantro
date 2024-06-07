import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new pg.Pool();
const db = drizzle(pool);

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
  // other user attributes
  name: text("name").notNull(),
  email: text("email"),
  picture: text("picture").notNull()
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);