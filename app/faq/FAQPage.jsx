"use client";
import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import FAQTabs from "../components/Faq/FaqTab";
import HealthSection from "../components/Faq/HealthSection";
import FaqBanner from "../components/Faq/FaqBanner";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";
import { fetchFaqData } from "../../features/store/faqSlice";

function FAQPage({ content }) {

  return (
    // <ProtectedRoute>
    <div>
      <FaqBanner data={content} />
      <FAQTabs data={content} />
      <HealthSection data={content} />
    </div>
    // </ProtectedRoute>
  );
}

export default FAQPage;
