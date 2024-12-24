import { z } from "zod";

export const UpdateSettingsSchema = z.object({
  field: z.string(),

  value: z.number(),
});
