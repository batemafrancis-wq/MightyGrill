import { site } from "@/lib/site";

export type BookingPayload = {
  guestName: string;
  phone: string;
  email: string;
  headcount: number;
  date: string;
  timeWindow: string;
  dietary: string;
  notes: string;
};

export function buildWhatsAppMessage(payload: BookingPayload) {
  const eventNote =
    payload.headcount >= 12
      ? "\nOccasion: Private / group booking"
      : "";

  return [
    `Hello ${site.name}! I would like to reserve a table.`,
    "",
    `Name: ${payload.guestName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Guests: ${payload.headcount}`,
    `Date: ${payload.date}`,
    `Time: ${payload.timeWindow}`,
    `Dietary: ${payload.dietary || "None"}`,
    payload.notes ? `Notes: ${payload.notes}` : null,
    eventNote.trim() || null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(payload: BookingPayload) {
  const text = encodeURIComponent(buildWhatsAppMessage(payload));
  return `https://wa.me/${site.whatsapp.e164}?text=${text}`;
}

export function generalWhatsAppUrl(text = `Hello ${site.name}! I would like to place an order / book a table.`) {
  return `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(text)}`;
}
