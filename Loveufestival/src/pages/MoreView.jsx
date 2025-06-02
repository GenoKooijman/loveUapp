import logoBlack from "../assets/logo_black.svg";
import logoWhite from "../assets/logo_white.svg";
import { useState } from "react";
import {
  Info,
  MapPin,
  Lock,
  HelpCircle,
  Star,
  Bike,
  Car,
  BusFront,
  TrainFront,
  Clock,
  Calendar,
  KeyRound,
  Pill,
  DoorOpen,
  ShieldCheck,
  UserCheck,
  Toilet,
  BadgeCheck,
  Navigation,
  CarFront,
} from "lucide-react";

const SECTIONS = [
  {
    title: "General & Contact",
    icon: <Info className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
    content: (
      <>
        <p>
          The ❤️U Festival is for (new) students in the Utrecht region and complements UIT.
        </p>
        <div className="mt-4 space-y-1">
          <p>
            <MapPin className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>Location:</strong> Strijkviertel, Utrecht
          </p>
          <p>
            <Navigation className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>Navigation address:</strong> Strijkviertelweg, Utrecht
          </p>
          <p>
            <Calendar className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>Date:</strong> Saturday, September 6, 2025
          </p>
          <p>
            <Clock className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>Time:</strong> 12:00 - 23:00
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Accessibility",
    icon: <MapPin className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
    content: (
      <>
        <p>
          <Bike className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Bike:</strong> Free bike parking available.
        </p>
        <p>
          <Car className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Car:</strong> Parking at P+R Papendorp with online ticket or on-site (PIN ONLY, FIRST COME FIRST SERVED).
        </p>
        <p>
          <TrainFront className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Public Transport:</strong> Plan your trip via{" "}
          <a
            className="underline text-[var(--color-accent)]"
            href="https://9292.nl"
            target="_blank"
            rel="noopener noreferrer"
          >
            9292.nl
          </a>
          .
        </p>
        <p>
          <BusFront className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Shuttle Bus:</strong> Free from Utrecht Central between 12:00–19:00 (going) and from 21:00 (return).
        </p>
        <p>
          <CarFront className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Taxi & Kiss & Ride:</strong> Follow the signs at Strijkviertel, De Meern.
        </p>
      </>
    ),
  },
  {
    title: "Lockers",
    icon: <Lock className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
    content: (
      <>
        <p>
          <Lock className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          Lockers are available at the festival. Suitable for 3 to 4 coats.
        </p>
        <p>
          <KeyRound className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          You can open and close your locker unlimited times.
        </p>
        <p>
          <ShieldCheck className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          Note: You cannot reserve lockers online.
        </p>
      </>
    ),
  },
  {
    title: "FAQ",
    icon: <HelpCircle className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
    content: (
      <>
        <p>
          <Pill className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Medication:</strong> Allowed with a doctor's note. May be kept in custody at the first aid station.
        </p>
        <p>
          <DoorOpen className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Leaving temporarily:</strong> Not allowed due to safety. Please enjoy the festival area!
        </p>
        <p>
          <Lock className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
          <strong>Lockers:</strong> Medium and large lockers available.
        </p>
      </>
    ),
  },
  {
    title: "Golden GLU",
    icon: <Star className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
    content: (
      <>
        <p>
          <BadgeCheck className="inline w-4 h-4 mr-1 text-yellow-500" />
          GLU students have special privileges thanks to their golden wristband:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <Toilet className="inline w-4 h-4 mr-1 text-yellow-500" />
            Access to golden toilets
          </li>
          <li>
            <UserCheck className="inline w-4 h-4 mr-1 text-yellow-500" />
            Fast service at marked bars
          </li>
        </ul>
      </>
    ),
  },
];

export default function MoreView({ theme }) {
  const [openStates, setOpenStates] = useState(SECTIONS.map(() => false));

  const toggleSection = (idx) => {
    setOpenStates((prev) => prev.map((open, i) => (i === idx ? !open : open)));
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl uppercase font-bold text-[var(--color-secondary)] dark:text-sky-400">
          Festival Information
        </h1>
        <img
          src={theme === "dark" ? logoWhite : logoBlack}
          alt="Festival Logo"
          className="w-48 mx-auto mt-4 mb-6"
        />
      </div>

      {SECTIONS.map((section, idx) => (
        <div
          key={idx}
          className="border border-[var(--color-accent)] rounded-xl mb-4 bg-white dark:bg-gray-900 shadow transition-all"
        >
          <button
            onClick={() => toggleSection(idx)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-lg font-semibold text-[var(--color-secondary)] dark:text-sky-400 hover:bg-[var(--color-accent)] hover:text-white dark:hover:bg-sky-600 transition-colors rounded-xl"
          >
            <div className="flex items-center">
              {section.icon}
              {section.title}
            </div>
            <span className="text-[var(--color-accent)] dark:text-sky-400">
              {openStates[idx] ? "−" : "+"}
            </span>
          </button>
          <div
            className={`px-4 pb-4 transition-all duration-500 overflow-hidden ${
              openStates[idx]
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}



