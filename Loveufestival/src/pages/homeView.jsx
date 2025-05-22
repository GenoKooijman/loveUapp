import { useState } from "react";
import logoBlack from "../assets/logo_black.svg";
import logoWhite from "../assets/logo_white.svg";

export default function HomeView({ theme }) {
  const [modalOpen, setModalOpen] = useState(false);

  const newsletter = {
    image: theme === "dark" ? logoWhite : logoBlack,
    title: "Festival Update: New Artists Announced!",
    description:
      "Check out the latest additions to our lineup and what to expect this year.",
    fullText:
      "We are thrilled to announce several new artists joining LoveUfestival 2025! Stay tuned for more updates and exclusive interviews with the performers. Don't miss out on the fun and excitement!",
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mt-4">
      <h1 className="text-3xl text-center text-black dark:text-white font-bold mb-4">
        Welcome to LoveUfestival!
      </h1>
      <img
        src={theme === "dark" ? logoWhite : logoBlack}
        alt="Festival Logo"
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-lg relative animate-modal-in"
            onClick={(e) => e.stopPropagation()}
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
