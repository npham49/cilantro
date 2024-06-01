import { create } from "zustand";

type User = {
  name: string;
  id: string;
};
type Action = {
  update: (user: User) => void;
}

const useUserStore = create<User & Action>((set) => ({
  name: "",
  id: "",
  update: (user) => set(user),
}));

export { useUserStore };