import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  COMMIT_HASH: z
    .string()
    .regex(
      /^([0-9a-f]{7,40}|unknown)$/,
      "must be a git commit hash or 'unknown'",
    )
    .default("unknown"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
