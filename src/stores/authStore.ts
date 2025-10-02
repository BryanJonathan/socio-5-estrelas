import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { API_LOGIN, API_REGISTER } from "@/utils/consts";
import type { AuthState, RegisterResponse } from "@/types/types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user, token) => set({ user, token }),

      logout: () => {
        set({ user: null, token: null });
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const req = await axios.post<RegisterResponse>(API_REGISTER, {
            name,
            email,
            password,
          });

          if (!req.data.success) {
            throw new Error(req.data.message);
          }

          const { user, token } = req.data.data;
          set({ user, token });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Register failed",
              error.response?.data || error.message
            );
          } else {
            console.error("Unexpected error", error);
          }
        }
      },

      login: async (email: string, password: string) => {
        try {
          const req = await axios.post<RegisterResponse>(API_LOGIN, {
            email,
            password,
          });

          const { user, token } = req.data.data;
          set({ user, token });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Register failed",
              error.response?.data || error.message
            );
          } else {
            console.error("Unexpected error", error);
          }
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
