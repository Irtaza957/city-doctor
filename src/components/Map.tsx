"use client";

import { removeSpaces } from "@/utils/helpers";

import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import { FaLocationArrow, FaMagnifyingGlass } from "react-icons/fa6";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "408px",
};

interface MapProps {
  coords: string;
  setCoords: Dispatch<SetStateAction<string>>;
}

const Map = ({ coords, setCoords }: MapProps) => {
  const [loading, setLoading] = useState(false);
  const [lat, lng] = removeSpaces(coords).split(",");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    setCoords(`${event.latLng?.lat()},${event.latLng?.lng()}`);
  };

  const handleTrackLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(`${location.lat},${location.lng}`);
        setLoading(false);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          zoom={14}
          onClick={handleMapClick}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {
              position: window.google.maps.ControlPosition.BOTTOM_LEFT,
            },
          }}
        >
          <Marker
            draggable={true}
            position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            onDragEnd={(event) => {
              setCoords(`${event.latLng?.lat()},${event.latLng?.lng()}`);
            }}
          />
        </GoogleMap>
      )}
      <div className="absolute top-5 sm:left-16 w-4/5 flex items-center justify-center bg-white rounded-lg py-2.5 px-5 shadow-md">
        <input
          type="text"
          className="w-full placeholder:text-gray-400 text-xs"
          placeholder="Search for your building or area"
        />
        <FaMagnifyingGlass className="text-gray-400" />
      </div>
      <button
        type="button"
        disabled={loading}
        onClick={handleTrackLocation}
        className="absolute bottom-16 right-5 size-10 bg-white/50 backdrop-blur-sm text-primary p-2 rounded-full shadow-lg"
      >
        {loading ? (
          <LuLoader2 className="size-full animate-spin" />
        ) : (
          <FaLocationArrow className="size-full" />
        )}
      </button>
    </div>
  );
};

export default Map;
