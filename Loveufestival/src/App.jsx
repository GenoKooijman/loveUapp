import { useState } from 'react'
import { useTheme } from 'next-themes'
import './App.css'
import { Search, Map, Star, Utensils, Music2, Sun, Moon } from 'lucide-react';

export default function LoveUfestivalApp() {
  const [active, setActive] = useState('map');
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-900 px-4 py-2 shadow-md flex items-center">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full w-full px-4 py-2">
          <Search className="text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search in LoveUfestival..."
            className="bg-transparent w-full outline-none text-gray-900 dark:text-gray-100"
          />
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Map Image */}
      <div className="flex-1 overflow-auto relative pb-24">
        <img
          src="/efteling.jpg"
          alt="LoveUfestival Map"
          className="w-full object-cover h-full"
        />
        
        {/* Floating Bottom Navigation */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-md mx-auto z-20">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full flex justify-around items-center py-2 px-2 border border-gray-200 dark:border-gray-700">
            <button
              className="flex flex-col items-center"
              onClick={() => setActive('map')}
            >
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
                  active === 'map'
                    ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 font-bold shadow'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Map size={22} />
              </span>
              <span
                className={`text-xs mt-1 transition ${
                  active === 'map'
                    ? 'text-red-700 dark:text-red-200 font-bold'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Map
              </span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => setActive('favourites')}
            >
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
                  active === 'favourites'
                    ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 font-bold shadow'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Star size={22} />
              </span>
              <span
                className={`text-xs mt-1 transition ${
                  active === 'favourites'
                    ? 'text-red-700 dark:text-red-200 font-bold'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Favourites
              </span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => setActive('attractions')}
            >
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
                  active === 'attractions'
                    ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 font-bold shadow'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Music2 size={22} />
              </span>
              <span
                className={`text-xs mt-1 transition ${
                  active === 'attractions'
                    ? 'text-red-700 dark:text-red-200 font-bold'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Performances
              </span>
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => setActive('food')}
            >
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
                  active === 'food'
                    ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 font-bold shadow'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Utensils size={22} />
              </span>
              <span
                className={`text-xs mt-1 transition ${
                  active === 'food'
                    ? 'text-red-700 dark:text-red-200 font-bold'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Food
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
