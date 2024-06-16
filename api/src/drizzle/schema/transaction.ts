import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from ".";
import { relations } from "drizzle-orm";
import { accountTable } from "./account";

export const transactionTable = pgTable("transaction", {
  id: text("id").primaryKey().unique(),
  // other transaction attributes
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  description: text("description").notNull(),
  accountId: text("account_id").references(() => accountTable.id),
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
    transactionDate: timestamp("transaction_date", {
    withTimezone: true,
    mode: "date",
  }),
  type: text("type").notNull(),
  category: text("category").notNull(),
});

export const transactionRelations = relations(transactionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [transactionTable.userId],
    references: [userTable.id],
  }),
  account: one(accountTable, {
    fields: [transactionTable.accountId],
    references: [accountTable.id],
  }),
}));

export type SelectTransaction = typeof transactionTable.$inferSelect;
