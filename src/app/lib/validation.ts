import { z } from "zod";

/**
 * Validation schema for user registration
 */
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "Fornavn er påkrevd")
    .min(2, "Fornavn må være minst 2 tegn")
    .max(50, "Fornavn kan ikke være lengre enn 50 tegn")
    .regex(/^[a-zA-ZæøåÆØÅ\s-]+$/, "Fornavn kan kun inneholde bokstaver, mellomrom og bindestrek"),

  lastName: z
    .string()
    .min(1, "Etternavn er påkrevd")
    .min(2, "Etternavn må være minst 2 tegn")
    .max(50, "Etternavn kan ikke være lengre enn 50 tegn")
    .regex(/^[a-zA-ZæøåÆØÅ\s-]+$/, "Etternavn kan kun inneholde bokstaver, mellomrom og bindestrek"),

  email: z
    .string()
    .min(1, "E-post er påkrevd")
    .email("Ugyldig e-postadresse")
    .toLowerCase()
    .trim(),

  phoneNumber: z
    .string()
    .min(1, "Telefonnummer er påkrevd")
    .regex(
      /^(\+47|0047)?[4|9]\d{7}$/,
      "Ugyldig norsk telefonnummer (f.eks. 12345678 eller +4712345678)"
    )
    .transform((val) => {
      // Normalize phone number to format: +4712345678
      const cleaned = val.replace(/\s/g, "");
      if (cleaned.startsWith("+47")) return cleaned;
      if (cleaned.startsWith("0047")) return cleaned.replace("0047", "+47");
      return `+47${cleaned}`;
    }),

  password: z
    .string()
    .min(8, "Passord må være minst 8 tegn")
    .max(100, "Passord kan ikke være lengre enn 100 tegn")
    .regex(/[a-z]/, "Passord må inneholde minst én liten bokstav")
    .regex(/[A-Z]/, "Passord må inneholde minst én stor bokstav")
    .regex(/[0-9]/, "Passord må inneholde minst ett tall"),

  confirmPassword: z.string().min(1, "Bekreft passord er påkrevd"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passordene matcher ikke",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Validation schema for user login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-post er påkrevd")
    .email("Ugyldig e-postadresse")
    .toLowerCase()
    .trim(),

  password: z.string().min(1, "Passord er påkrevd"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
