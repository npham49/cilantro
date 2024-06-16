import { randomUUID } from "crypto";
import { db } from "../drizzle";
import { accountTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getAccountById = async (id: string, userId: string) => {
  return await db.query.accountTable.findFirst({
    where: (accountTable, { eq }) =>
      eq(accountTable.id, id) && eq(accountTable.userId, userId),
  });
};

export const getAccountsByUserId = async (userId: string) => {
  return await db.query.accountTable.findMany({
    where: (accountTable, { eq }) => eq(accountTable.userId, userId),
  });
};

export const createAccount = async (data: {
  userId: string;
  name: string;
  description: string;
  type: string;
}) => {
  return await db
    .insert(accountTable)
    .values({
      ...data,
      id: randomUUID(),
    })
    .returning({ id: accountTable.id });
};

export const updateAccount = async (data: {
  id: string;
  name: string;
  description: string;
  type: string;
}) => {
  return await db
    .update(accountTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(accountTable.id, data.id));
};

export const deleteAccount = async (id: string) => {
  return await db.delete(accountTable).where(eq(accountTable.id, id));
};
