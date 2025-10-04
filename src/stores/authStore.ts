import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  API_LOGIN,
  API_REGISTER,
  RECOVER_PASSWORD,
  SEND_EMAIL_RECOVER_PASSWORD,
} from "@/utils/consts";
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

          return user.role;
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

      sendEmailRecoverPassword: async (email: string) => {
        try {
          const req = await axios.post<RegisterResponse>(
            SEND_EMAIL_RECOVER_PASSWORD,
            {
              email,
            }
          );

          return req.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Register failed",
              error.response?.data || error.message
            );
          } else {
            console.error("Unexpected error", error);
          }

          return { success: false, message: "Erro ao enviar email" };
        }
      },

      passwordRecover: async (
        code: string,
        email: string,
        password: string
      ): Promise<{ message: string; success: boolean }> => {
        try {
          const req = await axios.post(RECOVER_PASSWORD, {
            code,
            email,
            password,
          });

          return {
            message: req.data.message || "Senha redefinida com sucesso.",
            success: true,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Password reset failed",
              error.response?.data || error.message
            );

            return {
              message:
                (error.response?.data as { message?: string })?.message ||
                "Código inválido ou expirado.",
              success: false,
            };
          } else {
            console.error("Unexpected error", error);
            return {
              message: "Erro inesperado ao redefinir a senha.",
              success: false,
            };
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
