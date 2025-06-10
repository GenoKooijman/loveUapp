import { useState, useEffect, useRef } from "react";
import events from "@/data/events.json";
import en from "@/locales/en.json";
import nl from "@/locales/nl.json";
import { Music, Star, Users, Calendar, PartyPopper, X } from "lucide-react";

function getTranslations(language) {
  return language === "nl" ? nl : en;
}

function normalizeDay(day) {
  if (!day) return "";
  const d = day.toLowerCase();
  if (["saturday", "zaterdag"].includes(d)) return "saturday";
  if (["sunday", "zondag"].includes(d)) return "sunday";
  return d;
}

function mergeEventData(events, eventsData) {
  return events.map((event) => {
    const match = eventsData.find(
      (e) =>
        e.name === event.name &&
        normalizeDay(e.day) === normalizeDay(event.day || getDay(event))
    );
    return {
      ...event,
      description: match?.description || "",
      day: match?.day || event.day || getDay(event),
    };
  });
}

const getDay = (event) => {
  if (event.day) return event.day;
  if (event.time?.toLowerCase().includes("sunday")) return "Sunday";
  return "Saturday";
};

const parseTime = (str) => {
  const match = str.match(/(\d{1,2}:\d{2})[–-](\d{1,2}:\d{2})/);
  if (!match) return [0, 0];
  const [h1, m1] = match[1].split(":").map(Number);
  const [h2, m2] = match[2].split(":").map(Number);
  return [h1 * 60 + m1, h2 * 60 + m2];
};

const DAY_START = 10 * 60;
const DAY_END = 23.75 * 60;
const TOTAL_MINUTES = DAY_END - DAY_START;

function getEventIcon(event) {
  const lower = event.name?.toLowerCase();
  if (lower.includes("dj")) return <Music className="h-5 w-5 mr-1" />;
  if (lower.includes("special"))
    return <Star className="h-5 w-5 mr-1 text-yellow-400" />;
  if (lower.includes("workshop")) return <Users className="h-5 w-5 mr-1" />;
  if (lower.includes("meeting")) return <Calendar className="h-5 w-5 mr-1" />;
  return <PartyPopper className="h-5 w-5 mr-1" />;
}

function getDayKey(day) {
  const d = day?.toLowerCase();
  if (d === "saturday" || d === "zaterdag") return "saturday";
  if (d === "sunday" || d === "zondag") return "sunday";
  return "saturday";
}

