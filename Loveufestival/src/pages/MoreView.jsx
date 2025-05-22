import logoBlack from '../assets/logo_black.svg';
import { useState } from 'react';

export default function MoreView() {
  const infoSections = [
    {
      title: "About the Festival",
      info: "This is the first info section. You can put any content here about the festival."
    },
    {
      title: "yayaya",
      info: ""
    },
    {
      title: "Contact & Support",
      info: "This is the third info section. Customize as you like! For example, add contact details."
    }
  ];

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
   <div className='border'>
      {infoSections.map((section, idx) => (
        <div className="max-w-md mx-auto mt-4 border rounded ml-2 mr-2 text-center mb-4" key={idx}>
          <button
            onClick={() => toggleSection(idx)}
            className="text-black font-semibold hover:underline focus:outline-none"
          >
            {section.title}
          </button>
          <div
            className={`transition-all duration-500 overflow-hidden ${
              openStates[idx] ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 text-black rounded-lg shadow-xl">
              {section.info}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
