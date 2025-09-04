"use client";

import { Rubik, Lato } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { hideHeaderFooterRoutes } from "./utils/hideHeaderFooterRoutes";
import { Provider } from "react-redux";
import store from "@/features/store";
import { Toaster } from "react-hot-toast";
import LayoutContent from "./components/Layout/LayoutContent";
import ScriptManager from "./components/script-tag/ScriptManager";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
          <ScriptManager />
          <LayoutContent hideHeaderFooter={hideHeaderFooter}>
            {children}
          </LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
