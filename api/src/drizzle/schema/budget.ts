import { pgTable, text, timestamp,numeric } from "drizzle-orm/pg-core";
import { userTable } from ".";
import { accountTable } from "./account";
import { relations } from "drizzle-orm";

export const budgetTable = pgTable("budget", {
  id: text("id").primaryKey().unique(),
  // other budget attributes
  userId: text("user_id").notNull().references(() => userTable.id),
  category: text("category").notNull(),
  amount: numeric("amount").notNull(),
  accountId: text("account_id").notNull().references(() => accountTable.id),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export type SelectBudget = typeof budgetTable.$inferSelect;

export const budgetRelations = relations(budgetTable, ({ one }) => ({
  user: one(userTable, {
    fields: [budgetTable.userId],
    references: [userTable.id],
  }),
  account: one(accountTable, {
    fields: [budgetTable.accountId],
    references: [accountTable.id],
  }),
}));
