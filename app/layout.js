"use client";
import { Rubik, Lato } from "next/font/google";
import "./globals.css";
import Header from "./components/TopBar/Header";
import Navbar from "./components/TopBar/Navbar";
import HealthcareFooter from "./components/Footer/HealthcareFooter ";
import { usePathname } from "next/navigation";
import { hideHeaderFooterRoutes } from "./utils/hideHeaderFooterRoutes";


const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});


const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = hideHeaderFooterRoutes.includes(pathname);
  return (
    <html lang="en" className={`${rubik.variable} ${lato.variable}`}>
      <body className="antialiased">
        {!hideHeaderFooter && <Header />}
        {!hideHeaderFooter && <Navbar />}
        {children}
        {!hideHeaderFooter && <HealthcareFooter />}
      </body>
    </html>
  );
}

