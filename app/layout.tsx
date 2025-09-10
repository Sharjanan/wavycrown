import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Playfair_Display, Poppins } from "next/font/google";
import localFont from "next/font/local";
import PlacesProvider from "./PlacesProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const lostInSouth = localFont({
  src: "./fonts/Lost in South Regular.otf",
  variable: "--font-lostinsouth",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WavyCrown",
  description: "Barber booking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${lostInSouth.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white" suppressHydrationWarning>
        <PlacesProvider>
          <ClientLayout>{children}</ClientLayout>
        </PlacesProvider>
      </body>
    </html>
  );
}
