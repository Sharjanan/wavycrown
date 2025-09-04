
'use client';


import { useState } from 'react';
import dynamic from 'next/dynamic';
import AddressForm from './AddressForm';
const HousecallMap = dynamic(() => import('./HousecallMap'), { ssr: false });

export default function HousecallPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [displayAddress, setDisplayAddress] = useState<string>('');

  return (
<main className="min-h-screen bg-gradient-to-b from-black via-white to-black">   
     <section className="relative mt-50 max-w-4xl mx-auto px-4 pt-10 pb-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-gold text-center">
          Step 1: Type Your Address
        </h1>

        <div className="mt-6">
          <AddressForm
            onGeocode={(lat, lng, label) => {
              setCoords({ lat, lng });
              setDisplayAddress(label);
            }}
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <HousecallMap coords={coords} addressLabel={displayAddress} />
        </div>
        {displayAddress && (
          <p className="text-center text-sm text-slate-600 mt-3">
            Selected address: <span className="font-medium">{displayAddress}</span>
          </p>
        )}
      </section>
    </main>
  );
}
