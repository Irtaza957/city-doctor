"use client";

import { libraries } from "@/utils/helpers";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { FaLocationArrow, FaMagnifyingGlass } from "react-icons/fa6";
import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";


const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Location = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchValue }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setMarker({ lat: location.lat(), lng: location.lng() });
        map?.panTo(location);
      } else {
        toast.error("Location Not Found!");
      }
    });
  };

  const handleTrackLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarker(location);
        map?.panTo(location);
        setLoading(false);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return isLoaded ? (
    <div className="relative w-full h-full overflow-hidden">
      <GoogleMap
        zoom={10}
        center={center}
        options={mapOptions}
        onLoad={(map) => setMap(map)}
        mapContainerStyle={containerStyle}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <form
        onSubmit={handleSearch}
        className="w-full h-full p-3 absolute top-0 flex flex-col items-center justify-between xl:py-20"
      >
        <div className="w-full xl:w-2/3 flex items-center justify-center bg-white rounded-lg p-3">
          <input
            type="text"
            value={searchValue}
            className="w-full placeholder:text-gray-400"
            placeholder="Search for your building or area"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FaMagnifyingGlass className="text-gray-400" />
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={handleTrackLocation}
          className="absolute bottom-20 right-[12px] bg-white/50 backdrop-blur-sm text-primary p-2 rounded-full shadow-lg"
        >
          {loading ? (
            <LuLoader className="w-8 h-8 animate-spin" />
          ) : (
            <FaLocationArrow className="w-8 h-8" />
          )}
        </button>
        <button
          type="button"
          className="w-full xl:w-1/6 py-2 rounded-lg bg-primary text-white"
        >
          Confirm
        </button>
      </form>
    </div>
  ) : (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <LuLoader className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
};

export default Location;
