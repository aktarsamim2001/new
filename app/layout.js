"use client";

import { Rubik, Lato } from "next/font/google";
import "./globals.css";
import Header from "./components/TopBar/Header";
import Navbar from "./components/TopBar/Navbar";
import HealthcareFooter from "./components/Footer/HealthcareFooter ";
import { usePathname } from "next/navigation";
import { hideHeaderFooterRoutes } from "./utils/hideHeaderFooterRoutes";
import { Provider } from "react-redux";
import store from "@/features/store";
import { Toaster } from "react-hot-toast";

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
        <Provider store={store}>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              },
            }}
          />
          {!hideHeaderFooter && <Header />}
          {!hideHeaderFooter && <Navbar />}
          {children}
          {!hideHeaderFooter && <HealthcareFooter />}
        </Provider>
      </body>
    </html>
  );
}
