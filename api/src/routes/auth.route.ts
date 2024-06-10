import express from "express";
import { googleAuth, lucia } from "../auth";
import { parseCookies, serializeCookie } from "oslo/cookie";
import {
  OAuth2RequestError,
  generateCodeVerifier,
  generateState,
} from "arctic";

import * as userServices from "../services/user.service";

export const googleLoginRouter = express.Router();

googleLoginRouter.get("/api/login/google", async (req, res) => {
  const redirect = req.query.redirect?.toString() ?? "/";
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });
  res
  .appendHeader(
    "Set-Cookie",
    serializeCookie("google_auth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    }),
  )
  .appendHeader(
    "Set-Cookie",
    serializeCookie("code_verifier", codeVerifier, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    }),
  )
  .appendHeader(
    "Set-Cookie",
    serializeCookie("redirect", redirect, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    }),
  )
  .redirect(url.toString());
});

googleLoginRouter.get("/api/auth/google/callback", async (req, res) => {
  const code = req.query.code?.toString() ?? null;
  const state = req.query.state?.toString() ?? null;
  const storedState =
  parseCookies(req.headers.cookie ?? "").get("google_auth_state") ?? null;
  const codeVerifier =
  parseCookies(req.headers.cookie ?? "").get("code_verifier") ?? null;
  const redirect =
  parseCookies(req.headers.cookie ?? "").get("redirect") ?? "/";
  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    console.log(code, state, storedState);
    res.status(400);
    return;
  }
  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier,
    );
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const user = await response.json();
    console.log("--> Found this object", user);
    const existingUser = await userServices.getUserByGoogleId(user.sub);
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      console.log("-> Created Session", session);
      const redirectUrl = new URL(redirect);
      redirectUrl.searchParams.append("token", session.id);
      return (
        res
        .redirect(redirectUrl.toString())
      );
    }
    
    const newUser = await userServices.createUser(
      user.sub,
      user.name,
      user.email,
      user.picture,
    );
    console.log("-> Created New User", newUser);
    if (!newUser) {
      res.status(500);
      return;
    }
    const session = await lucia.createSession(newUser[0].id, {});
    const redirectUrl = new URL(redirect);
    redirectUrl.searchParams.append("token", session.id);
    return (
      res
      .redirect(redirectUrl.toString())
    );
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      res.status(400);
      return;
    }
    console.error(e);
    res.status(500);
    return;
  }
});

googleLoginRouter.post("/api/logout", async (req, res) => {
  // Extract token from Barer Token
  let token = req.headers.authorization;
  const sessionId = lucia.readBearerToken(token ?? "");
  if (!sessionId) {
    console.log("-> No Session ID");
    return res.status(401);
  }
  const { session } = await lucia.validateSession(sessionId);
  if (!session) return res.status(401);
  await lucia.invalidateSession(session?.id);
  console.log("-> Invalidated Session", session?.id);
  return res.status(200).json({ message: "Logged out" });
});
