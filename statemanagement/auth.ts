import { create } from "zustand";

// zustand state to determine the status of the user's authentication
// Path: statemanagement/loading.ts
type Auth = {
  loading: boolean;
  sessionToken: string;
};
type Action = {
  update: (auth: Auth) => void;
}

const useAuthStore = create<Auth & Action>((set) => ({
  loading: false,
  sessionToken: "",
  update: (auth) => set(auth),
}));

export { useAuthStore };