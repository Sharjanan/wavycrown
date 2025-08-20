'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngExpression, DivIcon } from 'leaflet';
import { useEffect } from 'react';

type Props = {
  coords: { lat: number; lng: number } | null;
  addressLabel?: string;
};

function FlyTo({ coords }: { coords: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (!coords) return;
    map.flyTo([coords.lat, coords.lng] as LatLngExpression, 16, { duration: 0.8 });
  }, [coords, map]);
  return null;
}

const pinIcon: DivIcon = L.divIcon({
  className: 'custom-pin',
  html: `<div style="width:22px;height:22px;border-radius:9999px;background:#14b8a6;border:3px solid white;box-shadow:0 4px 10px rgba(0,0,0,.25);"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function HousecallMap({ coords, addressLabel }: Props) {
  const initial = coords ?? { lat: 45.5019, lng: -73.5674 }; // Montréal default
  const center: LatLngExpression = [initial.lat, initial.lng];
  const position: LatLngExpression | null = coords ? [coords.lat, coords.lng] : null;

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: 420, width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && (
        <Marker position={position} icon={pinIcon}>
          <Popup>{addressLabel || 'Selected location'}</Popup>
        </Marker>
      )}
      <FlyTo coords={coords} />
    </MapContainer>
  );
}
