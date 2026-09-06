import { useState, type FormEvent } from "react";
import { Plus, CalendarDays, Clock, MapPin, Check } from "lucide-react";
import { CATEGORIES } from "../data/events";
import type { Category, ScreenName } from "../types";

export function CreateEventScreen({ onNavigate }: { onNavigate: (s: ScreenName) => void }) {
  const [category, setCategory] = useState<Category>("Market");
  const [promote, setPromote] = useState(true);
  const [posted, setPosted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPosted(true);
    // Return to the feed after showing the confirmation state.
    window.setTimeout(() => onNavigate("home"), 1100);
  };

  return (
    <div className="page page--narrow">
      <h1 className="page-title">Post an Event</h1>
      <p className="page-sub">Share what your community is up to.</p>

      <form className="form-card card" onSubmit={handleSubmit}>
        <button type="button" className="upload-area">
          <Plus size={22} strokeWidth={2.4} />
          <span>add cover photo</span>
        </button>

        <Field label="Event Title">
          <input className="input" placeholder="e.g. Sunday Farmers Market" required />
        </Field>

        <div className="form-row">
          <Field label="Date">
            <div className="input input--icon">
              <CalendarDays size={18} strokeWidth={2} className="muted" />
              <input placeholder="Aug 23, 2026" required />
            </div>
          </Field>
          <Field label="Time">
            <div className="input input--icon">
              <Clock size={18} strokeWidth={2} className="muted" />
              <input placeholder="10:00 AM" required />
            </div>
          </Field>
        </div>

        <Field label="Location">
          <div className="input input--icon">
            <MapPin size={18} strokeWidth={2} className="muted" />
            <input placeholder="Oakwood Community Park" required />
          </div>
        </Field>

        <Field label="Category">
          <div className="pills">
            {CATEGORIES.map((c) => (
              <button
                type="button"
                key={c}
                className={`pill ${category === c ? "pill--active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Description">
          <textarea
            className="input textarea"
            rows={4}
            placeholder="Tell the community about your event..."
          />
        </Field>

        <div className="promote">
          <div>
            <strong>Promote this event</strong>
            <p className="muted">Feature this on the home screen discover feeds</p>
          </div>
          <button
            type="button"
            className={`toggle ${promote ? "toggle--on" : ""}`}
            role="switch"
            aria-checked={promote}
            aria-label="Promote this event"
            onClick={() => setPromote((v) => !v)}
          >
            <span className="toggle__knob" />
          </button>
        </div>

        <button type="submit" className="btn-primary form-submit" disabled={posted}>
          {posted ? (
            <>
              <Check size={18} strokeWidth={2.6} /> Posted!
            </>
          ) : (
            "Post Event"
          )}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  );
}
