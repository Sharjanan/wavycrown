// app/housecall/HousecallMap.tsx
'use client';

import { useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LocationUserSolid    as LocationIcon } from '@mynaui/icons-react';

type Props = {
  coords: { lat: number; lng: number } | null;
  addressLabel?: string;
};

export default function HousecallMap({ coords, addressLabel }: Props) {
  const mapRef = useRef<any>(null);

  const initial = coords ?? { lat: 45.5019, lng: -73.5674 };

  // Auto-fly when coords update
  useEffect(() => {
    if (coords && mapRef.current) {
      mapRef.current.flyTo({
        center: [coords.lng, coords.lat],
        zoom: 16,
        speed: 1.2,
        curve: 1,
        essential: true,
      });
    }
  }, [coords]);

  return (
    <div style={{ height: 420, width: '100%' }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: initial.lng,
          latitude: initial.lat,
          zoom: 13,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        attributionControl={false}  // hide default attribution box
      >
        {/* optional zoom buttons */}
        {/* <NavigationControl position="top-right" /> */}

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
