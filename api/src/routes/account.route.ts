import express from "express";
import { Request, Response } from "express";
import { lucia } from "../auth";

import * as accountServices from "../services/account.service";
import { transactionType } from "../constants/transaction";

export const accountRouter = express.Router();

accountRouter.get("/api/accounts", async (req: Request, res: Response) => {
  try {
    let token = req.headers.authorization;
    const sessionId = lucia.readBearerToken(token ?? "");
    if (!sessionId) {
      return res.status(401).send({ error: "Unauthorized" }).end();
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user) {
      return res.status(401).send({ error: "Unauthorized" }).end();
    }

    const response = await accountServices.getAccountsByUserId(user.id);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end({ error: "Internal Server Error" });
  }
});

accountRouter.get("/api/accounts/:id", async (req: Request, res: Response) => {
  try {
    let token = req.headers.authorization;
    const sessionId = lucia.readBearerToken(token ?? "");
    if (!sessionId) {
      return res.status(401).send({ error: "Unauthorized" }).end();
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user) {
      return res.status(401).send({ error: "Unauthorized" }).end();
    }

    const response = await accountServices.getAccountById(req.params.id, user.id);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end({ error: "Internal Server Error" });
  }
});

accountRouter.post("/api/accounts", async (req: Request, res: Response) => {
  try {
    let token = req.headers.authorization;
    const sessionId = lucia.readBearerToken(token ?? "");
    if (!sessionId) {
      return res.status(401).send({ error: "Unauthorized" }).end();
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user) {
      return res.status(401).send({ error: "Unauthorized" }).end();
    }

    if (
      !req.body.name ||
      !req.body.type ||
      !transactionType.includes(req.body.type) ||
      !req.body.description
    ) {
      return res.status(400).send({ error: "Bad Request" }).end();
    }

    const response = await accountServices.createAccount({
      userId: user.id,
      description: req.body.description,
      name: req.body.name,
      type: req.body.type,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end({ error: "Internal Server Error" });
  }
});
