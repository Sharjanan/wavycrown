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

  useEffect(() => {
    if (!ready || !coords || !mapRef.current) return;
    const map = mapRef.current.getMap();
    map.flyTo({
      center: [coords.lng, coords.lat],
      zoom: 16,
      speed: 1.2,
      curve: 1,
      essential: true,
      padding: { top: 200 },
    });
  }, [coords, ready]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: initial.lng,
        latitude: initial.lat,
        zoom: 10,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={{
        version: 8,
        sources: {
          cartoLight: {
            type: 'raster',
            tiles: [
              'https://cartodb-basemaps-a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          },
        },
        layers: [
          {
            id: 'cartoLight',
            type: 'raster',
            source: 'cartoLight',
          },
        ],
      }}
      attributionControl={false}
      onLoad={() => setReady(true)}
    >
      {coords && (
        <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
          <LocationIcon className="w-8 h-8 text-red-500" />
        </Marker>
      )}
    </Map>
  );
}
