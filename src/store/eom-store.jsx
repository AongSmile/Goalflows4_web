import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  login as loginApi,
  register as registerApi,
  googleLogin as googleLoginApi,
  getCurrentUser,
} from "../api/authApi";

// ============================================================================
// Auth store (zustand)
// ----------------------------------------------------------------------------
// Holds the JWT + current user, persisted to localStorage so a refresh
// doesn't log the user out. Used by ProtectRouteUser / ProtectRouteCMS /
// RequireAdmin / RequirePermission, and by the admin dashboard's api calls
// (adminApi.js reads useEcomStore.getState().token to attach the
// Authorization header).
//
// `user.permissions` (a string[] of granted permission keys, only ever
// populated for role === "staff") comes from /api/current-user, NOT from
// the login/register/google-login response - those only return the lean
// JWT payload (id/email/role). That's why every login path below calls
// hydrateUser() right after setting the token: it's a second, deliberate
// round-trip to fetch the fresh, permission-inclusive profile. This also
// means permission changes an admin makes take effect for a staff member
// the next time they log in or the app calls hydrateUser() - not
// instantly - which is fine for UI purposes; the backend's authCheck
// middleware always re-checks permissions fresh from the DB on every
// request regardless of what the client thinks it has.
// ============================================================================
const useEcomStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const data = await loginApi({ email, password });
        set({ user: data.payload, token: data.token });
        await get().hydrateUser();
        return data;
      },

      // Registering also logs the user in (the backend returns a token
      // immediately), so this behaves just like login().
      register: async (email, password, name) => {
        const data = await registerApi({ email, password, name });
        set({ user: data.payload, token: data.token });
        await get().hydrateUser();
        return data;
      },

      // credential = the ID token from <GoogleLogin/>'s onSuccess callback
      loginWithGoogle: async (credential) => {
        const data = await googleLoginApi(credential);
        set({ user: data.payload, token: data.token });
        await get().hydrateUser();
        return data;
      },

      logout: () => {
        set({ user: null, token: null });
      },

      // Re-validate the stored token against the backend and refresh
      // user/permissions. Called automatically right after every login, and
      // safe to call again any time (e.g. AdminLayout calls it on mount so a
      // long-lived session picks up permission changes without re-logging in).
      hydrateUser: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const { user } = await getCurrentUser(token);
          set({ user: { ...get().user, ...user } });
        } catch {
          set({ user: null, token: null });
        }
      },

      // Admins implicitly have every permission; staff only have what
      // their assigned Role granted (see server/config/permissions.js for
      // the fixed key list). Plain "user" (storefront customers) never do.
      hasPermission: (key) => {
        const user = get().user;
        if (!user) return false;
        if (user.role === "admin") return true;
        return Boolean(user.permissions?.includes(key));
      },
    }),
    {
      name: "eom-store", // localStorage key
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useEcomStore;
