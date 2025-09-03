"use client";

import { useState, useEffect } from "react";
import Header from "../TopBar/Header";
import Navbar from "../TopBar/Navbar";
import HealthcareFooter from "../Footer/HealthcareFooter ";

export default function LayoutContent({ children, hideHeaderFooter }) {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    setIsContentLoaded(true);
  }, []);

  if (!isContentLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      </div>
    );
  }

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <HealthcareFooter />}
    </>
  );
}
