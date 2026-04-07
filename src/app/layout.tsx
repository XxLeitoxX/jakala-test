import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { Providers } from "@/app/providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="es" className={`${nunito.variable} h-full antialiased`}>
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
