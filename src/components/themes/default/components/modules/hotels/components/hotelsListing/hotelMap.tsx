"use client";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "@iconify/react";
const containerStyle = {
  width: "100%",
  height: "800px",
};
// Fallback center (London)
const fallbackCenter: [number, number] = [51.505, -0.09];
interface HotelMapProps {
  hotels: {
    hotel_id: string;
    latitude: string | number;
    longitude: string | number;
    actual_price: string | number;
    name?: string;
    city?: string;
  }[];
}
// :small_blue_diamond: Custom Price Bubble Icon
const priceIcon = (price: number | string) =>
  L.divIcon({
    html: `
      <div class="px-2 py-1.5 w-18 text-center rounded-2xl text-black text-xs font-bold bg-white border border-gray-300 shadow-sm">
        $${price}
      </div>
    `,
    className: "",
  });
// :small_blue_diamond: Helper component to auto fit bounds
function FitBounds({ hotels }: { hotels: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (hotels.length === 0) return;
    const bounds = L.latLngBounds(
      hotels.map((h) => [Number(h.latitude), Number(h.longitude)])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [hotels, map]);
  return null;
}
// :small_blue_diamond: Custom Controls (Zoom In, Zoom Out, Locate)
function CustomControls() {
  const map = useMap();
  const zoomIn = () => map.setZoom(map.getZoom() + 1);
  const zoomOut = () => map.setZoom(map.getZoom() - 1);
  const locateUser = () => map.locate({ setView: true, maxZoom: 14 });
  return (
    <div className="absolute top-14 right-4 flex flex-col gap-3 z-[1000]">
      {/* Zoom In */}
      <button
        onClick={zoomIn}
        className="w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.15381 16H25.0546"
            stroke="black"
            strokeWidth="1.27863"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.1045 7.04962V24.9504"
            stroke="black"
            strokeWidth="1.27863"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Zoom Out */}
      <button
        onClick={zoomOut}
        className="w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.15381 16H25.0546"
            stroke="black"
            strokeWidth="1.27863"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Locate */}
      <button
        onClick={locateUser}
        className="w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2795 25.7153C17.3137 25.8005 17.3731 25.8732 17.4498 25.9237C17.5265 25.9741 17.6168 25.9999 17.7085 25.9976C17.8003 25.9952 17.8892 25.9648 17.9632 25.9105C18.0372 25.8562 18.0928 25.7806 18.1226 25.6937L23.9712 8.5979C24 8.51818 24.0054 8.4319 23.987 8.34916C23.9686 8.26643 23.9269 8.19066 23.867 8.13072C23.807 8.07078 23.7313 8.02915 23.6485 8.0107C23.5658 7.99225 23.4795 7.99774 23.3998 8.02654L6.30395 13.8751C6.21712 13.9049 6.14147 13.9605 6.08717 14.0345C6.03286 14.1085 6.0025 14.1974 6.00015 14.2892C5.9978 14.3809 6.02357 14.4712 6.07402 14.5479C6.12446 14.6246 6.19716 14.684 6.28236 14.7182L13.4176 17.5795C13.6432 17.6698 13.8481 17.8049 14.0201 17.9765C14.192 18.1482 14.3275 18.3529 14.4182 18.5783L17.2795 25.7153Z"
            stroke="black"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
export default function HotelMap({ hotels }: HotelMapProps) {
  const [validHotels, setValidHotels] = useState<typeof hotels>([]);
  const [showModal, setShowModal] = useState(false);
  // Validate coordinates
  useEffect(() => {
    const filtered = hotels.filter((hotel) => {
      const lat = Number(hotel.latitude);
      const lng = Number(hotel.longitude);
      return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
    });
    setValidHotels(filtered);
  }, [hotels]);
  if (hotels.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl">
        <p className="text-gray-500">No hotels to display on map</p>
      </div>
    );
  }
  if (validHotels.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-600 font-medium">:warning: No valid coordinates found</p>
      </div>
    );
  }
  return (
    <div className="relative w-full h-full rounded-4xl overflow-hidden">
      {/* MINI MAP PREVIEW */}
      <div
        className="absolute top-54 right-2 z-[1000] cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="w-23 h-18 rounded-lg shadow-lg border border-gray-300 relative">
          <MapContainer
            center={fallbackCenter}
            zoom={2}
            style={{ width: "100%", height: "100%", zIndex: 1 }}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          </MapContainer>
          <div className="absolute bottom-1 left-1 bg-black/15 text-black text-xs font-bold w-21 h-16 text-center pt-6 rounded z-10 whitespace-nowrap pointer-events-none">
            Full Map
          </div>
        </div>
      </div>
      {/* FULLSCREEN MAP MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[2000] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative w-full h-full p-4">
            <button
              className="absolute top-7 right-8.5 z-[3000] text-white bg-gray-600 rounded-full p-1.5 cursor-pointer text-3xl"
              onClick={() => setShowModal(false)}
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
            <MapContainer
              style={{ width: "100%", height: "100%" }}
              center={fallbackCenter}
              zoom={7}
              scrollWheelZoom={true}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              />
              <FitBounds hotels={validHotels} />
              {validHotels.map((hotel) => (
                <Marker
                  key={hotel.hotel_id}
                  position={[Number(hotel.latitude), Number(hotel.longitude)]}
                  icon={priceIcon(hotel.actual_price)}
                >
                  <Tooltip
                    direction="top"
                    offset={L.point(0, -10)}
                    opacity={1}
                  >
                    <div className="text-[12px] max-w-[220px] px-2 py-1 leading-[1.4] text-center rounded-2xl">
                      <b>{hotel.name || "Hotel"}</b> <br />
                      ${hotel.actual_price}
                    </div>
                  </Tooltip>
                </Marker>
              ))}
              <CustomControls />
            </MapContainer>
          </div>
        </div>
      )}
      {/* MAIN MAP */}
      <MapContainer
        style={containerStyle}
        center={fallbackCenter}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        <FitBounds hotels={validHotels} />
        {validHotels.map((hotel) => (
          <Marker
            key={hotel.hotel_id}
            position={[Number(hotel.latitude), Number(hotel.longitude)]}
            icon={priceIcon(hotel.actual_price)}
          >
            <Tooltip direction="top" offset={L.point(0, -10)} opacity={1}>
              <div className="text-[12px] max-w-[220px] px-2 py-1 leading-[1.4] text-center rounded-2xl">
                <b>{hotel.name || "Hotel"}</b> <br />
                ${hotel.actual_price}
              </div>
            </Tooltip>
          </Marker>
        ))}
        <CustomControls />
      </MapContainer>
    </div>
  );
}