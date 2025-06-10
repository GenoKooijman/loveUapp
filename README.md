# loveUFestivalApp

loveUFestivalApp is a modern, mobile-friendly web app for the ❤️U Festival in Utrecht. It provides festival visitors with an interactive map, real-time event schedule, artist information, notifications, and essential festival info—all in both English and Dutch.

## Features

- **Interactive Map:** Explore the festival grounds, find bars, stages, food, toilets, lockers, and more.
- **Event Schedule:** Browse the full line-up, filter by day, stage, or genre, and view artist details.
- **Notifications:** Get notified about upcoming performances and important festival updates.
- **Multilingual:** Switch seamlessly between English and Dutch.
- **Dark Mode:** Enjoy a visually comfortable experience day or night.
- **PWA Support:** Install the app on your device for offline access and a native-like experience.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) (for interactive maps)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/loveUFestivalApp.git
   cd loveUFestivalApp
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Project Structure

```
loveUFestivalApp/
├── public/           # Static assets (images, icons)
├── src/
│   ├── assets/       # SVGs, images
│   ├── components/   # Reusable React components
│   ├── data/         # Event and map data (JSON)
│   ├── locales/      # Translations (en, nl)
│   ├── pages/        # Main app views (Home, Map, Events, Info)
│   ├── App.jsx       # App entry point
│   └── main.jsx      # React DOM bootstrap
├── index.html
├── package.json
└── vite.config.js
```

---

Made with ❤️ for the Utrecht student community.
