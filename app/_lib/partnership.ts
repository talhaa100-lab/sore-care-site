/**
 * Shared contract for the partnership inquiry form.
 * Used by the dialog (client) and /api/partnership (server).
 *
 * Mirrors the Sora API draft spec for
 * POST /api/service-notifications/partnership-inquiry
 */

export const INQUIRY_TYPES = ["refer-a-client", "schedule-partner-intro", "request-partner-packet"] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export function isInquiryType(value: unknown): value is InquiryType {
  return typeof value === "string" && (INQUIRY_TYPES as readonly string[]).includes(value);
}

/** Field limits. The API allows name ≤ 100, so first + last + a space must fit. */
export const PARTNER_LIMITS = {
  first: 50,
  last: 49,
  organization: 150,
  phone: 40,
  email: 254,
  message: 5000,
  sourcePage: 300,
} as const;

/** The API wants 10–15 digits once formatting is stripped. */
export const PHONE_DIGITS = { min: 10, max: 15 } as const;

export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidPhone(value: string) {
  const n = phoneDigits(value).length;
  return n >= PHONE_DIGITS.min && n <= PHONE_DIGITS.max;
}

export const PHONE_ERROR = "Please enter a valid phone number (10–15 digits).";
