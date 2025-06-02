import logoBlack from "../assets/logo_black.svg";
import logoWhite from "../assets/logo_white.svg";
import { useState } from "react";
import en from "../locales/en.json";
import nl from "../locales/nl.json";
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

const ICONS = {
  generalContact: <Info className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
  accessibility: <MapPin className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
  lockers: <Lock className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
  faq: <HelpCircle className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
  goldenGlu: <Star className="w-4 h-4 mr-2 text-[var(--color-accent)]" />,
};

function getLocale(language) {
  return language === "nl" ? nl : en;
}

function renderSectionContent(sectionKey, content, language) {
  switch (sectionKey) {
    case "generalContact":
      return (
        <>
          <p>{content.description}</p>
          <div className="mt-4 space-y-1">
            <p>
              <MapPin className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
              <strong>{content.location}</strong> {content.locationValue}
            </p>
            <p>
              <Navigation className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
              <strong>{content.navigationAddress}</strong> {content.navigationAddressValue}
            </p>
            <p>
              <Calendar className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
              <strong>{content.date}</strong> {content.dateValue}
            </p>
            <p>
              <Clock className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
              <strong>{content.time}</strong> {content.timeValue}
            </p>
          </div>
        </>
      );
    case "accessibility":
      return (
        <>
          <p>
            <Bike className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.bike}</strong> {content.bikeValue}
          </p>
          <p>
            <Car className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.car}</strong> {content.carValue}
          </p>
          <p>
            <TrainFront className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.publicTransport}</strong>{" "}
            <a
              className="underline text-[var(--color-accent)]"
              href="https://9292.nl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.publicTransportValue}
            </a>
          </p>
          <p>
            <BusFront className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.shuttleBus}</strong> {content.shuttleBusValue}
          </p>
          <p>
            <CarFront className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.taxi}</strong> {content.taxiValue}
          </p>
        </>
      );
    case "lockers":
      return (
        <>
          <p>
            <Lock className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            {content.lockersAvailable}
          </p>
          <p>
            <KeyRound className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            {content.unlimitedAccess}
          </p>
          <p>
            <ShieldCheck className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            {content.noOnlineReservation}
          </p>
        </>
      );
    case "faq":
      return (
        <>
          <p>
            <Pill className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.medication}</strong> {content.medicationValue}
          </p>
          <p>
            <DoorOpen className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.leaving}</strong> {content.leavingValue}
          </p>
          <p>
            <Lock className="inline w-4 h-4 mr-1 text-[var(--color-accent)]" />
            <strong>{content.lockers}</strong> {content.lockersValue}
          </p>
        </>
      );
    case "goldenGlu":
      return (
        <>
          <p>
            <BadgeCheck className="inline w-4 h-4 mr-1 text-yellow-500" />
            {content.description}
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <Toilet className="inline w-4 h-4 mr-1 text-yellow-500" />
              {content.toilet}
            </li>
            {content.fastService && (
              <li>
                <UserCheck className="inline w-4 h-4 mr-1 text-yellow-500" />
                {content.fastService}
              </li>
            )}
          </ul>
        </>
      );
    default:
      return null;
  }
}

export default function MoreView({ theme, language = "en" }) {
  const t = getLocale(language);
  const sectionKeys = Object.keys(t.more.sections);
  const [openStates, setOpenStates] = useState(sectionKeys.map(() => false));

  const toggleSection = (idx) => {
    setOpenStates((prev) => prev.map((open, i) => (i === idx ? !open : open)));
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-secondary)] dark:text-sky-400">
          {t.more.festivalInformation}
        </h1>
        <img
          src={theme === "dark" ? logoWhite : logoBlack}
          alt="Festival Logo"
          className="w-48 mx-auto mt-4 mb-6"
        />
      </div>

      {sectionKeys.map((key, idx) => {
        const section = t.more.sections[key];
        return (
          <div
            key={key}
            className="border border-[var(--color-accent)] rounded-xl mb-4 bg-white dark:bg-gray-900 shadow transition-all"
          >
            <button
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-lg font-semibold text-[var(--color-secondary)] dark:text-sky-400 hover:bg-[var(--color-accent)] hover:text-white dark:hover:bg-sky-600 transition-colors rounded-xl"
            >
              <div className="flex items-center">
                {ICONS[key]}
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
                {renderSectionContent(key, section.content, language)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



