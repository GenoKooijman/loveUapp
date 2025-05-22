import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HomeView = lazy(() => import("./pages/homeView"));
const MapView = lazy(() => import("./pages/MapView"));
const MoreView = lazy(() => import("./pages/MoreView"));
const PerformancesView = lazy(() => import("./pages/PerformancesView"));
const FoodView = lazy(() => import("./pages/FoodView"));

export default function LoveUfestivalApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const renderContent = () => {
    switch (active) {
      case "home":
        return <HomeView theme={theme} />;
      case "map":
        return <MapView />;
      case "attractions":
        return <PerformancesView />;
      case "food":
        return <FoodView />;
      case "More":
        return <MoreView />;
      default:
        return <HomeView theme={theme} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="flex-1 overflow-auto relative pb-24">
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          {renderContent()}
        </Suspense>
        <Footer active={active} setActive={setActive} />
      </div>
    </div>
  );
}


