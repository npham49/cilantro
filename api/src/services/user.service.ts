import { db } from "../drizzle";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserByGoogleId = async (googleId: string) => {
  return await db.query.userTable.findFirst({
    where: (userTable, { eq }) => eq(userTable.googleId, googleId),
  });
};

export const createUser = async (
  googleId: string,
  name: string,
  email: string,
  picture: string,
) => {
  return await db
    .insert(userTable)
    .values({
      id: generateIdFromEntropySize(10),
      googleId,
      name,
      email,
      picture,
    })
    .returning({ id: userTable.id });
};

export const getUserById = async (id: string) => {
  return await db.query.userTable.findFirst({
    where: (userTable, { eq }) => eq(userTable.id, id),
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.query.userTable.findFirst({
    where: (userTable, { eq }) => eq(userTable.email, email),
  });
};

export const updateUser = async (data: {
  id: string;
  name?: string;
  email?: string;
  picture?: string;
}) => {
  return await db.update(userTable).set(data).where(eq(userTable.id, data.id));
};

export const deleteUser = async (id: string) => {
  return await db.delete(userTable).where(eq(userTable.id, id));
};
