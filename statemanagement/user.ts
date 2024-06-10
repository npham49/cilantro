import { create } from "zustand";

export type User = {
  name: string;
  id: string;
  email: string;
  picture: string;
};
type Action = {
  update: (user: User) => void;
}

const useUserStore = create<User & Action>((set) => ({
  name: "",
  id: "",
  email: "",
  picture: "",
  update: (user) => set(user),
}));

export { useUserStore };