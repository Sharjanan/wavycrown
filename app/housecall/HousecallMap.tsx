// app/housecall/HousecallMap.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Pane  } from 'react-leaflet';
import L, { LatLngExpression, DivIcon, Map as LeafletMap } from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Location as LocationIcon } from '@mynaui/icons-react';
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


export default function HousecallMap({ coords, addressLabel }: Props) {
  // 1) Mount guard (don’t early-return before hooks!)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 2) Positions
  const initial = coords ?? { lat: 45.5019, lng: -73.5674 };
  const center: LatLngExpression = [initial.lat, initial.lng];
  const position: LatLngExpression | null = coords ? [coords.lat, coords.lng] : null;

  // 3) Icon once
   const pinIcon: DivIcon = useMemo(() => {
  const svg = ReactDOMServer.renderToStaticMarkup(
    <LocationIcon size={50} strokeWidth={3} className='text-red-600' />
  );

  return L.divIcon({
    className: 'leaflet-location-pin', 
    html: `
      <div class="pin-wrap pin-drop">    
            ${svg}
      </div>
    `,
    iconSize: [56, 56],    
    iconAnchor: [28, 56],    
    popupAnchor: [0, -56],
  });
}, []);
  // 4) Keep a ref and fully remove on unmount
  const mapRef = useRef<LeafletMap | null>(null);
  useEffect(() => {
    return () => {
      try {
        mapRef.current?.remove();
        mapRef.current = null;
      } catch {}
    };
  }, []);

  return (
    <div style={{ height: 420, width: '100%' }}>
      {mounted && (
        <MapContainer
          key="leaflet-map"                 // stable key
          ref={mapRef}                      // v4 way
          center={center}
          zoom={13}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
          className="z-0"
            attributionControl={false}   

          
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            
          />
          <Pane name="labels" style={{ zIndex: 650, pointerEvents: 'none' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              pane="labels"
            />
          </Pane>
          {position && (
            <Marker position={position} icon={pinIcon}>
              <Popup>{addressLabel || 'Selected location'}</Popup>
            </Marker>
          )}
          <FlyTo coords={coords} />
        </MapContainer>
      )}
    </div>
  );
}
