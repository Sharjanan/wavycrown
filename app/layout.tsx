import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // This should be a client component

export const metadata: Metadata = {
  title: "WavyCrown",
  description: "Barber booking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
