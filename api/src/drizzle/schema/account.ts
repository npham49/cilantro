import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { budgetTable, userTable } from ".";
import { relations } from "drizzle-orm";
import { transactionTable } from "./transaction";

export const accountTable = pgTable("account", {
  id: text("id").primaryKey().unique(),
  // other account attributes
  userId: text("user_id").references(() => userTable.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
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

export type SelectAccount = typeof accountTable.$inferSelect;

export const accountRelations = relations(accountTable, ({ one,many }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
  transactions: many(transactionTable),
  budgets: many(budgetTable),
}));
