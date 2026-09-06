import { useCallback, useState } from "react";
import { TopNav } from "./components/TopNav";
import { HomeScreen } from "./screens/HomeScreen";
import { CalendarScreen } from "./screens/CalendarScreen";
import { MapScreen } from "./screens/MapScreen";
import { CreateEventScreen } from "./screens/CreateEventScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { EventDetailScreen } from "./screens/EventDetailScreen";
import { QrScannerScreen } from "./screens/QrScannerScreen";
import { AttendanceScreen } from "./screens/AttendanceScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { FEED_EVENTS } from "./data/events";
import type { EventItem, ScreenName } from "./types";

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("home");
  const [activeEvent, setActiveEvent] = useState<EventItem>(FEED_EVENTS[0]);

  const navigate = useCallback((next: ScreenName) => {
    setScreen(next);
    // Return to the top of the page on every navigation.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const openEvent = useCallback(
    (event: EventItem) => {
      setActiveEvent(event);
      navigate("event-detail");
    },
    [navigate]
  );

  return (
    <div className="app">
      <TopNav active={screen} onNavigate={navigate} />
      <main>
        {screen === "home" && <HomeScreen onOpenEvent={openEvent} />}
        {screen === "calendar" && <CalendarScreen onOpenEvent={() => openEvent(FEED_EVENTS[0])} />}
        {screen === "map" && <MapScreen onOpenEvent={() => openEvent(FEED_EVENTS[0])} />}
        {screen === "create-event" && <CreateEventScreen onNavigate={navigate} />}
        {screen === "profile" && (
          <ProfileScreen onNavigate={navigate} onOpenEvent={() => openEvent(FEED_EVENTS[1])} />
        )}
        {screen === "event-detail" && (
          <EventDetailScreen event={activeEvent} onBack={() => navigate("home")} />
        )}
        {screen === "qr-scanner" && <QrScannerScreen onNavigate={navigate} />}
        {screen === "attendance" && <AttendanceScreen onNavigate={navigate} />}
        {screen === "settings" && <SettingsScreen onNavigate={navigate} />}
      </main>

      <footer className="app-footer">
        <span>Sali Ka — community events, reimagined for the web.</span>
        <span className="muted">Front-end demo · sample data only</span>
      </footer>
    </div>
  );
}
