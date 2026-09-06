import { useState, type FormEvent } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import type { Session } from "../useAuth";

type Mode = "login" | "signup";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthScreen({ onAuthenticated }: { onAuthenticated: (s: Session) => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const switchMode = (m: Mode) => {
    setMode(m);
    setErrors({});
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (mode === "signup" && name.trim().length < 2) e.name = "Enter your full name.";
    if (!EMAIL_RE.test(email)) e.email = "Enter a valid email address.";
    if (password.length < 8) e.password = "Use at least 8 characters.";
    if (mode === "signup" && confirm !== password) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Demo only: no password is stored or sent anywhere.
    const displayName =
      mode === "signup"
        ? name.trim()
        : email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    onAuthenticated({ name: displayName, email: email.trim() });
  };

  return (
    <div className="auth-stage">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand__mark">S</span>
          <span>
            sali ka<span className="brand__q">?</span>
          </span>
        </div>
        <p className="auth-tagline">Discover events happening around your neighborhood.</p>

        <div className="segmented auth-seg">
          <button
            className={`segmented__tab ${mode === "login" ? "segmented__tab--active" : ""}`}
            onClick={() => switchMode("login")}
            type="button"
          >
            Log In
          </button>
          <button
            className={`segmented__tab ${mode === "signup" ? "segmented__tab--active" : ""}`}
            onClick={() => switchMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <label className="field">
              <span className="field__label">Full name</span>
              <div className="input input--icon">
                <User size={18} strokeWidth={2} className="muted" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jordan Diaz"
                  autoComplete="name"
                />
              </div>
              {errors.name && <span className="auth-error">{errors.name}</span>}
            </label>
          )}

          <label className="field">
            <span className="field__label">Email</span>
            <div className="input input--icon">
              <Mail size={18} strokeWidth={2} className="muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <div className="input input--icon">
              <Lock size={18} strokeWidth={2} className="muted" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </label>

          {mode === "signup" && (
            <label className="field">
              <span className="field__label">Confirm password</span>
              <div className="input input--icon">
                <Lock size={18} strokeWidth={2} className="muted" />
                <input
                  type={showPw ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirm && <span className="auth-error">{errors.confirm}</span>}
            </label>
          )}

          <button type="submit" className="btn-primary auth-submit">
            {mode === "login" ? "Log In" : "Create Account"}
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </form>

        <button className="auth-guest" onClick={() => onAuthenticated({ name: "Guest", email: "", guest: true })}>
          Continue as guest
        </button>

        <p className="auth-foot muted">
          Demo app — use any email and a password of 8+ characters. No credentials are stored.
        </p>
      </div>
    </div>
  );
}
