'use client';

import { LoadScript } from '@react-google-maps/api';
import { useLanguage } from '@/components/LanguageContext';

const languageFor = (lang?: string) => (lang === 'fr' ? 'fr-CA' : 'en-CA');

export default function PlacesProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage?.() ?? { lang: 'en' };
  const language = languageFor(lang);

  return (
    <LoadScript
      key={language}                                   // force reload when language changes
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={['places']}
      language={language}                              // en-CA or fr-CA
      region="CA"                                      // bias to Canada
    >
      {children}
    </LoadScript>
  );
}
