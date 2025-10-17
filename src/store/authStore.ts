import {create} from "zustand";
import { apiClient } from "../services/apiClient";
import { saveItem, removeItem } from "../utils/storage";

type AuthState = {
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<string>; // ✅ now returns token
  register: (email: string, password: string) => Promise<string>
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  loading: false,
  error: null,

login: async (email, password) => {
  set({ loading: true, error: null });
  try {
    const { data } = await apiClient.post(
      "https://reqres.in/api/login",
      { email, password },
      { headers: { "x-api-key": "reqres-free-v1" } }
    );
    saveItem("token", data.token);
    saveItem("email", email);
    set({ token: data.token, email });
    return data.token; // ✅ return token
  } catch (err: any) {
    const msg = err.response?.data?.error || err.message || "Login failed";
    set({ error: msg });
    throw err; // ✅ throw so the component catch works
  } finally {
    set({ loading: false });
  }
},

 register: async (email, password) => {
  set({ loading: true, error: null });
  try {
    const { data } = await apiClient.post(
      "https://reqres.in/api/register",
      { email, password },
      { headers: { "x-api-key": "reqres-free-v1" } }
    );

    saveItem("token", data.token);
    saveItem("email", email);
    set({ token: data.token, email });

    return data.token; // ✅ return token for UI logic
  } catch (err: any) {
    const msg = err.response?.data?.error || "Register failed";
    set({ error: msg });
    throw err; // ✅ rethrow so the UI can handle toast
  } finally {
    set({ loading: false });
  }
},


  logout: () => {
    removeItem("token");
    removeItem("email");
    set({ token: null, email: null });
  },
}));
