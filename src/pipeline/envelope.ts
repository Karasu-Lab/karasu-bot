import { z } from "zod";

export const envelopeSchema = z.object({
  responsedAt: z.iso.datetime(),
  ok: z.boolean(),
  data: z.unknown(),
});

export type Envelope = z.infer<typeof envelopeSchema>;

/** Wraps a raw response in the common envelope and validates it with zod. */
export const toEnvelope = (data: unknown, failed: boolean): Envelope => {
  const candidate = {
    responsedAt: new Date().toISOString(),
    ok: !failed,
    data: data === undefined ? null : data,
  };
  const parsed = envelopeSchema.safeParse(candidate);
  return parsed.success ? parsed.data : { ...candidate, ok: false };
};
