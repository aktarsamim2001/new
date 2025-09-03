"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "../../features/store/profileSlice";
import { createBooking } from "../../features/store/bookingSlice";
import { fetchServiceDetailsPageData } from "../../features/store/serviceDetailsPageSlice";
import { fetchServicesList } from "../../features/store/servicesListSlice";
import { fetchAddressList } from "../../features/store/addressListSlice";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";
import HeaderSection from "./HeaderSection";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Image from "next/image";
import image from "../assets/woman/shape.png";

const TestBookingSystem = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.profileData);
  const serviceDetailsPageData = useSelector(
    (state) => state?.serviceDetailsPage?.data
  );
  const servicesListData = useSelector((state) => state?.servicesList?.data);
  const addressList = useSelector((state) => state.addressList.data);
  const booking = useSelector((state) => state.booking || {});

  // ✅ load state from URL and sessionStorage
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const stepFromUrl = Number(urlParams.get("step"));
      if (stepFromUrl && stepFromUrl >= 1 && stepFromUrl <= 4) {
        return stepFromUrl;
      }
      return Number(sessionStorage.getItem("currentStep")) || 1;
    }
    return 1;
  });

  // Handle browser back button
  useEffect(() => {
    const handleBrowserBack = (e) => {
      // If we're on the thank you page (step 4) and user hits browser back
      if (currentStep === 4) {
        e.preventDefault();
        // Clear all stored data
        sessionStorage.clear();
        // Reset form data
        setAllFormData({});
        setDateTimeData({ date: "", timeSlot: "" });
        // Redirect to step 1
        window.location.href = "/book-test";
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", handleBrowserBack);
      return () => window.removeEventListener("popstate", handleBrowserBack);
    }
  }, [currentStep]);
  const [allFormData, setAllFormData] = useState(() => {
    const saved = sessionStorage.getItem("allFormData");
    return saved ? JSON.parse(saved) : {};
  });
  const [dateTimeData, setDateTimeData] = useState(() => {
    const saved = sessionStorage.getItem("dateTimeData");
    return saved ? JSON.parse(saved) : { date: "", timeSlot: "" };
  });

  const [isClient, setIsClient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  // ✅ persist step & form data and update URL
  useEffect(() => {
    sessionStorage.setItem("currentStep", currentStep);
    if (typeof window !== "undefined") {
      const url = new URL(window.location);
      url.searchParams.set("step", currentStep);
      window.history.pushState({}, "", url);
    }
  }, [currentStep]);

  useEffect(() => {
    sessionStorage.setItem("allFormData", JSON.stringify(allFormData));
  }, [allFormData]);

  useEffect(() => {
    sessionStorage.setItem("dateTimeData", JSON.stringify(dateTimeData));
  }, [dateTimeData]);

  // ✅ reset after Step4 (Thank You page)
  useEffect(() => {
    if (currentStep === 4) {
      sessionStorage.clear();
    }
  }, [currentStep]);

  useEffect(() => {
    setIsClient(true);
    setCurrentMonth(new Date());
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(fetchServicesList());
      dispatch(fetchProfileDetails());
      const urlSlug = allFormData?.selectedTest?.[0]?.value;
      if (urlSlug) {
        dispatch(fetchServiceDetailsPageData({ slug: urlSlug }));
      }
      dispatch(fetchAddressList());
    }
  }, [dispatch, isClient, allFormData?.selectedTest]);

  useEffect(() => {
    if (userProfile && userProfile.name && isClient) {
      const age = userProfile.dob
        ? new Date().getFullYear() - new Date(userProfile.dob).getFullYear()
        : "";
      let normalizedGender = "Select";
      if (userProfile.gender) {
        const g = userProfile.gender.toLowerCase();
        if (["male", "female", "other"].includes(g)) {
          normalizedGender = g;
        }
      }
      setAllFormData((prev) => ({
        ...prev,
        fullName: userProfile.name || "",
        gender: normalizedGender,
        age: age || "",
        contact: userProfile.mobile || "",
      }));
    }
  }, [userProfile, isClient]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target)
      ) {
        setShowTimePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStepContinue = async (stepData) => {
    const updatedFormData = { ...allFormData, ...stepData };
    setAllFormData(updatedFormData);
    
    const nextStep = currentStep === 3 ? 4 : currentStep + 1;
    
    if (currentStep === 3) {
      await dispatch(createBooking(updatedFormData));
    }
    
    // Update URL and state
    if (typeof window !== "undefined") {
      const url = new URL(window.location);
      url.searchParams.set("step", nextStep);
      window.history.pushState({}, "", url);
    }
    setCurrentStep(nextStep);
  };

  const handleStepBack = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      // Update URL and state
      if (typeof window !== "undefined") {
        const url = new URL(window.location);
        url.searchParams.set("step", prevStep);
        window.history.pushState({}, "", url);
      }
      setCurrentStep(prevStep);
    }
  };

  if (!isClient || !currentMonth) {
    return null;
  }

  return (
    <>
      {currentStep <= 3 && <HeaderSection />}
      <div className="">
        <div className="container mx-auto __gapTop relative">
          {currentStep === 1 && (
            <Step1
              allFormData={allFormData}
              setAllFormData={setAllFormData}
              servicesListData={servicesListData}
              serviceDetailsPageData={serviceDetailsPageData}
              handleContinue={handleStepContinue}
              handleBack={handleStepBack}
              userProfile={userProfile}
            />
          )}
          {currentStep === 2 && (
            <Step2
              allFormData={allFormData}
              setAllFormData={setAllFormData}
              dateTimeData={dateTimeData}
              setDateTimeData={setDateTimeData}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
              handleContinue={handleStepContinue}
              handleBack={handleStepBack}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              showTimePicker={showTimePicker}
              setShowTimePicker={setShowTimePicker}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              datePickerRef={datePickerRef}
              timePickerRef={timePickerRef}
              isClient={isClient}
            />
          )}
          {currentStep === 3 && (
            <Step3
              allFormData={allFormData}
              setAllFormData={setAllFormData}
              servicesListData={servicesListData}
              booking={booking}
              handleContinue={handleStepContinue}
              handleBack={handleStepBack}
              dispatch={dispatch}
            />
          )}
          {currentStep === 4 && (
            <Step4
              allFormData={allFormData}
              servicesListData={servicesListData}
              booking={booking}
              handleBack={handleStepBack}
            />
          )}
        </div>
      </div>
      <div
        className={`hidden lg:flex justify-end items-end w-[70%] z-[-1] absolute right-0 h-full
          ${currentStep === 1 ? "top-[85%] -translate-y-1/2" : ""}
          ${currentStep === 2 ? "top-[80%]" : ""}
          ${currentStep === 3 ? "top-[60%]" : ""}
          ${currentStep === 4 ? "top-[45%]" : ""}
        `}
      >
        <Image
          src={image}
          width={400}
          height={400}
          alt="Sukaii Logo"
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
};

const BookTestPage = () => (
  <ProtectedRoute>
    <TestBookingSystem />
  </ProtectedRoute>
);

export default BookTestPage;
