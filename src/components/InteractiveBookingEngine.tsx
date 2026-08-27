"use client";

import { useMemo, useState } from "react";
import {
  buildDateOptions,
  buildTimeWindows,
  getTimeBand,
  isSlotPast,
} from "@/lib/hours";
import { site } from "@/lib/site";

const dietaryOptions = ["None", "Vegetarian", "Vegan", "Halal", "Gluten-free", "No pork", "Nut allergy", "Other"];

type FormState = {
  headcount: number;
  date: string;
  timeWindow: string;
  guestName: string;
  phone: string;
  email: string;
  dietary: string[];
  notes: string;
};

const dates = buildDateOptions();

export function InteractiveBookingEngine() {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    headcount: 2,
    date: dates[0]?.iso ?? "",
    timeWindow: "",
    guestName: "",
    phone: "",
    email: "",
    dietary: [],
    notes: "",
  });

  const times = useMemo(() => buildTimeWindows(form.date), [form.date]);
  const validStep1 = form.headcount >= 1 && form.date && form.timeWindow;
  const validStep2 =
    form.guestName.trim().length > 1 &&
    form.phone.trim().length >= 9 &&
    /\S+@\S+\.\S+/.test(form.email);
  const ready = Boolean(validStep1 && validStep2);

  async function submit() {
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: form.guestName,
          phone: form.phone,
          email: form.email,
          headcount: form.headcount,
          date: form.date,
          timeWindow: form.timeWindow,
          dietary: form.dietary.join(", ") || "None",
          notes: form.notes,
          sourcePage: "/book",
        }),
      });
      const data = (await response.json()) as { whatsappUrl?: string; error?: string };
      if (!response.ok || !data.whatsappUrl) {
        throw new Error(data.error || "Could not start WhatsApp booking");
      }
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: "whatsapp_booking",
          event_category: "reservation",
          value: form.headcount,
        });
      }
      window.location.href = data.whatsappUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-grill-sand bg-white p-5 shadow-[0_24px_80px_rgba(7,25,16,0.12)] sm:p-8">
      <ol className="mb-8 grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-wide">
        {["Cover", "Guest", "WhatsApp"].map((label, index) => {
          const n = index + 1;
          return (
            <li
              key={label}
              className={`rounded-full px-2 py-2 ${
                step === n ? "bg-grill-green text-white" : step > n ? "bg-grill-orange text-white" : "bg-grill-sand"
              }`}
            >
              {n}. {label}
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <div className="space-y-8">
          <div>
            <label htmlFor="headcount" className="text-sm font-bold">
              Headcount
            </label>
            <select
              id="headcount"
              value={form.headcount}
              onChange={(event) => setForm((prev) => ({ ...prev, headcount: Number(event.target.value) }))}
              className="mt-2 w-full rounded-2xl border border-grill-sand bg-grill-cream px-4 py-3"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                  {n >= 12 ? " · private / group" : ""}
                </option>
              ))}
            </select>
            {form.headcount >= 12 ? (
              <p className="mt-2 text-sm text-grill-orange">
                Private events confirmed on WhatsApp — we will hold a garden or indoor pocket for you.
              </p>
            ) : null}
          </div>

          <div>
            <p className="text-sm font-bold">Date</p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {dates.map((date) => (
                <button
                  key={date.iso}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, date: date.iso, timeWindow: "" }))}
                  className={`min-w-[4.6rem] rounded-2xl border px-3 py-3 text-center ${
                    form.date === date.iso
                      ? "border-grill-green bg-grill-green text-white"
                      : "border-grill-sand bg-grill-cream"
                  }`}
                >
                  <span className="block text-[10px] uppercase">{date.weekday}</span>
                  <span className="block text-lg font-display">{date.dayNum.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold">Time window</p>
            <p className="mt-1 text-xs text-grill-forest/70">
              Green = easy · Orange = busy · Flame = packed. Past slots are locked.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {times.map((time) => {
                const past = isSlotPast(form.date, time);
                const band = getTimeBand(form.date, time);
                const selected = form.timeWindow === time;
                const tone =
                  past || band === "closed"
                    ? "bg-zinc-100 text-zinc-400"
                    : band === "hot"
                      ? "bg-orange-100 text-grill-orange"
                      : band === "busy"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-emerald-50 text-grill-green";
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={past}
                    onClick={() => setForm((prev) => ({ ...prev, timeWindow: time }))}
                    className={`rounded-2xl px-2 py-3 text-sm font-semibold ${tone} ${
                      selected ? "ring-2 ring-grill-ink" : ""
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            disabled={!validStep1}
            onClick={() => setStep(2)}
            className="w-full rounded-full bg-grill-green py-3 font-bold text-white disabled:bg-zinc-300"
          >
            Continue to guest details
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (validStep2) setStep(3);
          }}
        >
          <div>
            <label htmlFor="guestName" className="text-sm font-bold">
              Full name
            </label>
            <input
              id="guestName"
              name="name"
              autoComplete="name"
              required
              value={form.guestName}
              onChange={(event) => setForm((prev) => ({ ...prev, guestName: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-grill-sand bg-grill-cream px-4 py-3"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-bold">
              Phone
            </label>
            <input
              id="phone"
              name="tel"
              type="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-grill-sand bg-grill-cream px-4 py-3"
              placeholder="+256…"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-grill-sand bg-grill-cream px-4 py-3"
            />
          </div>
          <fieldset>
            <legend className="text-sm font-bold">Dietary accommodations</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {dietaryOptions.map((option) => {
                const on = form.dietary.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        dietary:
                          option === "None"
                            ? ["None"]
                            : prev.dietary.includes(option)
                              ? prev.dietary.filter((item) => item !== option)
                              : [...prev.dietary.filter((item) => item !== "None"), option],
                      }))
                    }
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      on ? "bg-grill-green text-white" : "bg-grill-sand"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div>
            <label htmlFor="notes" className="text-sm font-bold">
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-grill-sand bg-grill-cream px-4 py-3"
              placeholder="Birthday, high chair, garden table…"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-full bg-grill-sand py-3 font-bold">
              Back
            </button>
            <button type="submit" disabled={!validStep2} className="flex-1 rounded-full bg-grill-green py-3 font-bold text-white disabled:bg-zinc-300">
              Review booking
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
          <div className="rounded-3xl bg-grill-cream p-5 text-sm leading-7">
            <p>
              <strong>{form.guestName}</strong> · {form.headcount} guests
            </p>
            <p>
              {form.date} at {form.timeWindow}
            </p>
            <p>{form.phone}</p>
            <p>{form.email}</p>
            <p>Dietary: {form.dietary.join(", ") || "None"}</p>
            {form.notes ? <p>Notes: {form.notes}</p> : null}
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <p className="text-xs text-grill-forest/70">
            We keep this reservation on our side for analytics, then hand you to WhatsApp {site.whatsapp.display} to confirm
            with the grill team.
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-full bg-grill-sand py-3 font-bold">
              Back
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!ready || busy}
              className={`flex-1 rounded-full py-3 font-bold text-white transition ${
                ready ? "bg-wa shadow-[0_12px_30px_rgba(37,211,102,0.35)]" : "bg-zinc-400"
              }`}
            >
              {busy ? "Opening WhatsApp…" : "Send on WhatsApp"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
