import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.noordertaxi.nl"),
  title: {
    default: "Noorder Taxi | Exclusief taxivervoer in Amsterdam en omgeving",
    template: "%s | Noorder Taxi",
  },
  description:
    "Noorder Taxi verzorgt persoonlijk, hoogwaardig taxivervoer voor luchthaventransfers, zakelijke ritten en speciale gelegenheden. Reserveer eenvoudig online, telefonisch bevestigd.",
  keywords: [
    "taxi Amsterdam",
    "luxe taxi",
    "luchthaventransfer Schiphol",
    "zakelijk taxivervoer",
    "chauffeursservice",
    "Noorder Taxi",
  ],
  authors: [{ name: "Noorder Taxi" }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Noorder Taxi",
    title: "Noorder Taxi | Exclusief taxivervoer in Amsterdam en omgeving",
    description:
      "Persoonlijk, hoogwaardig taxivervoer. Luchthaventransfers, zakelijke ritten en speciale gelegenheden — telefonisch bevestigd.",
    url: "https://www.noordertaxi.nl",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noorder Taxi | Exclusief taxivervoer in Amsterdam en omgeving",
    description:
      "Persoonlijk, hoogwaardig taxivervoer. Reserveer eenvoudig, telefonisch bevestigd.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${bodoniModa.variable} ${inter.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
