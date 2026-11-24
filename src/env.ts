import { z } from "zod";

const port = z.coerce.number().int().min(1).max(65535);

const apiSchema = z.object({
  PORT: port.default(3000),
  BOT_PORT: port.default(8081),
  COMMIT_HASH: z
    .string()
    .regex(
      /^([0-9a-f]{7,40}|unknown)$/,
      "must be a git commit hash or 'unknown'",
    )
    .default("unknown"),
});

const botSchema = z.object({
  BOT_PORT: port.default(8081),
  BOT_TOKEN: z.string().min(1),
});

const parse = <T extends z.ZodType>(schema: T): z.infer<T> => {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables:\n${z.prettifyError(parsed.error)}`,
    );
  }

  return parsed.data;
};

export const env = parse(apiSchema);

export const loadBotEnv = () => parse(botSchema);
