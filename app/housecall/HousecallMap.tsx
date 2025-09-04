// app/housecall/HousecallMap.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LocationUserSolid as LocationIcon } from '@mynaui/icons-react';

type Props = {
  coords: { lat: number; lng: number } | null;
};

export default function HousecallMap({ coords }: Props) {
  const mapRef = useRef<MapRef | null>(null);
  const [ready, setReady] = useState(false);

  const initial = coords ?? { lat: 45.5019, lng: -73.5674 };

  // Only fly after map has loaded
  useEffect(() => {
    if (!ready || !coords || !mapRef.current) return;
    const map = mapRef.current.getMap();
    map.flyTo({
      center: [coords.lng, coords.lat],
      zoom: 16,
      speed: 1.2,
      curve: 1,
      essential: true,
       padding: { top: 200, bottom: 0, left: 0, right: 0 }, 
    });
  }, [coords, ready]);

  return (
    <div className="w-full h-full">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: initial.lng,
          latitude: initial.lat,
          zoom: 13,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        attributionControl={false}
        onLoad={() => setReady(true)}   // ✅ safe to interact
        reuseMaps                       // avoids multiple mounts in dev
      >
        {coords && (
          <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
            <div className="drop-pin flex items-center justify-center">
              <LocationIcon size={50} strokeWidth={3} className="text-red-400" />
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
}
