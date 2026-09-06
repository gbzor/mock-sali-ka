import { useState } from "react";
import { Home, CalendarDays, MapPin, User, Bell, Plus, Search, Menu, X } from "lucide-react";
import type { ScreenName } from "../types";
import { USER } from "../data/events";

interface NavLink {
  key: ScreenName;
  label: string;
  Icon: typeof Home;
}

const LINKS: NavLink[] = [
  { key: "home", label: "Home", Icon: Home },
  { key: "calendar", label: "Schedule", Icon: CalendarDays },
  { key: "map", label: "Explore", Icon: MapPin },
  { key: "profile", label: "Profile", Icon: User },
];

export function TopNav({
  active,
  onNavigate,
}: {
  active: ScreenName;
  onNavigate: (s: ScreenName) => void;
}) {
  const [open, setOpen] = useState(false);

  const go = (s: ScreenName) => {
    setOpen(false);
    onNavigate(s);
  };

  // Which top-level tab is highlighted (sub-screens map back to a parent).
  const highlighted: ScreenName =
    active === "event-detail"
      ? "home"
      : active === "settings"
        ? "profile"
        : active === "qr-scanner" || active === "attendance"
          ? "profile"
          : active;

  return (
    <header className="topnav">
      <div className="topnav__inner">
        <button className="brand" onClick={() => go("home")} aria-label="Sali Ka home">
          <span className="brand__mark">S</span>
          <span className="brand__name">
            sali ka<span className="brand__q">?</span>
          </span>
        </button>

        <nav className="topnav__links" aria-label="Primary">
          {LINKS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`navlink ${highlighted === key ? "navlink--active" : ""}`}
              onClick={() => go(key)}
              aria-current={highlighted === key ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={2.2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="topnav__actions">
          <button className="topnav__search" onClick={() => go("home")} aria-label="Search events">
            <Search size={18} strokeWidth={2.2} />
            <span>Search events</span>
          </button>

          <button className="iconbtn" aria-label="Notifications">
            <Bell size={20} strokeWidth={2} />
            <span className="iconbtn__dot">3</span>
          </button>

          <button className="btn-primary topnav__post" onClick={() => go("create-event")}>
            <Plus size={18} strokeWidth={2.6} />
            <span>Post an Event</span>
          </button>

          <button className="topnav__avatar" onClick={() => go("profile")} aria-label="Your profile">
            {USER.initials}
          </button>

          <button
            className="topnav__burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="topnav__mobile" aria-label="Mobile">
          {LINKS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`navlink ${highlighted === key ? "navlink--active" : ""}`}
              onClick={() => go(key)}
            >
              <Icon size={18} strokeWidth={2.2} />
              <span>{label}</span>
            </button>
          ))}
          <button className="btn-primary" onClick={() => go("create-event")}>
            <Plus size={18} strokeWidth={2.6} />
            <span>Post an Event</span>
          </button>
        </nav>
      )}
    </header>
  );
}
