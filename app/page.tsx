"use client"; // Only if you're using the /app directory in Next.js 13+

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/lang";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Home() {
  const { lang } = useLanguage();
  const t = translations.home;
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const services = [
    {
      title: translations.services[lang].haircut,
      price: "$30",
      description: translations.services[lang].descriptions.haircut,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/ADMBGK35RBFXVLZGOZO5UOH6",
    },
    {
      title: translations.services[lang].haircut_beard,
      price: "$40",
      description: translations.services[lang].descriptions.haircut_beard,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/V7RQQCD6JUDXBYIKIDS24TKY",
    },
    {
      title: translations.services[lang].after_hours,
      price: "$60",
      description: translations.services[lang].descriptions.after_hours,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/EU2ZSC6VZHKC6S4VDE2EDQFC",
    },
    {
      title: translations.services[lang].vip,
      price: "$80",
      description: translations.services[lang].descriptions.vip,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/2TF6OLBYKZPUNBFGDFRB7HAU",
    },

    {
      title: translations.services[lang].house_call,
      price: "$100",
      description: translations.services[lang].descriptions.house_call,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/W2QHA46QPMZ67V44ZLQSX3KR",
    },
  ];
  const handleOpen = (link: string) => {
    setActiveLink(link);
    setOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden text-white flex items-center justify-center">
        {/* Background Image cropped to show bottom only */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div
            className="absolute inset-x-0 bottom-0 w-full h-[200%] bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/sky_2.jpg')",
            }}
          />
          {/* Optional dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/*Step Into Style*/}
          <h1 className="text-gold text-6xl sm:text-6xl font-bold italic mb-4">
            {t.headline[lang]}
          </h1>

          {/* Book your crown-worthy cut today.*/}
          <p className="text-lg sm:text-xl mb-6 uppercase italic">
            {t.sub[lang]}
          </p>
          <a href="#booking">
            <button className="text-black bg-gold glow-gold px-6 py-2 text-lg font-bold rounded-1xl border-4">
              {t.button[lang]}
            </button>
          </a>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-8 bg-black" id="booking">
        {/* choose our service */}
        <h2 className="text-gold text-3xl font-extrabold text-center mb-10">
          {translations.services[lang].service_section}
        </h2>
        <div className="text-white  grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:shadow-xl transition"
              onClick={() => handleOpen(service.link)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm italic text-gray-300">
                  {service.description}
                </p>
                <p className="text-gray-500 text-lg">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[95vw] h-[95vh] max-w-none max-h-none p-0 overflow-hidden">
            <VisuallyHidden>
              <DialogTitle>Booking Window</DialogTitle>
            </VisuallyHidden>
            {activeLink && (
              <iframe
                src={activeLink}
                title="Square Booking"
                className="w-full h-full border-none"
              />
            )}
          </DialogContent>
        </Dialog>
      </section>

     
      {/* Footer Section */}
    </main>
  );
}
