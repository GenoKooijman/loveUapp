import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Search, Map, Star, Utensils, Music2, Sun, Moon } from "lucide-react";

const MapView = lazy(() => import("./components/mapView"));
const FavouritesView = lazy(() => import("./components/FavouritesView"));
const PerformancesView = lazy(() => import("./components/PerformancesView"));
const FoodView = lazy(() => import("./components/FoodView"));

export default function LoveUfestivalApp() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [active, setActive] = useState("map");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const renderContent = () => {
    switch (active) {
      case "map":
        return <MapView />;
      case "favourites":
        return <FavouritesView />;
      case "attractions":
        return <PerformancesView />;
      case "food":
        return <FoodView />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-900 px-4 py-2 shadow-md flex items-center">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full w-full px-4 py-2">
          <Search className="text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search in LoveUfestival..."
            className="bg-transparent w-full outline-none text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto relative pb-24">
        {renderContent()}

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-md mx-auto z-20">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full flex justify-around items-center py-2 px-2 border border-gray-200 dark:border-gray-700">
            {[
              { id: "map", icon: <Map size={22} />, label: "Map" },
              {
                id: "favourites",
                icon: <Star size={22} />,
                label: "Favourites",
              },
              {
                id: "attractions",
                icon: <Music2 size={22} />,
                label: "Performances",
              },
              { id: "food", icon: <Utensils size={22} />, label: "Food" },
            ].map((tab) => (
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
      </div>
    </div>
  );
}
