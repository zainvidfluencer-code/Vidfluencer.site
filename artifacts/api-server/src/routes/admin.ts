import { Router, type IRouter } from "express";
import { db, waitlistSignupsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { COOKIE_NAME, requireAdmin, signAdminToken } from "../middlewares/auth.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD env vars are required");
}

const router: IRouter = Router();

// POST /api/admin/login
router.post("/admin/login", (req, res): void => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.trim().toLowerCase() !== ADMIN_EMAIL!.trim().toLowerCase() ||
    password !== ADMIN_PASSWORD
  ) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signAdminToken(email.trim().toLowerCase());

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 24h
    path: "/",
  });

  res.status(200).json({ ok: true });
});

// POST /api/admin/logout
router.post("/admin/logout", (_req, res): void => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.status(200).json({ ok: true });
});

// GET /api/admin/signups — protected
router.get("/admin/signups", requireAdmin, async (_req, res): Promise<void> => {
  const signups = await db
    .select()
    .from(waitlistSignupsTable)
    .orderBy(desc(waitlistSignupsTable.createdAt));

  res.status(200).json(signups);
});

export default router;
