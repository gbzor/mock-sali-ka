import { ArrowLeft, User } from "lucide-react";
import { ATTENDEES } from "../data/events";
import type { ScreenName } from "../types";

export function AttendanceScreen({ onNavigate }: { onNavigate: (s: ScreenName) => void }) {
  const checkedIn = ATTENDEES.filter((a) => a.status === "IN").length;

  return (
    <div className="page page--narrow">
      <button className="back-link" onClick={() => onNavigate("qr-scanner")}>
        <ArrowLeft size={18} strokeWidth={2.2} /> Back
      </button>
      <h1 className="page-title">Attendance</h1>
      <p className="page-sub">Sunday Farmers Market · Aug 23</p>

      <div className="stats-row">
        <div className="stat-card stat-card--green">
          <span className="stat-card__label">Checked in</span>
          <span className="stat-card__value">{checkedIn}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Registered</span>
          <span className="stat-card__value">{ATTENDEES.length}</span>
        </div>
      </div>

      <section className="block">
        <h2 className="section-title block__title">Attendees ({ATTENDEES.length})</h2>
        <div className="stack">
          {ATTENDEES.map((a) => (
            <div className="attendee-row card" key={a.id}>
              <span className="attendee-row__left">
                <span className="attendee-row__avatar">
                  <User size={18} strokeWidth={2.2} />
                </span>
                <span className="attendee-row__name">
                  <strong>{a.name}</strong>
                  <span className="muted">{a.id}</span>
                </span>
              </span>
              <span
                className={`status-pill ${
                  a.status === "IN" ? "status-pill--in" : "status-pill--pending"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
