import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { transactionTable } from "./transaction";
import { accountTable } from "./account";
import { budgetTable } from "./budget";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  // other user attributes
  googleId: text("google_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  picture: text("picture"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow()
});

export type SelectUser = typeof userTable.$inferSelect;

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
	userId: text("user_id")
  .notNull()
  .references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
    withTimezone: true,
		mode: "date"
	}).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow()
});

export type SelectSession = typeof sessionTable.$inferSelect;


export const usersRelations = relations(userTable, ({ many }) => ({
  transactions: many(transactionTable),
  accounts: many(accountTable),
  budgets: many(budgetTable),
}));
