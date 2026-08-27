export type LiveStatus = {
  state: "open" | "closing-soon" | "closed";
  label: string;
  detail: string;
  nextChange: string;
};

const TZ = "Africa/Kampala";

function kampalaParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return {
    weekday,
    hour,
    minute,
    minutes: hour * 60 + minute,
    isoDate: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

function weekdayIndex(weekday: string) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

/** Minutes from midnight for a HH:MM string. 24:00 becomes 1440. */
export function parseMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isWeekendOpenDay(day: number) {
  return day === 5 || day === 6 || day === 0;
}

function closingMinutesForDay(day: number) {
  return isWeekendOpenDay(day) ? 2 * 60 : 24 * 60;
}

function openingMinutes() {
  return 12 * 60;
}

export function getKampalaDateKey(date = new Date()) {
  return kampalaParts(date).isoDate;
}

export function getLiveStatus(now = new Date()): LiveStatus {
  const { weekday, minutes } = kampalaParts(now);
  const day = weekdayIndex(weekday);
  const openAt = openingMinutes();

  const yesterday = (day + 6) % 7;
  const yestClose = closingMinutesForDay(yesterday);
  if (yestClose <= 12 * 60 && minutes < yestClose) {
    const remaining = yestClose - minutes;
    if (remaining <= 45) {
      return {
        state: "closing-soon",
        label: "Closing soon",
        detail: `Kitchen winds down in ${remaining} min · last orders now`,
        nextChange: `Closes at 02:00`,
      };
    }
    return {
      state: "open",
      label: "Open now",
      detail: "Till late — charcoal still hot",
      nextChange: "Closes at 02:00",
    };
  }

  if (minutes < openAt) {
    return {
      state: "closed",
      label: "Closed",
      detail: "We fire the grill at 12:00 noon",
      nextChange: "Opens today at 12:00",
    };
  }

  const closeAt = closingMinutesForDay(day);
  if (closeAt === 24 * 60) {
    const remaining = 1440 - minutes;
    if (remaining <= 45) {
      return {
        state: "closing-soon",
        label: "Closing soon",
        detail: `Midnight close in ${remaining} min`,
        nextChange: "Closes at 24:00",
      };
    }
    return {
      state: "open",
      label: "Open now",
      detail: "Mon–Thu · noon to midnight",
      nextChange: "Closes at 24:00",
    };
  }

  return {
    state: "open",
    label: "Open now",
    detail: "Fri–Sun · noon till late",
    nextChange: "Closes at 02:00",
  };
}

export type TimeBand = "open" | "busy" | "hot" | "closed";

export function getTimeBand(isoDate: string, time: string): TimeBand {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12));
  const weekday = new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    timeZone: "UTC",
  });
  const dayIdx = weekdayIndex(weekday);
  const mins = parseMinutes(time);
  const weekend = isWeekendOpenDay(dayIdx);
  const close = closingMinutesForDay(dayIdx);
  const open = openingMinutes();

  if (mins < 3 * 60) {
    return weekend ? "busy" : "closed";
  }
  if (mins < open) return "closed";
  if (close === 24 * 60 && mins >= 24 * 60) return "closed";
  if (close === 2 * 60 && mins >= 2 * 60 && mins < open) return "closed";

  if (mins >= 12 * 60 + 30 && mins < 15 * 60) return "busy";
  if (mins >= 18 * 60 && mins < 21 * 60 + 30) return weekend ? "hot" : "busy";
  if (weekend && mins >= 21 * 60 + 30) return "busy";
  return "open";
}

export function isDateInPast(isoDate: string, now = new Date()) {
  return isoDate < getKampalaDateKey(now);
}

function addDays(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(year, month - 1, day + days));
  return dt.toISOString().slice(0, 10);
}

function isLateNightSlot(time: string) {
  return parseMinutes(time) < 3 * 60;
}

export function isSlotPast(isoDate: string, time: string, now = new Date()) {
  const today = getKampalaDateKey(now);
  const nowMins = kampalaParts(now).minutes;
  if (!isLateNightSlot(time)) {
    if (isoDate < today) return true;
    if (isoDate > today) return false;
    return parseMinutes(time) <= nowMins;
  }
  const occursOn = addDays(isoDate, 1);
  if (occursOn < today) return true;
  if (occursOn > today) return false;
  return parseMinutes(time) <= nowMins;
}

export function buildDateOptions(days = 21, now = new Date()) {
  const { isoDate } = kampalaParts(now);
  const [y, m, d] = isoDate.split("-").map(Number);
  const options: { iso: string; label: string; weekday: string; dayNum: string }[] = [];
  for (let i = 0; i < days; i += 1) {
    const dt = new Date(Date.UTC(y, m - 1, d + i));
    const iso = dt.toISOString().slice(0, 10);
    const weekday = dt.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" });
    const dayNum = dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" });
    options.push({
      iso,
      weekday,
      dayNum,
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${weekday} ${dayNum}`,
    });
  }
  return options;
}

export function buildTimeWindows(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12));
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" });
  const dayIdx = weekdayIndex(weekday);
  const weekend = isWeekendOpenDay(dayIdx);
  const slots: string[] = [];
  for (let mins = 12 * 60; mins <= 23 * 60 + 30; mins += 30) {
    const h = Math.floor(mins / 60)
      .toString()
      .padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  if (weekend) {
    slots.push("00:00", "00:30", "01:00", "01:30");
  }
  return slots;
}

export function formatHoursLine() {
  return "Mon–Thu 12:00–24:00 · Fri–Sun 12:00–late";
}
