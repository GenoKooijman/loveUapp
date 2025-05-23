import logoBlack from '../assets/logo_black.svg';
import { useState } from 'react';

export default function MoreView() {
  const [openStates, setOpenStates] = useState([false, false, false]);

  const toggleSection = idx => {
    setOpenStates(states =>
      states.map((open, i) => (i === idx ? !open : open))
    );
  };

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <h2 className="text-xl text-center font-bold mb-2">Welcome!</h2>
      <img src={logoBlack} alt="logoblack" className="w-screen h-32 mb-4" />

      {/* About the Festival Section */}
      <div className="max-w-md mx-auto mt-4 border rounded ml-2 mr-2 text-center mb-4">
        <button
          onClick={() => toggleSection(0)}
          className="text-black font-semibold hover:underline focus:outline-none"
        >
          About the Festival
        </button>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            openStates[0] ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 text-black rounded-lg shadow-xl">
            This is the first info section. You can put any content here about the festival.
          </div>
        </div>
      </div>

      {/* yayaya Section */}
      <div className="max-w-md mx-auto mt-4 border rounded ml-2 mr-2 text-center mb-4">
        <button
          onClick={() => toggleSection(1)}
          className="text-black font-semibold hover:underline focus:outline-none"
        >
          yayaya
        </button>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            openStates[1] ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 text-black rounded-lg shadow-xl">
            {/* Add custom content for yayaya here */}
          </div>
        </div>
      </div>

      {/* Contact & Support Section */}
      <div className="max-w-md mx-auto mt-4 border rounded ml-2 mr-2 text-center mb-4">
        <button
          onClick={() => toggleSection(2)}
          className="text-black font-semibold hover:underline focus:outline-none"
        >
          Contact & Support
        </button>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            openStates[2] ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 text-black rounded-lg shadow-xl">
            This is the third info section. Customize as you like! For example, add contact details.
          </div>
        </div>
      </div>
    </div>
  );
}
