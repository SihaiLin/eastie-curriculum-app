export type UserRole = "admin" | "teacher";
export type UserStatus = "active" | "disabled";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthContextValue {
  currentUser: AuthUser | null;
  changePassword: (input: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<{ ok: boolean; message: string }>;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  requestLoginCode: (email: string) => Promise<{ devLoginCode?: string; message: string; ok: boolean }>;
  requestPasswordReset: (email: string) => Promise<{ ok: boolean; message: string }>;
  setPassword: (input: { newPassword: string }) => Promise<{ ok: boolean; message: string }>;
  verifyLoginCode: (input: { code: string; email: string }) => Promise<AuthUser>;
}
