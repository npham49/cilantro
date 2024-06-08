import { Lucia } from "lucia";
import { SelectUser, sessionTable, userTable } from "../drizzle/schema/auth";
import { Google } from "arctic";
import dotenv from "dotenv";
import { adapter } from "../drizzle";

dotenv.config();

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (data) => {
    return {
      name: data.name,
      email: data.email,
      picture: data.picture,
    };
  },
});

export const googleAuth = new Google(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  `${process.env.HOST_NAME}/api/auth/google/callback`,
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<SelectUser, "id">;
  }
}

