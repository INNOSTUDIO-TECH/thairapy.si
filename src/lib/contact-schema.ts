import { z } from "zod";

/** Shared by the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
  // Honeypot — must stay empty; bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
