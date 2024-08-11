import { create } from "zustand";

interface NicknameState {
  nickname: string;
  setNickname: (nickname: string) => void;
}

export const useNicknameStore = create<NicknameState>((set) => ({
  nickname: "",
  setNickname: (nickname) => set({ nickname }),
}));
