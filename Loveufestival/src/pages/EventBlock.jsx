import { useState } from 'react'
import events from '../data/Events.json'

const STAGES = Array.from(
  new Set(events.filter(e => e.stage).map(e => e.stage))
);

const getDay = (event) => {
  if (event.day) return event.day;
  if (event.time?.toLowerCase().includes('sunday')) return 'Sunday';
  return 'Saturday';
};

const parseTime = (str) => {
  const match = str.match(/(\d{1,2}:\d{2})[–-](\d{1,2}:\d{2})/);
  if (!match) return [0, 0];
  const [h1, m1] = match[1].split(':').map(Number);
  const [h2, m2] = match[2].split(':').map(Number);
  return [h1 * 60 + m1, h2 * 60 + m2];
};

const DAY_START = 10 * 60;
const DAY_END = 23.75 * 60;   
const TOTAL_MINUTES = DAY_END - DAY_START;

export default function EventBlock() {
  const [day, setDay] = useState('Saturday');
  const timelineWidth = 3000;
  const slots = ((DAY_END - DAY_START) / 30) + 1;

  const dayEvents = events
    .filter(e => getDay(e) === day && e.stage && e.time)
    .map(e => ({
      ...e,
      timeRange: parseTime(e.time),
    }));

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 max-w-full">
      <h2 className="text-3xl font-bold mb-4 uppercase">events</h2>
      <div className="mb-6 flex gap-2">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${day === 'Saturday' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setDay('Saturday')}
        >
          Saturday
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${day === 'Sunday' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setDay('Sunday')}
        >
          Sunday
        </button>
      </div>
      <div className="border rounded-xl bg-white dark:bg-gray-900 shadow p-4 overflow-x-auto">
        {/* Time axis */}
        <div style={{ position: 'relative', width: timelineWidth, height: 24, marginLeft: 112 }}>
          {Array.from({ length: slots }, (_, i) => {
            const totalMinutes = DAY_START + i * 30;
            const hour = Math.floor(totalMinutes / 60);
            const min = totalMinutes % 60;
            const label = `${hour}:${min === 0 ? '00' : '30'}`;
            return (
              <span
                key={label}
                style={{
                  position: 'absolute',
                  left: `${(i / (slots - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                  fontSize: 12,
                  color: '#6b7280',
                  fontFamily: 'monospace',
                  minWidth: 40,
                  textAlign: 'center',
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
        <div style={{ minWidth: timelineWidth, marginLeft: 112 }}>
          {STAGES.map(stage => (
            <div key={stage} className="flex items-center mb-8 last:mb-0 relative" style={{ height: 70 }}>
              <div className="w-28 text-right pr-4 text-sm font-semibold text-indigo-700 dark:text-indigo-300 absolute left-[-112px] top-1/2 -translate-y-1/2">
                {stage}
              </div>
              <div className="flex-1 relative" style={{ height: 60 }}>
                {/* Render events for this stage */}
                {dayEvents.filter(e => e.stage === stage).map((event, idx) => {
                  const [start, end] = event.timeRange;
                  const left = ((start - DAY_START) / TOTAL_MINUTES) * timelineWidth;
                  const width = ((end - start) / TOTAL_MINUTES) * timelineWidth;
                  return (
                    <div
                      key={event.name + idx}
                      className="absolute flex items-center h-12 rounded-full shadow-lg bg-indigo-500/90 dark:bg-indigo-700/90 text-white overflow-hidden cursor-pointer hover:scale-105 transition"
                      style={{
                        left,
                        width,
                        minWidth: 90,
                        maxWidth: '100%',
                        top: 8,
                        zIndex: 2,
                      }}
                      tabIndex={0}
                      title={event.name}
                    >
                      {event.image && (
                        <img
                          src={`/images/${event.image}`}
                          alt={event.name}
                          className="h-12 w-12 object-cover rounded-full border-2 border-white mr-2"
                          style={{ flexShrink: 0 }}
                        />
                      )}
                      <span className="font-semibold text-base truncate pr-4">{event.name}</span>
                    </div>
                  );
                })}
                {/* Timeline background */}
                <div
                  className="absolute left-0 top-1/2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2 z-0"
                  style={{ width: timelineWidth }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
