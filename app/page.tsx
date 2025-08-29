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
      price: translations.services[lang].price.haircut,
      description: translations.services[lang].descriptions.haircut,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/ADMBGK35RBFXVLZGOZO5UOH6",
      image: "/services/mahan.png",
    },
    {
      title: translations.services[lang].haircut_beard,
      price: translations.services[lang].price.haircut_beard,
      description: translations.services[lang].descriptions.haircut_beard,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/V7RQQCD6JUDXBYIKIDS24TKY",
      image: "/services/mahan.png",
    },
    // {
    //   title: translations.services[lang].after_hours,
    //   price: translations.services[lang].price.after_hours,
    //   description: translations.services[lang].descriptions.after_hours,
    //   link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/EU2ZSC6VZHKC6S4VDE2EDQFC",
    //   image: "/services/mahan.png",
    // },
    {
      title: translations.services[lang].vip,
      price: translations.services[lang].price.vip,
      description: translations.services[lang].descriptions.vip,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/2TF6OLBYKZPUNBFGDFRB7HAU",
      image: "/services/mahan.png",
    },

    {
      title: translations.services[lang].house_call,
      price: translations.services[lang].price.house_call,
      description: translations.services[lang].descriptions.house_call,
      link: "https://book.squareup.com/appointments/a8nib68p80o9f3/location/LJV25SAZCZRD6/services/W2QHA46QPMZ67V44ZLQSX3KR",
      image: "/services/mahan.png",
    },
  ];
  const handleOpen = (link: string) => {
    setActiveLink(link);
    setOpen(true);
  };

  return (
    <main className="min-h-screen text-gray-900">
      {/* Hero Section */}
     <section className="relative mt-50 mb-30 h-[70vh] w-[95vw] max-w-8xl mx-auto overflow-hidden text-gold flex items-center justify-center glow-gold">
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
      
      {/*  Section Separator */}
      {/* <div className="relative mt-20 h-[4px] w-full text-gold border-b-1 border-gold glow-gold"></div> */}
      {/* Our Schedule Section */}
<section className="py-16 px-4 z-50 bg-black text-white  border-b border-t border-gold">  
  <div className="max-w-5xl mx-auto grid grid-cols-3 text-center">
    {/* Title */}
    <div className="flex items-center justify-center">
      <h2 className="text-3xl font-extrabold">OUR <span className="text-gold">SCHEDULE</span></h2>
    </div>
    {/* Weekdays */}
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold font-lostinsouth">MONDAY TO FRIDAY</h2>
      <h2 className="text-3xl">9:00 – 21:00</h2>
    </div>

    {/* Weekends */}
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold">SATURDAY</h2>
      <h2 className="text-3xl">9:00 – 17:00</h2>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-black" id="booking">
        {/* choose a service */}
        <h2 className=" text-gold text-5xl font-extrabold text-center mb-10">
          {translations.services[lang].service_section}
        </h2>
        <div className="text-white flex flex-col gap-10 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:shadow-xl transition text-gold border-0 border-t-4 "
              onClick={() => handleOpen(service.link)}
            >
              <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Left column - text */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-semibold mb-2">{service.title}</h1>
              <p className="text italic text-gray-300">
                {service.description}
              </p>
              <p className="text-gray-500 text-3xl mt-3">{service.price}</p>
              <div className="z-50 mt-20">            
              <button 
               className="text-xs sm:text-sm md:text-base text-black bg-gold glow-gold px-6 py-2  font-bold rounded-2xl  uppercase"
               onClick={() => handleOpen(service.link)}>
                {t.explore_button[lang].split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </button>

          </div>
            </div>

            {/* Right column - photo */}
            <div className="flex justify-center sm:justify-end">
              <img
                src={'vercel.svg'} // adjust path / naming convention
                alt={service.title}
                className="w-full max-w-xs rounded-lg border border-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              />
            </div>
          </div>
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
    </main>
  );
}
