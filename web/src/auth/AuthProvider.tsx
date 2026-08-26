import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthUser, LoginInput } from "./authTypes";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchJson<{ user: AuthUser }>("/api/auth/me", {
      credentials: "include",
    })
      .then((data) => {
        if (isMounted) setCurrentUser(data.user);
      })
      .catch(() => {
        if (isMounted) setCurrentUser(null);
      })
      .finally(() => {
        if (isMounted) setIsAuthLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      changePassword: async (input) => {
        if (!currentUser) {
          return { ok: false, message: "Please sign in before changing your password." };
        }
        if (!input.currentPassword.trim() || !input.newPassword.trim()) {
          return { ok: false, message: "Current password and new password are required." };
        }
        const data = await fetchJson<{ ok: boolean; message?: string }>("/api/auth/change-password", {
          body: JSON.stringify({
            currentPassword: input.currentPassword,
            newPassword: input.newPassword,
          }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        return { ok: data.ok, message: data.message ?? "Password changed." };
      },
      isAuthLoading,
      isAuthenticated: Boolean(currentUser),
      login: async (input: LoginInput) => {
        const data = await fetchJson<{ user: AuthUser }>("/api/auth/login", {
          body: JSON.stringify({
            email: input.email.trim(),
            password: input.password,
          }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        setCurrentUser(data.user);
        return data.user;
      },
      logout: async () => {
        await fetchJson<{ ok: boolean }>("/api/auth/logout", {
          credentials: "include",
          method: "POST",
        }).catch(() => undefined);
        setCurrentUser(null);
      },
      requestLoginCode: async (email) => {
        const normalizedEmail = normalizeEmail(email);
        if (!normalizedEmail) {
          return { ok: false, message: "Enter your EASTIE email to receive a login code." };
        }

        const data = await fetchJson<{ dev?: { loginCode: string }; ok: boolean; message?: string }>(
          "/api/auth/request-login-code",
          {
            body: JSON.stringify({ email: normalizedEmail }),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            method: "POST",
          },
        );

        return {
          devLoginCode: data.dev?.loginCode,
          ok: data.ok,
          message: data.message ?? `A login code was sent to ${normalizedEmail}.`,
        };
      },
      requestPasswordReset: async (email) => {
        const normalizedEmail = email.trim();
        if (!normalizedEmail) {
          return { ok: false, message: "Enter your email so we know where to send the reset link." };
        }

        const data = await fetchJson<{ ok: boolean; message?: string }>("/api/auth/forgot-password", {
          body: JSON.stringify({ email: normalizedEmail }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        return {
          ok: data.ok,
          message: data.message ?? `If ${normalizedEmail} is an EASTIE account, a reset email will be sent.`,
        };
      },
      setPassword: async (input) => {
        if (!currentUser) {
          return { ok: false, message: "Please sign in with an email code before creating your password." };
        }
        if (!input.newPassword.trim()) {
          return { ok: false, message: "Enter a password to save." };
        }

        const data = await fetchJson<{ ok: boolean; message?: string }>("/api/auth/set-password", {
          body: JSON.stringify({ newPassword: input.newPassword }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        return { ok: data.ok, message: data.message ?? "Password saved." };
      },
      verifyLoginCode: async (input) => {
        const data = await fetchJson<{ user: AuthUser }>("/api/auth/verify-login-code", {
          body: JSON.stringify({
            code: input.code.trim(),
            email: normalizeEmail(input.email),
          }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        setCurrentUser(data.user);
        return data.user;
      },
    }),
    [currentUser, isAuthLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Request failed.");
  }

  return data as T;
}
