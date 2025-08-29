"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/store/profileSlice";
import { createBooking } from "../../features/store/bookingSlice";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import image from "../assets/woman/shape.png";
import image1 from "../assets/book-test/heart.png";
import image2 from "../assets/book-test/lab.png";
import image3 from "../assets/book-test/medical-team.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { fetchServiceDetailsPageData } from "../../features/store/serviceDetailsPageSlice";
import { fetchServicesList } from "../../features/store/servicesListSlice";
import { fetchAddressList } from "../../features/store/addressListSlice";
import ProtectedRoute from "@/features/Routes/ProtectedRoute";
import HeaderSection from "./HeaderSection";
import ProfessionalDateTimePicker from "./ProfessionalDateTimePicker";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const TestBookingSystem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const { data: userProfile } = useSelector((state) => state.userProfile || {});
  const serviceDetailsPageData = useSelector(
    (state) => state?.serviceDetailsPage?.data
  );
  const servicesListData = useSelector((state) => state?.servicesList?.data);
  const addressList = useSelector((state) => state.addressList.data);
  const booking = useSelector((state) => state.booking || {});

  const getStepFromParamsOrStorage = () => {
    if (typeof window !== "undefined") {
      const urlStep = searchParams?.get("step");
      if (urlStep && !isNaN(urlStep)) return parseInt(urlStep, 10);
      const savedStep = sessionStorage.getItem("bookingCurrentStep");
      return savedStep ? parseInt(savedStep, 10) : 1;
    }
    return 1;
  };
  const [currentStep, setCurrentStep] = useState(getStepFromParamsOrStorage);

  const [allFormData, setAllFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedFormData = sessionStorage.getItem("bookingFormData");
      return savedFormData ? JSON.parse(savedFormData) : {};
    }
    return {};
  });

  const [dateTimeData, setDateTimeData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedDateTime = sessionStorage.getItem("bookingDateTimeData");
      return savedDateTime
        ? JSON.parse(savedDateTime)
        : {
            date: "",
            timeSlot: "",
          };
    }
    return {
      date: "",
      timeSlot: "",
    };
  });

  const [isClient, setIsClient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null); 
  const [validationErrors, setValidationErrors] = useState({});

  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    setCurrentMonth(new Date());
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(fetchServicesList());
      dispatch(updateProfile({ userId: 1 }));
      dispatch(fetchServiceDetailsPageData({ package_id: "3" }));
      dispatch(fetchAddressList());
    }
  }, [dispatch, isClient]);

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
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bookingCurrentStep", currentStep.toString());
      const params = new URLSearchParams(window.location.search);
      params.set("step", currentStep);
      router.push(`?${params.toString()}`, { shallow: true });
    }
  }, [currentStep, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bookingFormData", JSON.stringify(allFormData));
    }
  }, [allFormData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "bookingDateTimeData",
        JSON.stringify(dateTimeData)
      );
    }
  }, [dateTimeData]);

  useEffect(() => {
    return () => {
      if (currentStep === 4 && typeof window !== "undefined") {
        sessionStorage.removeItem("bookingCurrentStep");
        sessionStorage.removeItem("bookingFormData");
        sessionStorage.removeItem("bookingDateTimeData");
      }
    };
  }, [currentStep]);

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

  const handleStepContinue = (stepData) => {
    const updatedFormData = { ...allFormData, ...stepData };
    setAllFormData(updatedFormData);
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlStep = searchParams?.get("step");
      if (urlStep && !isNaN(urlStep)) {
        const stepNum = parseInt(urlStep, 10);
        if (stepNum !== currentStep) setCurrentStep(stepNum);
      }
    }
  }, [searchParams]);

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
              userProfile={userProfile} // Add this line
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
              dispatch={dispatch}
            />
          )}
          {currentStep === 4 && (
            <Step4
              allFormData={allFormData}
              servicesListData={servicesListData}
              booking={booking}
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
