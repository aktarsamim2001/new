"use client";
import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import FAQTabs from "../components/Faq/FaqTab";
import HealthSection from "../components/Home/HealthSection";
import FaqBanner from "../components/Faq/FaqBanner";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";
import { fetchFaqData } from "../../features/store/faqSlice";


const defaultFaqData = { content: { faq_page: { categories: [], image: '', title: '', description: '', button_name: '' } } };
const defaultHealthData = { content: { home_page: { title_four: '', description_four: '', button_url_four: '', button_name_four: '', image_four: '' } } };


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
      <HealthSection dataItem={defaultHealthData} />
    </div>
    // </ProtectedRoute>
  );
}

export default Page;
