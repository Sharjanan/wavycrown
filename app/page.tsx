"use client"; // Only if you're using the /app directory in Next.js 13+

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/lang";

export default function Home() {
    const { lang } = useLanguage();
  const t = translations.home;

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
    <h1 className="text-6xl sm:text-6xl font-bold mb-4">{t.headline[lang]}</h1>
    {/* Book your crown-worthy cut today.*/}
    <p className="text-lg sm:text-xl mb-6 uppercase ">
     {t.sub[lang]}
    </p>
    <a href="#booking">
      <button className="bg-gold text-black px-6 py-3 text-lg font-medium rounded hover:bg-yellow-400 transition">
        Book Now
      </button>
    </a>
  </motion.div>
</section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-8 bg-gray-50" id="services">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Services</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Haircut", price: "$25" },
            { title: "Skin Fade", price: "$30" },
            { title: "Haircut + Beard", price: "$35" },
          ].map((service, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Square Booking Embed */}
      <section className="py-20 px-4 sm:px-8 bg-white" id="booking">
        <h2 className="text-3xl font-semibold text-center mb-8">Book an Appointment</h2>
        <div className="max-w-4xl mx-auto">
          <iframe
            src="https://squareup.com/appointments/book/YOUR-SQUARE-URL"
            title="Book Appointment"
            style={{
              width: "100%",
              height: "800px",
              border: "none",
              borderRadius: "12px",
            }}
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
