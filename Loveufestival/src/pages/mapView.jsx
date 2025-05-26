import { MapContainer, Marker, ImageOverlay } from "react-leaflet";
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
import { useState } from "react";

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

function MarkerModal({ marker, onClose }) {
  if (!marker) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  switch (marker.id) {
    case "bar":
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center z-10">
            <h2 className="text-2xl font-bold mb-4">Bar</h2>
            <p className="mb-4">This is the bar. Enjoy your drinks!</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      );
    case "stage1":
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center z-10">
            <h2 className="text-2xl font-bold mb-4">Stage 1: Ponton</h2>
            <p className="mb-4">Line-up and info for Stage 1.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      );
    default:
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center z-10">
            <h2 className="text-2xl font-bold mb-4">{marker.alt}</h2>
            <p className="mb-4">Info about {marker.alt}.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      );
  }
}

export default function MapView() {
  const [openMarker, setOpenMarker] = useState(null);

  const markers = [
    { id: "bar", img: markerBar, alt: "Bar", pos: [-0.22098, -78.51408] },
    { id: "bar2", img: markerBar, alt: "Bar", pos: [-0.22032, -78.5127] },
    { id: "bar3", img: markerBar, alt: "Bar", pos: [-0.220117, -78.5120] },
    { id: "bar4", img: markerBar, alt: "Bar", pos: [-0.22005, -78.5117] },
    { id: "stage1", img: markerStage1, alt: "Stage 1", pos: [-0.2207, -78.5137] },
    { id: "stage2", img: markerStage2, alt: "Stage 2", pos: [-0.22042, -78.51265] },
    { id: "stage3", img: markerStage3, alt: "Stage 3", pos: [-0.22030, -78.5121] },
    { id: "stage4", img: markerStage4, alt: "Stage 4", pos: [-0.21985, -78.5114] },
    { id: "toilet", img: markerToilet, alt: "Toilet", pos: [-0.2207, -78.5131] },
    { id: "toilet2", img: markerToilet, alt: "Toilet", pos: [-0.2207, -78.5131] },
    { id: "toilet3", img: markerToilet, alt: "Toilet", pos: [-0.2207, -78.5131] },
    { id: "entranceexit", img: markerEntranceExit, alt: "Entrance/Exit", pos: [-0.2203, -78.5129] },
    { id: "firstaid", img: markerFirstAid, alt: "First Aid", pos: [-0.22012, -78.51385] },
    { id: "food", img: markerFood, alt: "Food", pos: [-0.2204, -78.5130] },
    { id: "food2", img: markerFood, alt: "Food", pos: [-0.2204, -78.5130] },
    { id: "icecream", img: markerIceCream, alt: "Ice Cream", pos: [-0.2209, -78.5134] },
    { id: "icecream2", img: markerIceCream, alt: "Ice Cream", pos: [-0.2209, -78.5134] },
    { id: "icecream3", img: markerIceCream, alt: "Ice Cream", pos: [-0.2209, -78.5134] },
    { id: "icecream4", img: markerIceCream, alt: "Ice Cream", pos: [-0.2209, -78.5134] },
    { id: "locker", img: markerLocker, alt: "Locker", pos: [-0.22113, -78.51343] },
    { id: "locker2", img: markerLocker, alt: "Locker", pos: [-0.22115, -78.51365] },
    { id: "merchandise", img: markerMerchandise, alt: "Merchandise", pos: [-0.2208, -78.5132] },
    { id: "merchandise2", img: markerMerchandise, alt: "Merchandise", pos: [-0.2208, -78.5132] },
    { id: "merchandise3", img: markerMerchandise, alt: "Merchandise", pos: [-0.2208, -78.5132] },
  ];

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[-0.2202, -78.5127]}
          zoom={17}
          minZoom={16}
          maxZoom={20}
          maxBounds={imageBounds}
          maxBoundsViscosity={1.0}
          style={{ height: "100vh", width: "100vw" }}
          scrollWheelZoom
          doubleClickZoom
          dragging
        >
          <ImageOverlay url={map} bounds={imageBounds} />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.pos}
              icon={createIcon(marker.img)}
              eventHandlers={{
                click: () => setOpenMarker(marker),
              }}
            />
          ))}
        </MapContainer>
      </div>
      {openMarker && (
        <MarkerModal marker={openMarker} onClose={() => setOpenMarker(null)} />
      )}
    </div>
  );
}


