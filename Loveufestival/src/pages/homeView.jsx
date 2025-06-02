import { useState, useEffect } from "react";
import logoBlack from "@/assets/logo_black.svg";
import logoWhite from "@/assets/logo_white.svg";
import eventsData from "../data/events.json";

function getEventStartDate(event) {
  let day, time;
  if (event.day && event.time) {
    day = event.day;
    time = event.time;
  } else if (event.time && event.time.includes(",")) {
    [day, time] = event.time.split(",");
    time = time.trim();
  } else {
    return null;
  }
  day = day.trim().toLowerCase();
  let dateStr = "";
  if (day.startsWith("sat")) dateStr = "2025-05-31";
  else if (day.startsWith("sun")) dateStr = "2025-06-01";
  else return null;

  const startTime = time.split("–")[0].trim().padStart(5, "0");
  const iso = `${dateStr}T${startTime}:00`;
  return new Date(iso);
}

export default function HomeView({ theme }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const newsletter = {
    image: theme === "dark" ? logoWhite : logoBlack,
    title: "Festival Update: New Artists Announced!",
    description:
      "Check out the latest additions to our lineup and what to expect this year.",
    fullText:
      "We are thrilled to announce several new artists joining LoveUfestival 2025! Stay tuned for more updates and exclusive interviews with the performers. Don't miss out on the fun and excitement!",
  };

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const soon = new Date(now.getTime() + 15 * 60 * 1000);

      const notifs = eventsData
        .map((event) => {
          const start = getEventStartDate(event);
          if (!start) return null;
          if (start > now && start <= soon) {
            return {
              id: `${event.name}-${start.toISOString()}`,
              title: `Performance starts in ${Math.round((start - now) / 60000)} min`,
              message: `${event.name} is about to begin on the ${event.stage || "Main Stage"}.`,
              date: start.toLocaleString(),
              act: event.name,
            };
          }
          return null;
        })
        .filter(Boolean);

      setNotifications(notifs);
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full mt-12">
      <h1 className="text-3xl text-center font-bold mb-4 text-[var(--color-secondary)] dark:text-sky-400">
        Welcome to LoveUfestival!
      </h1>

      <img
        src={theme === "dark" ? logoWhite : logoBlack}
        alt="Festival Logo"
        className="w-max h-42"
      />

      <div className="w-full max-w-md mb-4 flex justify-center mt-4">
        <button
          className="relative flex items-center px-4 py-2 bg-[var(--color-accent)] text-white rounded-xl shadow hover:brightness-110 transition"
          onClick={() => setShowNotifications((v) => !v)}
        >
          <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notifications
          {notifications.length > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {showNotifications && (
        <div className="w-full max-w-md mb-4 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-10 w-full origin-top animate-dropdown">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg text-black dark:text-white">Notifications</span>
              <button
                className="text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setShowNotifications(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            {notifications.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-300">No notifications.</div>
            ) : (
              <ul>
                {notifications.map((n, idx) => (
                  <li
                    key={n.id}
                    className={`mb-2 border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0 transition-all duration-300
                      ${showNotifications ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
                    style={{ transitionDelay: `${idx * 75}ms` }}
                  >
                    <div className="font-semibold text-black dark:text-white">{n.title}</div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm">{n.message}</div>
                    <div className="text-xs mt-1 text-[var(--color-info)]">{n.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <h2 className="text-xl pt-4 pb-4 text-[var(--color-secondary)] dark:text-sky-400">Newsletter</h2>

      <button
        className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-full max-w-md hover:shadow-lg transition mb-4 border border-[var(--color-accent)]"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={newsletter.image}
          alt="Newsletter"
          className="w-18 h-18 rounded-full mr-4 border-2 border-[var(--color-accent)]"
        />
        <div className="flex-1 text-left">
          <div className="font-bold text-lg text-black dark:text-white">
            {newsletter.title}
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {newsletter.description}
          </div>
        </div>
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-lg relative animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={newsletter.image}
              alt="Newsletter"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--color-accent)]"
            />
            <div className="font-bold text-xl text-center text-black dark:text-white mb-2">
              {newsletter.title}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-base text-center">
              {newsletter.fullText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

