"use client";
import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import FAQTabs from "../components/Faq/FaqTab";
import HealthSection from "../components/Faq/HealthSection";
import FaqBanner from "../components/Faq/FaqBanner";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";
import { fetchFaqData } from "../../features/store/faqSlice";

function Page() {
  const dispatch = useDispatch();
  const faqData = useSelector((state) => state?.faq?.data);
  useEffect(() => {
    dispatch(fetchFaqData({ slug: "faq" }));
  }, [dispatch]);

  return (
    // <ProtectedRoute>
    <div>
      <FaqBanner data={faqData} />
      <FAQTabs data={faqData} />
      <HealthSection data={faqData} />
    </div>
    // </ProtectedRoute>
  );
}

export default Page;