export default function EventBlock({ language = "en" }) {
  const t = getTranslations(language);
  const mergedEvents = mergeEventData(events, t.eventsData);
  const [showGenres, setShowGenres] = useState(false);

  const [dayKey, setDayKey] = useState("saturday");
  const [genre, setGenre] = useState("all");
  const timelineWidth = 3000;
  const slots = Math.round((DAY_END - DAY_START) / 30) + 1;
  const [showSlots, setShowSlots] = useState(Array(slots).fill(false));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const timelineRef = useRef();

  const STAGES = Array.from(
    new Set(mergedEvents.filter((e) => e.stage).map((e) => e.stage))
  );

  const GENRES = [
    "all",
    ...Array.from(
      new Set(mergedEvents.filter((e) => e.genre).map((e) => e.genre))
    ),
  ];

  useEffect(() => {
    setShowSlots(Array(slots).fill(false));
    let i = 0;
    const interval = setInterval(() => {
      setShowSlots((prev) => {
        const next = [...prev];
        if (i < slots) next[i] = true;
        return next;
      });
      i++;
      if (i >= slots) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [dayKey, slots, genre]);

  useEffect(() => {
    if (!selectedEvent) return;
    const onKey = (e) => e.key === "Escape" && setSelectedEvent(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedEvent]);

  const dayEvents = mergedEvents
    .filter((e) => {
      const eventDayKey = getDayKey(e.day || getDay(e));
      return eventDayKey === dayKey;
    })
    .filter((e) => e.stage && e.time)
    .filter((e) => genre === "all" || e.genre === genre)
    .map((e) => ({
      ...e,
      timeRange: parseTime(e.time),
    }));

  return (
    <div className="p-6 text-black dark:text-white max-w-full">
      <h2 className="text-3xl font-bold mb-4 uppercase text-red-600 dark:text-red-400">
        {t.events.title}
      </h2>
      <div className="mb-6 flex gap-2 flex-wrap">
        {Object.entries(t.events.days).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setDayKey(key)}
            className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-200 ${
              dayKey === key
                ? "bg-red-600 text-white dark:bg-red-700"
                : "bg-gray-100 dark:bg-gray-800 text-sky-700 dark:text-sky-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-200 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 ml-4"
          onClick={() => setShowGenres((v) => !v)}
        >
          {showGenres ? "Hide genres" : "Show genres"}
        </button>
        {showGenres && (
          <div className="flex flex-wrap gap-2 ml-4">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-200
        ${
          genre === g
            ? "bg-red-600 text-white dark:bg-red-700"
            : "bg-gray-100 dark:bg-gray-800 text-sky-700 dark:text-sky-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
                style={{ minWidth: 90 }}
              >
                {g === "all" ? "All genres" : g}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="border rounded-2xl bg-white dark:bg-gray-900 shadow-lg p-4 overflow-x-auto relative"
        ref={timelineRef}
        style={{ position: "relative" }}
      >
        <div
          className="relative"
          style={{ width: timelineWidth, height: 24, marginLeft: 112 }}
        >
          {Array.from({ length: slots }, (_, i) => {
            const totalMinutes = DAY_START + i * 30;
            const hour = Math.floor(totalMinutes / 60);
            const min = totalMinutes % 60;
            const label = `${hour}:${min === 0 ? "00" : "30"}`;
            return (
              <span
                key={label}
                className="absolute text-xs text-gray-400 font-mono min-w-10 text-center"
                style={{
                  left: `${(i / (slots - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {label}
              </span>
            );
          })}
        </div>

        <div
          className="relative"
          style={{ minWidth: timelineWidth, marginLeft: 112 }}
        >
          {Array.from({ length: slots }, (_, i) => (
            <div
              key={`grid-${i}`}
              className={`absolute top-0 h-full w-px ${
                i === 0 ? "bg-transparent" : "bg-gray-200 dark:bg-gray-700"
              }`}
              style={{
                left: `${(i / (slots - 1)) * 100}%`,
                opacity: showSlots[i] ? 1 : 0,
                transform: showSlots[i] ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            />
          ))}

          {STAGES.map((stage) => (
            <div
              key={stage}
              className="flex items-center mb-8 last:mb-0 relative"
              style={{ height: 70 }}
            >
              <div className="w-28 text-right pr-4 text-sm font-semibold text-sky-700 dark:text-sky-400 absolute left-[-112px] top-1/2 -translate-y-1/2">
                {stage}
              </div>
              <div className="flex-1 relative" style={{ height: 60 }}>
                {dayEvents
                  .filter((e) => e.stage === stage)
                  .map((event, idx) => {
                    const [start, end] = event.timeRange;
                    const left =
                      ((start - DAY_START) / TOTAL_MINUTES) * timelineWidth;
                    const width =
                      ((end - start) / TOTAL_MINUTES) * timelineWidth;
                    return (
                      <div
                        key={event.name + idx}
                        className="absolute flex items-center h-12 rounded-full bg-red-600/90 dark:bg-red-700/90 text-white shadow-lg overflow-hidden cursor-pointer hover:scale-[1.03] transition-all duration-200"
                        style={{
                          left,
                          width,
                          minWidth: 90,
                          top: 8,
                          zIndex: 2,
                        }}
                        title={event.name}
                        tabIndex={0}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {event.image && (
                          <img
                            src={`/${event.image}`}
                            alt={event.name}
                            className="h-12 w-12 object-cover rounded-full border-2 border-white mr-2"
                          />
                        )}
                        <span className="flex items-center truncate pr-4">
                          {getEventIcon(event)}
                          <span className="font-semibold text-base truncate">
                            {event.name}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                <div
                  className="absolute left-0 top-1/2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2 z-0"
                  style={{ width: timelineWidth }}
                />
              </div>
            </div>
          ))}

          {selectedEvent && (
            <div
              className="fixed left-1/2 top-1/2 z-50"
              style={{
                transform: "translate(-50%, -50%)",
                minWidth: 320,
                maxWidth: 400,
                width: "90vw",
                pointerEvents: "auto",
              }}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  onClick={() => setSelectedEvent(null)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center mb-3">
                  {selectedEvent.image && (
                    <img
                      src={`/${selectedEvent.image}`}
                      alt={selectedEvent.name}
                      className="h-14 w-14 object-cover rounded-full border-2 border-white mr-3"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      {getEventIcon(selectedEvent)}
                      <span className="font-bold text-lg">
                        {selectedEvent.name}
                      </span>
                    </div>
                    {selectedEvent.shortDescription && (
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {selectedEvent.shortDescription}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">{t.events.modal.stage}</span>{" "}
                  {selectedEvent.stage}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">{t.events.modal.time}</span>{" "}
                  {selectedEvent.time}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">
                    {t.events.days[getDayKey(selectedEvent.day)] ||
                      selectedEvent.day}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Genre:</span>{" "}
                  {selectedEvent.genre}
                </div>
                {selectedEvent.description && (
                  <div className="mb-2">{selectedEvent.description}</div>
                )}
                {selectedEvent.video && (
                  <div className="mt-3">
                    <iframe
                      width="100%"
                      height="200"
                      src={selectedEvent.video.replace("watch?v=", "embed/")}
                      title={selectedEvent.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
