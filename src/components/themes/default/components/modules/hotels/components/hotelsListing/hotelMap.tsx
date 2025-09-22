"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

// Fallback center (London)
const fallbackCenter = { lat: 51.505, lng: -0.09 };

interface HotelMapProps {
  hotels: {
    hotel_id: string;
    latitude: string | number;
    longitude: string | number;
    actual_price: string | number;
    name?: string;
  }[];
}

export default function HotelMap({ hotels }: HotelMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBbdt6SuRcXDmRXIbbQebIn01kHkXVQuRA",
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // ============= VALIDATE & CONVERT COORDINATES =============
  const validHotels = hotels.filter((hotel) => {
    const lat = Number(hotel.latitude);
    const lng = Number(hotel.longitude);
    const isValid = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
    if (!isValid) {
      console.warn("Invalid coordinates for hotel:", hotel.hotel_id, {
        lat: hotel.latitude,
        lng: hotel.longitude,
        parsedLat: lat,
        parsedLng: lng,
      });
    }
    return isValid;
  });

  // ============= AUTO-CENTER MAP TO SHOW ALL HOTELS =============
  const fitBounds = useCallback(() => {
    if (!mapRef.current || validHotels.length === 0) return;

    try {
      const bounds = new window.google.maps.LatLngBounds();
      validHotels.forEach((hotel) => {
        bounds.extend({
          lat: Number(hotel.latitude),
          lng: Number(hotel.longitude),
        });
      });
      mapRef.current.fitBounds(bounds, 50); // padding
    } catch (err) {
      console.error("Error fitting bounds:", err);
      setMapError("Failed to center map");
    }
  }, [validHotels]);

  // ============= INITIALIZE MAP =============
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (validHotels.length > 0) {
      fitBounds();
    }
  }, [fitBounds, validHotels.length]);

  // ============= RE-FIT ON HOTEL CHANGE =============
  useEffect(() => {
    if (isLoaded && mapRef.current && validHotels.length > 0) {
      fitBounds();
    }
  }, [isLoaded, validHotels, fitBounds]);

  // ============= LOADING STATE =============
  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-gray-600">Loading Google Maps...</div>
      </div>
    );
  }

  // ============= EMPTY STATE =============
  if (hotels.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center p-4">
          <p className="text-gray-500">No hotels to display on map</p>
        </div>
      </div>
    );
  }

  if (validHotels.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-red-50 rounded-xl border border-red-200">
        <div className="text-center p-4">
          <p className="text-red-600 font-medium">⚠️ No valid coordinates found</p>
          <p className="text-red-500 text-sm">
            Check your hotel data — latitude/longitude must be valid numbers.
          </p>
        </div>
      </div>
    );
  }

  // ============= RENDER MAP =============
  return (
    <div className="rounded-xl w-full h-full overflow-hidden border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={fallbackCenter}
        zoom={12}
        onLoad={onLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
      >
        {validHotels.map((hotel) => (
          <Marker
            key={hotel.hotel_id}
            position={{
              lat: Number(hotel.latitude),
              lng: Number(hotel.longitude),
            }}
            label={{
              text: `$${Number(hotel.actual_price).toLocaleString()}`,
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            title={hotel.name}
          />
        ))}
      </GoogleMap>

      {/* Debug Info (optional — remove in production) */}
      <div className="mt-2 p-2 bg-gray-50 text-xs text-gray-600 rounded">
        Total Hotels: {hotels.length} | Valid Markers: {validHotels.length}
      </div>
    </div>
  );
}