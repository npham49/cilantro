import express from "express";
import { lucia } from "../auth";

export const userRouter = express.Router();

userRouter.get("/api/user", async (req, res) => {
  try {
    let token = req.headers.authorization;
    const sessionId = lucia.readBearerToken(token ?? "");
    if (!sessionId) {
      return res.status(401).end();
    }
    const { session,user } = await lucia.validateSession(sessionId);
    console.log("-> Found User", user);
    if (!session || !user) {
      return res.status(401).end();
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});
