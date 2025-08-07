import React from "react";
import SupportBanner from "../components/Support/SupportBanner";
import EnquiryForm from "../components/Support/EnquiryForm";
import LetsTalk from "../components/Support/LetsTalk";

function page() {
  return (
    <div className="__poppins-font">
      <SupportBanner />
      <EnquiryForm />
      <LetsTalk />
    </div>
  );
}

export default page;
