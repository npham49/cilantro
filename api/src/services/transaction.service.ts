import { randomUUID } from "crypto";
import { db } from "../drizzle";
import { transactionTable } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const getTransactionById = async (id: string, userId: string) => {
  return await db.query.transactionTable.findFirst({
    where: (transactionTable, { eq }) =>
      eq(transactionTable.id, id) && eq(transactionTable.userId, userId),
  });
};

export const getTransactionsByUserId = async (userId: string) => {
  return await db.query.transactionTable.findMany({
    where: (transactionTable, { eq }) => eq(transactionTable.userId, userId),
  });
};

export const getTransactionsByAccountId = async (
  accountId: string,
  userId: string,
) => {
  return await db.query.transactionTable.findMany({
    where: (transactionTable, { eq }) =>
      eq(transactionTable.accountId, accountId) &&
      eq(transactionTable.userId, userId),
  });
};

export const getTransactionsByPeriod = async (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  return await db.query.transactionTable.findMany({
    where: (transactionTable, { eq, lte, gte }) =>
      eq(transactionTable.userId, userId) &&
      lte(transactionTable.transactionDate, endDate) &&
      gte(transactionTable.transactionDate, startDate),
  });
};

export const getTransactionsByCategoryAndPeriod = async (
  userId: string,
  category: string,
  startDate: Date,
  endDate: Date,
) => {
  return await db.query.transactionTable.findMany({
    where: (transactionTable, { eq, lte, gte }) =>
      eq(transactionTable.userId, userId) &&
      eq(transactionTable.category, category) &&
      lte(transactionTable.transactionDate, endDate) &&
      gte(transactionTable.transactionDate, startDate),
  });
};

export const getRecentTransactions = async (
  userId: string,
  limit: number,
  type: string | undefined,
) => {
  return await db.query.transactionTable.findMany({
    limit,
    where: (transactionTable, { eq }) => {
      if (type) {
        return (
          eq(transactionTable.userId, userId) && eq(transactionTable.type, type)
        );
      }
      return eq(transactionTable.userId, userId);
    },
    orderBy: [desc(transactionTable.transactionDate)],
  });
};

export const createTransaction = async (data: {
  userId: string;
  name: string;
  amount: string;
  description: string;
  accountId: string;
  type: string;
  category: string;
}) => {
  return await db
    .insert(transactionTable)
    .values({
      ...data,
      id: randomUUID(),
    })
    .returning({ id: transactionTable.id });
};

export const updateTransaction = async (data: {
  id: string;
  name?: string;
  amount?: string;
  description?: string;
  accountId?: string;
  type?: string;
  category?: string;
}) => {
  return await db
    .update(transactionTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(transactionTable.id, data.id));
};

export const deleteTransaction = async (id: string) => {
  return await db.delete(transactionTable).where(eq(transactionTable.id, id));
};
