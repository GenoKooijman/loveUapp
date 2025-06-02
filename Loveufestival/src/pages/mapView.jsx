import { MapContainer, Marker, ImageOverlay, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import map from "../assets/kaart_festival_no_markers.svg";
import markerBar from "../assets/marker_bar.svg";
import markerStage1 from "../assets/marker_stage1_ponton.svg";
import markerStage2 from "../assets/marker_stage2_the_lake.svg";
import markerStage3 from "../assets/marker_stage3_the_club.svg";
import markerStage4 from "../assets/marker_stage4_hangar.svg";
import markerToilet from "../assets/marker_toilet.svg";
import markerEntranceExit from "../assets/marker_entrance_exit.svg";
import markerFirstAid from "../assets/marker_first_aid.svg";
import markerFood from "../assets/marker_food.svg";
import markerIceCream from "../assets/marker_ice_cream.svg";
import markerLocker from "../assets/marker_locker.svg";
import markerMerchandise from "../assets/marker_merchandise.svg";
import events from "../data/events.json";

// Hide the attribution control (Leaflet link)
function HideAttribution() {
  const map = useMap();
  map.attributionControl.remove();
  return null;
}

const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [16, 32],
    iconAnchor: [8, 16],
    popupAnchor: [0, -32],
    className: "",
  });

const imageBounds = [
  [-0.2215, -78.5145], // Southwest corner (lat, lng)
  [-0.2195, -78.5110], // Northeast corner (lat, lng)
];

const markers = [
  { id: "bar", img: markerBar, alt: "Bar", pos: [-0.22098, -78.51408], drinks: ["Beer", "Wine", "Soft Drinks"] },
  { id: "bar2", img: markerBar, alt: "Bar", pos: [-0.22032, -78.5127], drinks: ["Cocktails", "Mocktails", "Water"] },
  { id: "bar3", img: markerBar, alt: "Bar", pos: [-0.220117, -78.5120], drinks: ["Craft Beer", "Cider", "Soda"] },
  { id: "bar4", img: markerBar, alt: "Bar", pos: [-0.22005, -78.5117], drinks: ["Gin & Tonic", "Rum Cola", "Juice"] },
  { id: "stage1", img: markerStage1, alt: "Stage 1: Ponton", pos: [-0.2207, -78.5137], stage: "Poton" },
  { id: "stage2", img: markerStage2, alt: "Stage 2: The Lake", pos: [-0.22042, -78.51265], stage: "The Lake" },
  { id: "stage3", img: markerStage3, alt: "Stage 3: The Club", pos: [-0.22030, -78.5121], stage: "The Club" },
  { id: "stage4", img: markerStage4, alt: "Stage 4: Hanggar", pos: [-0.21985, -78.5114], stage: "Hanggar" },
  { id: "toilet", img: markerToilet, alt: "Toilet", pos: [-0.22005, -78.5128] },
  { id: "toilet2", img: markerToilet, alt: "Toilet", pos: [-0.22002, -78.51127] },
  { id: "toilet3", img: markerToilet, alt: "Toilet", pos: [-0.22105, -78.5142] },
  { id: "entranceexit", img: markerEntranceExit, alt: "Entrance/Exit", pos: [-0.22121, -78.5121] },
  { id: "firstaid", img: markerFirstAid, alt: "First Aid", pos: [-0.22012, -78.51385] },
  { id: "food", img: markerFood, alt: "Food", pos: [-0.2204, -78.513255], foods: ["Burgers", "Fries", "Salads"] },
  { id: "food2", img: markerFood, alt: "Food", pos: [-0.2208, -78.51405], foods: ["Pizza", "Falafel", "Wraps"] },
  { id: "icecream", img: markerIceCream, alt: "Ice Cream", pos: [-0.22038, -78.51314], flavors: ["Vanilla", "Chocolate", "Strawberry"] },
  { id: "icecream2", img: markerIceCream, alt: "Ice Cream", pos: [-0.2202, -78.5123], flavors: ["Mango", "Lemon", "Coconut"] },
  { id: "icecream3", img: markerIceCream, alt: "Ice Cream", pos: [-0.21985, -78.5116], flavors: ["Pistachio", "Banana", "Caramel"] },
  { id: "icecream4", img: markerIceCream, alt: "Ice Cream", pos: [-0.22085, -78.51358], flavors: ["Cookies", "Berry", "Mint"] },
  { id: "locker", img: markerLocker, alt: "Locker", pos: [-0.22113, -78.51343] },
  { id: "locker2", img: markerLocker, alt: "Locker", pos: [-0.22115, -78.51365] },
  { id: "merchandise", img: markerMerchandise, alt: "Merchandise", pos: [-0.22035, -78.51339] },
  { id: "merchandise2", img: markerMerchandise, alt: "Merchandise", pos: [-0.2211, -78.51385] },
  { id: "merchandise3", img: markerMerchandise, alt: "Merchandise", pos: [-0.22033, -78.5122] },
];

