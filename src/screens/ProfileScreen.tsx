import { useState } from "react";
import { Settings, QrCode, ScanLine, ClipboardList } from "lucide-react";
import { ScheduleItem } from "../components/ScheduleItem";
import { GOING_LIST, USER } from "../data/events";
import type { ScreenName } from "../types";

export function ProfileScreen({
  onNavigate,
  onOpenEvent,
}: {
  onNavigate: (s: ScreenName) => void;
  onOpenEvent: () => void;
}) {
  const [tab, setTab] = useState<"attendee" | "organizer">("attendee");

  return (
    <div className="page">
      <div className="profile-top">
        <h1 className="page-title">Profile</h1>
        <button className="btn-ghost" onClick={() => onNavigate("settings")}>
          <Settings size={18} strokeWidth={2} /> Settings
        </button>
      </div>

      <div className="profile-grid">
        <section className="identity-card card">
          <span className="identity-card__avatar">{USER.initials}</span>
          <h2 className="identity-card__name">{USER.name}</h2>
          <p className="muted">{USER.memberSince}</p>

          <div className="organizer-tools">
            <button className="tool-btn" onClick={() => onNavigate("qr-scanner")}>
              <ScanLine size={18} strokeWidth={2.2} /> Check-in Scanner
            </button>
            <button className="tool-btn" onClick={() => onNavigate("attendance")}>
              <ClipboardList size={18} strokeWidth={2.2} /> Attendance
            </button>
          </div>
        </section>

        <section className="qr-card card">
          <div className="qr-card__text">
            <h3>Membership QR</h3>
            <p className="muted">Scan this to check in at hosted events</p>
            <span className="qr-card__id">ID #{USER.membershipId}</span>
          </div>
          <div className="qr-graphic" aria-hidden="true">
            <QrCode size={104} strokeWidth={1.4} />
          </div>
        </section>
      </div>

      <div className="segmented">
        <button
          className={`segmented__tab ${tab === "attendee" ? "segmented__tab--active" : ""}`}
          onClick={() => setTab("attendee")}
        >
          Attendee
        </button>
        <button
          className={`segmented__tab ${tab === "organizer" ? "segmented__tab--active" : ""}`}
          onClick={() => setTab("organizer")}
        >
          Organizer
        </button>
      </div>

      <section className="block">
        <h2 className="section-title block__title">
          {tab === "attendee" ? "Events you're going to" : "Events you're hosting"}
        </h2>
        <div className="stack">
          {(tab === "attendee" ? GOING_LIST : GOING_LIST.slice(0, 1)).map((it) => (
            <ScheduleItem
              key={it.title}
              title={it.title}
              time={it.meta}
              location={it.location}
              onClick={onOpenEvent}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
