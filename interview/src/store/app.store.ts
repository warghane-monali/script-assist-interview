import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware';

interface AuthState {
  user: { username: string } | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  hydrate: () => void;
  _hasHydrated: boolean;
}

// Extend PersistOptions with your store type
type AuthPersist = PersistOptions<AuthState>;

export const useAuthStore = create<AuthState>()(
  persist<AuthState, [], [], AuthPersist>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,

      login: (username) => {
        const userData = { username };
        localStorage.setItem('userData', JSON.stringify(userData));
        set({ user: userData, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('userData');
        set({ user: null, isAuthenticated: false });
      },

      hydrate: () => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.username) {
          set({ user: parsedUser, isAuthenticated: true, _hasHydrated: true });
        } else {
          set({ _hasHydrated: true });
        }
        } else {
          set({ _hasHydrated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);
