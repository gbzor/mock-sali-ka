import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleItem } from "../components/ScheduleItem";
import { SCHEDULE } from "../data/events";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
// Sample events live on Aug 23 & 29, 2026.
const EVENT_YEAR = 2026;
const EVENT_MONTH = 7; // August (0-indexed)
const EVENT_DAYS = new Set([23, 29]);

export function CalendarScreen({ onOpenEvent }: { onOpenEvent: () => void }) {
  const [view, setView] = useState({ year: EVENT_YEAR, month: EVENT_MONTH });
  const [selected, setSelected] = useState<number | null>(23);

  const firstOffset = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const isEventMonth = view.year === EVENT_YEAR && view.month === EVENT_MONTH;

  const cells: (number | null)[] = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const changeMonth = (delta: number) => {
    const d = new Date(view.year, view.month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
    setSelected(null);
  };

  return (
    <div className="page">
      <h1 className="page-title">Schedule</h1>
      <p className="page-sub">Your calendar and everything you have lined up.</p>

      <div className="cal-layout">
        <div className="cal-card card">
          <div className="cal-month">
            <span className="cal-month__label">
              {MONTHS[view.month]} {view.year}
            </span>
            <span className="cal-month__nav">
              <button className="cal-nav" aria-label="Previous month" onClick={() => changeMonth(-1)}>
                <ChevronLeft size={20} strokeWidth={2.4} />
              </button>
              <button className="cal-nav" aria-label="Next month" onClick={() => changeMonth(1)}>
                <ChevronRight size={20} strokeWidth={2.4} />
              </button>
            </span>
          </div>

          <div className="cal-grid cal-grid--head">
            {WEEKDAYS.map((d, i) => (
              <span key={i} className="cal-weekday">
                {d}
              </span>
            ))}
          </div>

          <div className="cal-grid">
            {cells.map((day, i) =>
              day === null ? (
                <span key={i} className="cal-cell cal-cell--empty" />
              ) : (
                <button
                  key={i}
                  className={`cal-cell ${selected === day ? "cal-cell--selected" : ""}`}
                  onClick={() => setSelected(day)}
                >
                  {day}
                  {isEventMonth && EVENT_DAYS.has(day) && <span className="cal-cell__dot" />}
                </button>
              )
            )}
          </div>
        </div>

        <div className="cal-side">
          {isEventMonth ? (
            SCHEDULE.map((group) => (
              <section className="cal-day-group" key={group.date}>
                <h2 className="section-title cal-day-group__title">{group.date}</h2>
                <div className="stack">
                  {group.items.map((it) => (
                    <ScheduleItem
                      key={it.title}
                      title={it.title}
                      time={it.time}
                      location={it.location}
                      onClick={onOpenEvent}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <section className="cal-day-group">
              <h2 className="section-title cal-day-group__title">
                {MONTHS[view.month]} {view.year}
              </h2>
              <p className="empty">No events scheduled this month.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
