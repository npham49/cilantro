import { Request,Response } from "express";
import { lucia } from "../auth";

export const getUser =  async (req: Request, res:Response) => {
  try {
    let token = req.headers.authorization;
    const sessionId = lucia.readBearerToken(token ?? "");
    if (!sessionId) {
      return res.status(401).end({error: "Unauthorized"});
    }
    const { session,user } = await lucia.validateSession(sessionId);
    console.log("-> Found User", user);
    if (!session || !user) {
      return res.status(401).send({error: "Unauthorized"}).end();
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).end({error: "Internal Server Error"});
  }
}