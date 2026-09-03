import { getDb } from "@/db";
import { bookings } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { isDateInPast } from "@/lib/hours";
import { buildWhatsAppUrl, type BookingPayload } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const db = getDb();
    await ensureSeeded();
    const body = (await request.json()) as Partial<BookingPayload> & { sourcePage?: string };
    const guestName = String(body.guestName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const headcount = Number(body.headcount);
    const date = String(body.date ?? "");
    const timeWindow = String(body.timeWindow ?? "");
    const dietary = String(body.dietary ?? "None");
    const notes = String(body.notes ?? "");
    const sourcePage = String(body.sourcePage ?? "/book");

    if (guestName.length < 2 || phone.length < 9 || !/\S+@\S+\.\S+/.test(email)) {
      return Response.json({ error: "Please complete a valid guest profile." }, { status: 400 });
    }
    if (!Number.isFinite(headcount) || headcount < 1 || headcount > 50) {
      return Response.json({ error: "Headcount must be between 1 and 50." }, { status: 400 });
    }
    if (!date || isDateInPast(date) || !timeWindow) {
      return Response.json({ error: "Choose a future date and time window." }, { status: 400 });
    }

    const payload: BookingPayload = {
      guestName,
      phone,
      email,
      headcount,
      date,
      timeWindow,
      dietary,
      notes,
    };
    const whatsappUrl = buildWhatsAppUrl(payload);

    await db.insert(bookings).values({
      guestName,
      phone,
      email,
      headcount,
      date,
      timeWindow,
      dietary,
      notes,
      sourcePage,
      whatsappUrl,
    });

    return Response.json({ ok: true, whatsappUrl });
  } catch {
    return Response.json({ error: "Could not save booking." }, { status: 500 });
  }
}
