/** Build and download a one-off calendar reminder (.ics) — works offline. */

function stampUTC(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(text: string): string {
  return text.replace(/[\\;,]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
}

export function downloadIcs(opts: {
  title: string;
  description: string;
  at: Date;
}): void {
  const start = stampUTC(opts.at);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Next Play//Re-check//EN",
    "BEGIN:VEVENT",
    `UID:${start}-nextplay@local`,
    `DTSTAMP:${stampUTC(new Date())}`,
    `DTSTART:${start}`,
    `DURATION:PT15M`,
    `SUMMARY:${escapeIcs(opts.title)}`,
    `DESCRIPTION:${escapeIcs(opts.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "next-play-recheck.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
