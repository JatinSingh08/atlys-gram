import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const testAccounts = [
  { email: "demo@example.com", password: "password123" },
  { email: "test@user.com", password: "testpass" },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email, password) => {
    const found = testAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );
    if (found) {
      set({ user: { email } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));
