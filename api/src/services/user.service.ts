import { db } from "../drizzle";
import { generateIdFromEntropySize } from "lucia";
import { eq } from "drizzle-orm";
import { userTable } from "../drizzle/schema";

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
    .values(
      {
        id: generateIdFromEntropySize(10),
        googleId,
        name,
        email,
        picture,
      },
    )
    .returning({id:userTable.id});
};
