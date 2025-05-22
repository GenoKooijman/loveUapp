import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Search, Map, Star, Utensils, Music2, Sun, Moon, Settings, Ellipsis, Home as HomeIcon } from "lucide-react";

import logoBlack from "./assets/logo_black.svg";
import logoWhite from "./assets/logo_white.svg";

const MapView = lazy(() => import("./pages/mapView"));
const MoreView = lazy(() => import("./pages/MoreView"));
const PerformancesView = lazy(() => import("./pages/PerformancesView"));
const FoodView = lazy(() => import("./pages/FoodView"));

export default function LoveUfestivalApp() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function HomeView() {
    const [modalOpen, setModalOpen] = useState(false);

    const newsletter = {
      image: theme === "dark" ? logoWhite : logoBlack,
      title: "Festival Update: New Artists Announced!",
      description: "Check out the latest additions to our lineup and what to expect this year.",
      fullText: "We are thrilled to announce several new artists joining LoveUfestival 2025! Stay tuned for more updates and exclusive interviews with the performers. Don't miss out on the fun and excitement!"
    };

    return (
      <div className="flex flex-col items-center justify-center h-full mt-4">
        <h1 className="text-3xl text-center text-black dark:text-white font-bold mb-4">
          Welcome to LoveUfestival!
        </h1>
        <img
          src={theme === "dark" ? logoWhite : logoBlack}
          alt="logoBlack"
          className="w-max h-42"
        />
        <h2 className="text-xl pt-8 mb-4">Newsletter</h2>

        <button
          className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-full max-w-md hover:shadow-lg transition mb-4"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={newsletter.image}
            alt="Newsletter"
            className="w-18 h-18 rounded-full mr-4 border-2 border-red-300"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-lg relative
                transition-all duration-300 ease-out
                animate-modal-pop"
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
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-red-300"
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

        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          This is your home page.
        </p>
      </div>
    );
  }

  const renderContent = () => {
    switch (active) {
      case "home":
        return <HomeView />;
      case "map":
        return <MapView />;
      case "attractions":
        return <PerformancesView />;
      case "food":
        return <FoodView />;
      case "More":
        return <MoreView />;
      default:
        return <HomeView />;
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
              { id: "home", icon: <HomeIcon size={22} />, label: "Home" },
              { id: "map", icon: <Map size={22} />, label: "Map" },
              { id: "attractions", icon: <Music2 size={22} />, label: "Performances" },
              { id: "food", icon: <Utensils size={22} />, label: "Food" },
              { id: "More", icon: <Ellipsis size={22} />, label: "More" },
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

