'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  onGeocode: (lat: number, lng: number, label: string) => void;
};

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

export default function AddressForm({ onGeocode }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  // NOTE: this is a DIV ref now, and we'll attach it to a wrapper <div>, not the <form>
  const boxRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Debounced suggestion search (Nominatim)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const t = setTimeout(async () => {
      try {
        abortRef.current?.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        const url = new URL('https://nominatim.openstreetmap.org/search');
        url.searchParams.set('q', query);
        url.searchParams.set('format', 'json');
        url.searchParams.set('addressdetails', '1');
        url.searchParams.set('limit', '5');

        const res = await fetch(url.toString(), {
          headers: { 'Accept-Language': 'en' },
          signal: ac.signal,
        });
        const data: Suggestion[] = await res.json();
        setSuggestions(data);
        setOpen(data.length > 0);
        setHighlight(0);
      } catch {
        /* ignore */
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  async function geocodeAddress(input?: string) {
    const q = (input ?? query).trim();
    if (!q) return;
    setLoading(true);
    try {
      const url = new URL('https://nominatim.openstreetmap.org/search');
      url.searchParams.set('q', q);
      url.searchParams.set('format', 'json');
      url.searchParams.set('addressdetails', '1');
      url.searchParams.set('limit', '1');

      const res = await fetch(url.toString(), {
        headers: { 'Accept-Language': 'en' },
      });
      const data: Suggestion[] = await res.json();
      if (Array.isArray(data) && data.length) {
        const { lat, lon, display_name } = data[0];
        onGeocode(parseFloat(lat), parseFloat(lon), display_name);
        setOpen(false);
      } else {
        alert('Address not found. Try being more specific.');
      }
    } catch {
      alert('Could not look up that address.');
    } finally {
      setLoading(false);
    }
  }

  function chooseSuggestion(s: Suggestion) {
    setQuery(s.display_name);
    onGeocode(parseFloat(s.lat), parseFloat(s.lon), s.display_name);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      chooseSuggestion(suggestions[highlight]);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    geocodeAddress();
  }

  return (
    // Attach the div ref here, not on the form
    <div ref={boxRef} className="relative">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 items-stretch">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {/* Replace with your icon system if needed */}
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your address here"
            autoComplete="off"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          {open && suggestions.length > 0 && (
            <ul className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-h-72 overflow-y-auto">
              {suggestions.map((s, i) => (
                <li
                  key={`${s.lat}-${s.lon}-${i}`}
                  onMouseDown={(e) => {
                    e.preventDefault(); // keep focus
                    chooseSuggestion(s);
                  }}
                  className={`px-4 py-3 cursor-pointer text-sm ${
                    i === highlight ? 'bg-teal-50' : 'hover:bg-slate-50'
                  }`}
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Show on Map'}
          </button>
        </div>
      </form>
    </div>
  );
}
