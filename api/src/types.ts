import type { Request } from "express";

export type UserRole = "admin" | "teacher";
export type UserStatus = "active" | "disabled";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
}

export interface AuthedRequest extends Request {
  user?: AuthUser;
  sessionId?: string;
}
