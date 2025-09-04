// app/housecall/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AddressForm from './AddressForm';

const HousecallMap = dynamic(() => import('./HousecallMap'), { ssr: false });

export default function HousecallPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden pt-16">
      {/* Fullscreen background map */}
      <div className="absolute inset-0 -z-10">
        <HousecallMap coords={coords} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-90
                      bg-gradient-to-b from-black via-black/50 to-transparent -z-0" />

      {/* Content overlay */}
      <section className="relative max-w-3xl mx-auto px-4 pt-32">
        <h1 className="text-3xl md:text-4xl font-semibold text-gold text-center drop-shadow-md">
          Step 1: Type Your Address
        </h1>

        <div className="mt-6 bg-white/200 backdrop-blur-sm rounded-2xl shadow-lg ">
          <AddressForm
            onGeocode={(lat, lng, label) => {
              setCoords({ lat, lng });
            }}
          />
        </div>
      </section>

      {/* Next button pinned near bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          className="px-40 py-3 rounded-xl font-semibold bg-gold text-black 
                     hover:bg-black hover:text-gold transition-colors shadow-lg"
        >
          Next
        </button>
      </div>
    </main>
  );
}
