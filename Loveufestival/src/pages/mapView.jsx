import { MapContainer, ImageOverlay, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import kaartFestival from "../assets/kaart_festival_no_markers.svg";
import markerBar from "../assets/marker_bar.svg";
import markerStage1 from "../assets/marker_stage1_ponton.svg";

const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "",
  });

export default function MapView() {
  const bounds = [
    [0, 0],
    [1500, 2000],
  ];

  const markers = [
    { id: "bar", img: markerBar, alt: "Bar", pos: [300, 400] },
    { id: "stage1", img: markerStage1, alt: "Stage 1", pos: [700, 1000] },
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      minZoom={-2}
      maxZoom={2}
      style={{ height: "100vh", width: "100vw" }}
      zoom={0}
      center={[750, 1000]}
      scrollWheelZoom
      doubleClickZoom
      dragging
    >
      <ImageOverlay url={kaartFestival} bounds={bounds} />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.pos}
          icon={createIcon(marker.img)}
        />
      ))}
    </MapContainer>
  );
}


