import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HomeView = lazy(() => import("./pages/homeView"));
const MapView = lazy(() => import("./pages/mapView"));
const MoreView = lazy(() => import("./pages/MoreView"));
const EventsView = lazy(() => import("./pages/EventsView"));

const getSystemTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const getSystemLanguage = () => {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("nl")) return "nl";
  return "en";
};

export default function LoveUfestivalApp() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || getSystemTheme()
  );
  const [language, setLanguage] = useState(() =>
    localStorage.getItem("language") || getSystemLanguage()
  );
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const systemTheme = e.matches ? "dark" : "light";
      const userTheme = localStorage.getItem("theme");
      if (!userTheme) setTheme(systemTheme);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const renderContent = () => {
    switch (active) {
      case "home":
        return <HomeView theme={theme} language={language} />;
      case "map":
        return <MapView theme={theme} language={language} />;
      case "attractions":
        return <EventsView theme={theme} language={language} />;
      case "More":
        return <MoreView theme={theme} language={language} />;
      default:
        return <HomeView theme={theme} language={language} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
      <div className="flex-1 overflow-auto relative pb-24">
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          {renderContent()}
        </Suspense>
        <Footer active={active} setActive={setActive} />
      </div>
    </div>
  );
}



