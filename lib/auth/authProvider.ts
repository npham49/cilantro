import { ReactNode, useEffect } from "react";
import Storage from "../storage";
import * as Linking from "expo-linking";
import { makeRedirectUri } from "expo-auth-session";
import * as Browser from "expo-web-browser";
import { useUserStore } from "@/statemanagement/user";
import { useAuthStore } from "@/statemanagement/auth";
import * as apiService from "../api";
import { router } from "expo-router";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const signInWithGoogle = async ({
  redirect = makeRedirectUri(),
}: {
  redirect?: string;
}) => {
  const oauthUrl = new URL(`${apiUrl}/api/login/google?redirect=${redirect}`);
  const sesionToken = await Storage.getItem("session_token");
  if (sesionToken) {
    oauthUrl.searchParams.append("sessionToken", sesionToken);
  }
  console.log(oauthUrl.toString());
  const result = await Browser.openAuthSessionAsync(
    oauthUrl.toString(),
    redirect,
  );
  if (result.type !== "success") {
    return null;
  }
  const url = Linking.parse(result.url);
  const sessionToken = url.queryParams?.token?.toString() ?? null;
  if (!sessionToken) {
    return null;
  }
  const user = await apiService.getUser(sessionToken);
  await Storage.setItem("session_token", sessionToken);
  return { user, sessionToken };
};

export const signOut = async (sessionToken: string) => {
  const response = await apiService.signOut(sessionToken);
  console.log("Sign out response", response);
  return response;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userStore = useUserStore((state) => state);
  const authStore = useAuthStore((state) => state);

  useEffect(() => {
    const init = async () => {
      authStore.update({ sessionToken: "", loading: true });
      const sessionToken = await Storage.getItem("session_token");
      console.log("Session Token", sessionToken);
      if (sessionToken) {
        const user = await apiService.getUser(sessionToken).catch((err) => {
          console.error("Error getting user", err);
          return null;
        });
        if (!user) {
          authStore.update({ sessionToken: "", loading: false });
          router.navigate("login");
          return;
        }
        console.log("User", user);
        authStore.update({
          loading: false,
          sessionToken: sessionToken.toString(),
        });
        user &&
          userStore.update({
            name: user.name,
            id: user.id,
            email: user.email,
            picture: user.picture,
          });
        console.log("User", user);
        console.log("Session Token", authStore);
      } else {
        authStore.update({ sessionToken: "", loading: false });
        router.navigate("login");
      }
    };
    void init();
  }, []);
  return children;
};
