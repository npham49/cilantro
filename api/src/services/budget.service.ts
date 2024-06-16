import { randomUUID } from "crypto";
import { db } from "../drizzle";
import { budgetTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getBudgetById = async (id: string, userId: string) => {
  return await db.query.budgetTable.findFirst({
    where: (budgetTable, { eq }) =>
      eq(budgetTable.id, id) && eq(budgetTable.userId, userId),
  });
};

export const getBudgetsByUserId = async (userId: string) => {
  return await db.query.budgetTable.findMany({
    where: (budgetTable, { eq }) => eq(budgetTable.userId, userId),
  });
};

export const createBudget = async (data: {
  userId: string;
  amount: string;
  description: string;
  accountId: string;
  category: string;
}) => {
  return await db
    .insert(budgetTable)
    .values({
      ...data,
      id: randomUUID(),
    })
    .returning({ id: budgetTable.id });
};

export const updateBudget = async (data: {
  id: string;
  amount: string;
  description: string;
  accountId: string;
  category: string;
}) => {
  return await db
    .update(budgetTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(budgetTable.id, data.id));
};

export const deleteBudget = async (id: string) => {
  return await db.delete(budgetTable).where(eq(budgetTable.id, id));
};
