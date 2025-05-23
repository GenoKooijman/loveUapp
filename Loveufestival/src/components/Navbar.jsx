import { Search, Sun, Moon } from "lucide-react";

export default function Navbar({ theme, setTheme, language, setLanguage }) {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-2 shadow-md flex items-center">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full w-full px-4 py-2">
        <Search className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder={language === "en" ? "Search in LoveUfestival..." : "Zoek in LoveUfestival..."}
          className="bg-transparent w-full outline-none text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => setLanguage(language === "en" ? "nl" : "en")}
          className="ml-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-200 text-sm"
        >
          {language.toUpperCase()}
        </button>
      </div>
    </div>
  );
}


