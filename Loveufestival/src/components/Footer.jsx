import {
  Home as HomeIcon,
  Map,
  CalendarRange,
  Ellipsis,
  Info,
} from "lucide-react";

export default function Footer({ active, setActive }) {
  const tabs = [
    { id: "home", icon: <HomeIcon size={18} />, label: "Home" },
    { id: "map", icon: <Map size={18} />, label: "Map" },
    { id: "attractions", icon: <CalendarRange size={18} />, label: "Events" },
    { id: "More", icon: <Info size={18} />, label: "Info" },
  ];

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[90vw] max-w-xs mx-auto z-20">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg rounded-full flex justify-around items-center py-1 px-1 border border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              className="flex flex-col items-center"
              onClick={() => setActive(tab.id)}
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-red-600 dark:bg-red-700 text-white shadow-md"
                    : "text-sky-700 dark:text-sky-400"
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[10px] mt-0.5 transition-all duration-200 ${
                  isActive
                    ? "text-red-600 dark:text-red-400 font-semibold"
                    : "text-sky-700 dark:text-sky-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