function getArtistsForStage(stage) {
  const filtered = events
    .filter(
      (e) =>
        e.stage &&
        e.stage.toLowerCase() === stage.toLowerCase() &&
        e.name &&
        e.time
    )
    .slice(0, 3);
  return filtered;
}

function getPopupContent(marker) {
  if (marker.stage) {
    const artists = getArtistsForStage(marker.stage);
    return (
      <>
        <h2 className="text-lg font-bold mb-2">{marker.alt}</h2>
        {artists.length > 0 ? (
          <ul className="mb-2">
            {artists.map((artist) => (
              <li key={artist.name} className="mb-1">
                <span className="font-semibold">{artist.name}</span>
                {artist.time && (
                  <span className="text-xs text-gray-500 ml-2">{artist.time}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-2">No artist info available.</p>
        )}
        <p>Click for full line-up in the Events tab!</p>
      </>
    );
  }
  // Info for each icon type, with specific food/drink/flavor lists
  switch (marker.id) {
    case "bar":
    case "bar2":
    case "bar3":
    case "bar4":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Bar</h2>
          <p>Drinks available:</p>
          <ul className="mb-2">
            {marker.drinks?.map((drink) => (
              <li key={drink}>• {drink}</li>
            ))}
          </ul>
        </>
      );
    case "food":
    case "food2":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Food</h2>
          <p>Food options:</p>
          <ul className="mb-2">
            {marker.foods?.map((food) => (
              <li key={food}>• {food}</li>
            ))}
          </ul>
        </>
      );
    case "icecream":
    case "icecream2":
    case "icecream3":
    case "icecream4":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Ice Cream</h2>
          <p>Flavors available:</p>
          <ul className="mb-2">
            {marker.flavors?.map((flavor) => (
              <li key={flavor}>• {flavor}</li>
            ))}
          </ul>
        </>
      );
    case "toilet":
    case "toilet2":
    case "toilet3":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Toilet</h2>
          <p>Restrooms are available here for your convenience.</p>
        </>
      );
    case "entranceexit":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Entrance / Exit</h2>
          <p>This is the main entrance and exit of the festival grounds.</p>
        </>
      );
    case "firstaid":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">First Aid</h2>
          <p>Need help? Visit the first aid station for medical assistance.</p>
        </>
      );
    case "locker":
    case "locker2":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Locker</h2>
          <p>Store your belongings safely in a locker.</p>
        </>
      );
    case "merchandise":
    case "merchandise2":
    case "merchandise3":
      return (
        <>
          <h2 className="text-lg font-bold mb-2">Merchandise</h2>
          <p>Get your official festival merchandise here!</p>
        </>
      );
    default:
      return (
        <>
          <h2 className="text-lg font-bold mb-2">{marker.alt}</h2>
          <p>Info about {marker.alt}.</p>
        </>
      );
  }
}

export default function MapView() {
  return (
    <div className="relative w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[-0.2202, -78.5127]}
          zoom={17}
          minZoom={16}
          maxZoom={20}
          maxBounds={imageBounds}
          maxBoundsViscosity={1.0}
          style={{ height: "100vh", width: "100vw", background: "transparent" }}
          scrollWheelZoom
          doubleClickZoom={false}
          dragging
          zoomControl={false}
        >
          <HideAttribution />
          <ImageOverlay url={map} bounds={imageBounds} />
          {markers.map((marker) => (
              <Marker
              key={marker.id}
              position={marker.pos}
              icon={createIcon(marker.img)}
            >
              <Popup 
                autoPan={true}
                autoPanPadding={[200, 200]}
                keepInView={true}         
                maxWidth={220}
                className="custom-leaflet-popup"
              >
                {getPopupContent(marker)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}


