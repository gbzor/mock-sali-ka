import { useState } from "react";
import { Search, CalendarCheck } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { CATEGORIES, FEED_EVENTS } from "../data/events";
import type { Category, EventItem } from "../types";

export function HomeScreen({
  onOpenEvent,
  onViewHosted,
}: {
  onOpenEvent: (e: EventItem) => void;
  onViewHosted: () => void;
}) {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const feed = FEED_EVENTS.filter((e) => {
    const byCat = active === "All" || e.category === active;
    const q = query.trim().toLowerCase();
    const byQuery =
      q === "" || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
    return byCat && byQuery;
  });

  return (
    <div className="page">
      <div className="home-toolbar">
        <div className="home-search">
          <Search size={18} strokeWidth={2} className="muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events near you"
            aria-label="Search events near you"
          />
        </div>
        <button className="btn-ghost home-hosted-btn" onClick={onViewHosted}>
          <CalendarCheck size={18} strokeWidth={2.2} />
          My Hosted Events
        </button>
      </div>

      <div className="pills" role="tablist" aria-label="Event categories">
        <Pill label="All" active={active === "All"} onClick={() => setActive("All")} />
        {CATEGORIES.map((c) => (
          <Pill key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </div>

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
