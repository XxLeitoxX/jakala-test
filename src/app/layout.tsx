import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Dulces Petalos",
  description: "Catalogo de productos de la floristeria Dulces Petalos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-900">
        <Providers>
          <div className="app-frame">
            <header className="topbar">
              <Image src="/assets/icons/logo.svg" alt="Logo Dulces Petalos" width={50} height={50} />
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
