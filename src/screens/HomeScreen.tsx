import { useState } from "react";
import { Search } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { StripePlaceholder } from "../components/StripePlaceholder";
import { CATEGORIES, FEED_EVENTS, USER } from "../data/events";
import type { Category, EventItem } from "../types";

export function HomeScreen({ onOpenEvent }: { onOpenEvent: (e: EventItem) => void }) {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const hosted = FEED_EVENTS.find((e) => e.hosting);

  const feed = FEED_EVENTS.filter((e) => {
    const byCat = active === "All" || e.category === active;
    const q = query.trim().toLowerCase();
    const byQuery =
      q === "" || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
    return byCat && byQuery;
  });

  const showHosted =
    hosted && (active === "All" || active === hosted.category) && query.trim() === "";

  return (
    <div className="page">
      <div className="home-hero">
        <div>
          <h1 className="page-title">
            sali ka, {USER.firstName}
            <span className="home-hero__q">?</span>
          </h1>
          <p className="page-sub">Discover events happening around your neighborhood.</p>
        </div>

        <div className="home-search">
          <Search size={18} strokeWidth={2} className="muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events near you"
            aria-label="Search events near you"
          />
        </div>
      </div>

      <div className="pills" role="tablist" aria-label="Event categories">
        <Pill label="All" active={active === "All"} onClick={() => setActive("All")} />
        {CATEGORIES.map((c) => (
          <Pill key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </div>

      {showHosted && hosted && (
        <section className="block">
          <h2 className="section-title block__title">Your Events</h2>
          <button
            className="hosted"
            onClick={() => onOpenEvent(hosted)}
            aria-label={`Open ${hosted.title}`}
          >
            <StripePlaceholder className="hosted__thumb" showLabel={false} />
            <span className="hosted__info">
              <span className="hosted__row">
                <span className="hosted__tag">Hosting</span>
                <span className="hosted__time">Today, 10:00 AM</span>
              </span>
              <span className="hosted__title">{hosted.title}</span>
              <span className="hosted__loc">Oakwood Community Center</span>
            </span>
            <span className="hosted__cta">Manage</span>
          </button>
        </section>
      )}

      <section className="block">
        <h2 className="section-title block__title">Events Around You</h2>
        <div className="feed-grid">
          {feed.map((e) => (
            <EventCard key={e.id} event={e} onOpen={() => onOpenEvent(e)} />
          ))}
        </div>
        {feed.length === 0 && <p className="empty">No events match your search.</p>}
      </section>
    </div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`pill ${active ? "pill--active" : ""}`}
      role="tab"
      aria-selected={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
