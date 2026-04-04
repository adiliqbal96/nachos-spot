import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nachos Spot — Nachosvogn til events",
  description: "Vi ruller ind. Osten smelter. Festen starter. Book Nachos Spot til dit næste event — fester, firmaevents, festivaler og markeder over hele Danmark.",
  openGraph: {
    title: "Nachos Spot",
    description: "Nachosvogn til events — hele Danmark",
    images: ["/cheese.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&family=Barlow:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
