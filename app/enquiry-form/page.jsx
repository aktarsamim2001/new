"use client";

import React, { useEffect } from "react";
import SupportBanner from "../components/Support/SupportBanner";
import EnquiryForm from "../components/Support/EnquiryForm";
import LetsTalk from "../components/Support/LetsTalk";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../features/store/enquirySlice";

function page() {
  const dispatch = useDispatch();
  const enquiryData = useSelector((state) => state.enquiry.data);

  useEffect(() => {
    dispatch(submitEnquiry({ slug: "contact-us" }));
  }, [dispatch]);
  return (
    <div className="__poppins-font">
      <SupportBanner data={enquiryData} />
      <EnquiryForm data={enquiryData}/>
      <LetsTalk />
    </div>
  );
}

export default page;
