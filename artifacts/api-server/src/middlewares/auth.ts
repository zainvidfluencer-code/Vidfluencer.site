import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) throw new Error("SESSION_SECRET env var is required");

export const COOKIE_NAME = "admin_token";

export interface AdminPayload {
  email: string;
}

export function signAdminToken(email: string): string {
  return jwt.sign({ email } satisfies AdminPayload, SESSION_SECRET!, {
    expiresIn: "24h",
  });
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, SESSION_SECRET!) as AdminPayload;
    (req as Request & { admin: AdminPayload }).admin = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
