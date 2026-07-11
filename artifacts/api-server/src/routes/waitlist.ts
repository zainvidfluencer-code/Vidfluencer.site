import { Router, type IRouter } from "express";
import { db, waitlistSignupsTable } from "@workspace/db";
import { JoinWaitlistBody, JoinWaitlistResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/waitlist", async (req, res): Promise<void> => {
  const parsed = JoinWaitlistBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid waitlist signup");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, email } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const [signup] = await db
      .insert(waitlistSignupsTable)
      .values({ fullName: fullName.trim(), email: normalizedEmail })
      .returning();

    res.status(201).json(JoinWaitlistResponse.parse(signup));
  } catch (err: unknown) {
    const code =
      (err as { code?: string })?.code ??
      (err as { cause?: { code?: string } })?.cause?.code;

    if (code === "23505") {
      req.log.info({ email: normalizedEmail }, "Duplicate waitlist signup");
      res.status(409).json({ error: "This email is already on the waitlist." });
      return;
    }

    req.log.error({ err }, "Failed to create waitlist signup");
    throw err;
  }
});

export default router;
