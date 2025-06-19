"use client";
import React from "react";
import FAQTabs from "../components/Faq/FaqTab";
import HealthSection from "../components/Home/HealthSection";
import FaqBanner from "../components/Faq/FaqBanner";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";

function Page() {
  return (
    // <ProtectedRoute>
    <div>
      <FaqBanner />
      <FAQTabs />
      <HealthSection />
    </div>
    // </ProtectedRoute>
  );
}

export default Page;
