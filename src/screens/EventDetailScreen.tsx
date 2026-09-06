import { useState } from "react";
import { ArrowLeft, Heart, CalendarDays, MapPin, Navigation } from "lucide-react";
import { StripePlaceholder } from "../components/StripePlaceholder";
import { CategoryBadge } from "../components/CategoryBadge";
import { AvatarGroup } from "../components/Avatar";
import { USER } from "../data/events";
import type { EventItem } from "../types";

const ABOUT =
  "Come support local farmers, craftsmen, and creators this Sunday! We have fresh summer organic produce, handmade pastries, hot coffee stalls, and interactive games for kids. Dog friendly space. Bring your own reusable shopping bag!";

export function EventDetailScreen({
  event,
  onBack,
}: {
  event: EventItem;
  onBack: () => void;
}) {
  const [fav, setFav] = useState(false);
  const [rsvp, setRsvp] = useState(false);

  return (
    <div className="page page--narrow">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={18} strokeWidth={2.2} /> Back to events
      </button>

      <div className="detail-cover">
        <StripePlaceholder className="detail-cover__stripes" />
        <button
          className={`round-btn detail-cover__fav ${fav ? "round-btn--on" : ""}`}
          aria-pressed={fav}
          aria-label="Save event"
          onClick={() => setFav((v) => !v)}
        >
          <Heart size={20} strokeWidth={2.2} fill={fav ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="detail-body">
        <div className="badge-row">
          <CategoryBadge category={event.category} />
        </div>
        <h1 className="detail-title">{event.title}</h1>
        <p className="detail-host">Hosted by {USER.name}</p>

        <div className="info-card card">
          <div className="info-row">
            <span className="info-icon">
              <CalendarDays size={20} strokeWidth={2} />
            </span>
            <span className="info-stack">
              <strong>Sunday, August 23, 2026</strong>
              <span className="muted">10:00 AM - 2:00 PM</span>
            </span>
          </div>
          <div className="info-divider" />
          <div className="info-row">
            <span className="info-icon">
              <MapPin size={20} strokeWidth={2} />
            </span>
            <span className="info-stack">
              <strong>{event.location}</strong>
              <span className="muted">Main Field Grass Area, California</span>
            </span>
            <button className="directions">
              <Navigation size={15} strokeWidth={2.2} /> Directions
            </button>
          </div>
        </div>

        <div className="social-proof">
          <AvatarGroup count={5} />
          <span>
            <strong>{event.going} members</strong> of your neighborhood are going
          </span>
        </div>

        <section className="block">
          <h2 className="section-title block__title">About this event</h2>
          <p className="detail-about">{ABOUT}</p>
        </section>

        <button
          className={`btn-primary detail-rsvp ${rsvp ? "detail-rsvp--done" : ""}`}
          onClick={() => setRsvp((v) => !v)}
        >
          {rsvp ? "You're going ✓" : "RSVP to This Event"}
        </button>
      </div>
    </div>
  );
}
