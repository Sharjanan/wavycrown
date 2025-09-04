'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
// Use global google.maps.Autocomplete type instead of importing
type GAuto = google.maps.places.Autocomplete;
import { Search, Send, XCircle   } from '@mynaui/icons-react';
import { useLanguage } from '@/components/LanguageContext';

type Props = {
  onGeocode: (lat: number, lng: number, label: string) => void;
};

/* ---------------- Cookie helpers ---------------- */
function setCookie(name: string, value: string, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(name: string) {
  const key = `${name}=`;
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(key))
      ?.slice(key.length) ?? null
  );
}
/* ------------------------------------------------ */

export default function AddressForm({ onGeocode }: Props) {
  const { lang } = useLanguage();
  const placeholder = lang === 'fr' ? 'Entrez votre adresse' : 'Type your address here';

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<GAuto | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Greater Montréal bounding box (soft bias)
  const mtlBoundsRef = useRef<google.maps.LatLngBounds | null>(null);
  useEffect(() => {
    if (!mtlBoundsRef.current && typeof window !== 'undefined' && window.google?.maps) {
      mtlBoundsRef.current = new google.maps.LatLngBounds(
        { lat: 45.30, lng: -74.10 }, // SW
        { lat: 45.80, lng: -73.30 }  // NE
      );
    }
  }, []);

  // Format short address: "123 Main St, City, QC, H1A 2B3, Canada"
  const formatShort = useCallback((place: google.maps.places.PlaceResult) => {
    const comps = place.address_components ?? [];
    const get = (type: string) => comps.find((c) => c.types.includes(type));
    const num = get('street_number')?.short_name ?? '';
    const route = get('route')?.short_name ?? '';
    const city =
      get('locality')?.short_name ||
      get('sublocality')?.short_name ||
      get('administrative_area_level_3')?.short_name ||
      '';
    const province = get('administrative_area_level_1')?.short_name ?? '';
    const pc = get('postal_code')?.short_name ?? '';
    const country = get('country')?.long_name ?? '';

    const line1 = [num, route].filter(Boolean).join(' ');
    return [line1, city, province, pc, country].filter(Boolean).join(', ');
  }, []);

  // When user picks a suggestion from Google
  const handlePlace = useCallback(() => {
    if (!autoRef.current) return;
    const place = autoRef.current.getPlace();
    const loc = place?.geometry?.location;
    if (!loc) return;

    const lat = loc.lat();
    const lng = loc.lng();
    const label = formatShort(place) || place.formatted_address || place.name || '';

    setQuery(label);
    onGeocode(lat, lng, label);
    setCookie('lastAddress', JSON.stringify({ label, lat, lon: lng, ts: Date.now() }), 30);
  }, [formatShort, onGeocode]);

  // Submit (Enter or Send icon)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoRef.current) return;

    const place = (autoRef.current as any)?.getPlace?.();
    if (place?.geometry?.location) {
      handlePlace();
      return;
    }

    // Fallback for free-typed query: use PlacesService
    if (!window.google?.maps) return;
    const svc = new google.maps.places.PlacesService(document.createElement('div'));
    setLoading(true);
    svc.findPlaceFromQuery(
      {
        query,
        fields: ['name', 'formatted_address', 'geometry', 'address_components'],
        // Bias to Montreal box; still returns QC/ON if relevant
        locationBias: mtlBoundsRef.current ?? undefined,
      },
      (results, status) => {
        setLoading(false);
        if (status !== google.maps.places.PlacesServiceStatus.OK || !results?.length) return;
        const r = results[0];
        const lat = r.geometry!.location!.lat();
        const lng = r.geometry!.location!.lng();
        const label = formatShort(r) || r.formatted_address || r.name || query;
        setQuery(label);
        onGeocode(lat, lng, label);
        setCookie('lastAddress', JSON.stringify({ label, lat, lon: lng, ts: Date.now() }), 30);
      }
    );
  };

  // Prefill from cookie on mount
  useEffect(() => {
    try {
      const raw = getCookie('lastAddress');
      if (!raw) return;
      const parsed = JSON.parse(raw) as { label: string; lat: number; lon: number };
      if (parsed?.label && typeof parsed.lat === 'number' && typeof parsed.lon === 'number') {
        setQuery(parsed.label);
        onGeocode(parsed.lat, parsed.lon, parsed.label);
      }
    } catch {}
  }, [onGeocode]);

  return (
    <div ref={boxRef} className="relative">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 items-stretch">
        <div className="relative">
          {/* Left search icon with fixed width so text doesn't overlap */}
          <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center pointer-events-none">
            <Search />
          </div>

          {/* Google Places Autocomplete wraps the input */}
          <Autocomplete
            onLoad={(inst) => {
              autoRef.current = inst;
              inst.setOptions({
                componentRestrictions: { country: ['ca'] },   // Canada only
                fields: ['address_components', 'formatted_address', 'geometry', 'name'],
                bounds: mtlBoundsRef.current ?? undefined,     // bias to Greater Montréal
                strictBounds: false,                           // still allow QC/ON
                types: ['address'],                            // focus on addresses
              });
            }}
            onPlaceChanged={handlePlace}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
          </Autocomplete>

          {/* Right submit icon button */}
          <button
            type="submit"
            aria-label="Show on Map"
            disabled={loading}
            className="absolute inset-y-0 right-0 w-12 flex items-center justify-center
                       hover:text-gold transition-transform duration-150 ease-out hover:scale-110 active:scale-95"
          >
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
}
