"use client";

import React, { useEffect } from "react";
import SupportBanner from "../components/Support/SupportBanner";
import EnquiryForm from "../components/Support/EnquiryForm";
import LetsTalk from "../components/Support/LetsTalk";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../features/store/enquirySlice";


function EnquiryFormPage({content}) {
  return (
    <div className="__poppins-font">
      <SupportBanner data={content} />
      <EnquiryForm data={content}/>
      <LetsTalk data={content}/>
    </div>
  );
}

export default EnquiryFormPage;
