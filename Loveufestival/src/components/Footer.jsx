import { Home as HomeIcon, Map, Utensils, Ellipsis, CalendarRange } from "lucide-react";

export default function Footer({ active, setActive }) {
  const tabs = [
    { id: "home", icon: <HomeIcon size={22} />, label: "Home" },
    { id: "map", icon: <Map size={22} />, label: "Map" },
    { id: "attractions", icon: <CalendarRange size={22} />, label: "Schedule" },
    { id: "More", icon: <Ellipsis size={22} />, label: "More" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-md mx-auto z-20">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full flex justify-around items-center py-2 px-2 border border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center"
            onClick={() => setActive(tab.id)}
          >
            <span
              className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
                active === tab.id
                  ? "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 font-bold shadow"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-xs mt-1 transition ${
                active === tab.id
                  ? "text-red-700 dark:text-red-200 font-bold"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
