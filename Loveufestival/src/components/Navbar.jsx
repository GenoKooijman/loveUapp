import { Sun, Moon } from "lucide-react";
import en from "../locales/en.json";
import nl from "../locales/nl.json";
import logoBlack from "../assets/logo_black.svg";
import logoWhite from "../assets/logo_white.svg";

function getLocale(language) {
  return language === "nl" ? nl : en;
}

export default function Navbar({ theme, setTheme, language, setLanguage, modalOpen }) {
  const t = getLocale(language);

  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-2 shadow-md flex items-center justify-between">
      <a href="/homeView">
      <img
        src={theme === "dark" ? logoWhite : logoBlack}
        alt="LoveUfestival Logo"
        className="h-8 w-auto mr-4"
        style={{ minWidth: 32 }}  
      />
      </a>
      <div className="flex items-center">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
          aria-label={t.navbar.toggleDarkMode}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => !modalOpen && setLanguage(language === "en" ? "nl" : "en")}
          className="ml-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-200 text-sm"
          disabled={modalOpen}
          style={modalOpen ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          {t.navbar.language}
        </button>
      </div>
    </div>
  );
}


