import { create } from "zustand";

// zustand state to determine the app current state
// Path: statemanagement/loading.ts
type Loading = {
  loading: boolean;
};
type Action = {
  update: (loading: Loading) => void;
}

const useLoadingStore = create<Loading & Action>((set) => ({
  loading: false,
  update: (loading) => set(loading),
}));

export { useLoadingStore };