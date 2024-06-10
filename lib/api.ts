import { User } from "@/statemanagement/user";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

const signOut = async (sessionToken: string) => {
  const response = await fetch(`${apiUrl}/api/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
    .then((res) => {
      console.log("Sign out response", res);
      return res.json();
    })
  return response;
};

const getUser = async (sessionToken: string): Promise<User | null> => {
  const response = await fetch(`${apiUrl}/api/user`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  })
    .then((res) => {
      return res.json();
    })
  return response;
};

export { signOut, getUser };
