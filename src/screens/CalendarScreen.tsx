import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleItem } from "../components/ScheduleItem";
import { SCHEDULE } from "../data/events";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
// August 2026 starts on a Saturday (index 6).
const FIRST_OFFSET = 6;
const DAYS_IN_MONTH = 31;
const EVENT_DAYS = new Set([23, 29]);
const SELECTED_DAY = 23;

export function CalendarScreen({ onOpenEvent }: { onOpenEvent: () => void }) {
  const [selected, setSelected] = useState(SELECTED_DAY);

  const cells: (number | null)[] = [
    ...Array.from({ length: FIRST_OFFSET }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];

  return (
    <div className="page">
      <h1 className="page-title">Schedule</h1>
      <p className="page-sub">Your calendar and everything you have lined up.</p>

      <div className="cal-layout">
        <div className="cal-card card">
          <div className="cal-month">
            <span className="cal-month__label">August 2026</span>
            <span className="cal-month__nav">
              <button className="cal-nav" aria-label="Previous month">
                <ChevronLeft size={20} strokeWidth={2.4} />
              </button>
              <button className="cal-nav" aria-label="Next month">
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
                  {EVENT_DAYS.has(day) && <span className="cal-cell__dot" />}
                </button>
              )
            )}
          </div>
        </div>

        <div className="cal-side">
          {SCHEDULE.map((group) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
