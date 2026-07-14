---
name: Orval zod codegen + email format
description: Why adding `format: email` to an OpenAPI string schema breaks the api-spec codegen/typecheck step.
---

Orval's zod generator emits `zod.email()` for any OpenAPI string field with `format: email`. The workspace's pinned `zod` version (3.25.x) does not expose a top-level `zod.email()` helper (that's a zod v4 API), so the generated file in `lib/api-zod/src/generated/api.ts` fails `pnpm -w run typecheck:libs`.

**Why:** this is a version mismatch between what Orval assumes (newer zod) and what the workspace catalog pins (zod 3.25.x), not a mistake in the OpenAPI spec shape itself.

**How to apply:** when adding an email (or similar) field to `lib/api-spec/openapi.yaml`, use plain `type: string` (optionally with `minLength`) instead of `format: email`, and rely on the frontend's own zod/react-hook-form validation (e.g. `z.string().email()` client-side) plus normal server-side checks. Re-run `pnpm --filter @workspace/api-spec run codegen` after any spec change to confirm it still passes before building on top of the generated types.
