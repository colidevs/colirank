import type {Metadata} from "next";

import Link from "next/link";

import {Toaster} from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "colirank",
  description: "Generated by colidevs CLI",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="relative h-screen w-screen overflow-hidden bg-slate-900 text-rose-950">
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-zinc-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" />
        <div className="border-b border-zinc-300 bg-white">
          <header className="ms-32 text-2xl font-bold leading-[4rem]">
            <Link href="/">colirank 🏆</Link>
          </header>
        </div>
        <div className="container relative z-10 m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4 font-sans antialiased">
          <main className="py-8">{children}</main>
          <Toaster />
        </div>
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} colirank
        </footer>
      </body>
    </html>
  );
}
