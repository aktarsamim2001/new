"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  Star,
  CheckCircle,
  Calendar,
} from "lucide-react";
import DateOfBirthPicker from "../components/dashboard/DateOfBirthPicker";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import { service } from "@/features/shared/_services/api_service";
import image from "../../app/assets/woman/shape.png";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "@/features/store/authSlice";
import { verifyOrResendOtp } from "@/features/store/otpVerificationSlice";
import { updateProfile } from "@/features/store/profileSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const slide = {
  reviewAvatars: [
    { name: "AB", bg: "bg-pink-500" },
    { name: "CD", bg: "bg-blue-500" },
    { name: "EF", bg: "bg-green-500" },
    { image: "/profile-image.png", bg: "" },
  ],
  extra: "+5",
  patients: "2,500+",
  rating: "4.9",
  reviews: "(1.2k reviews)",
};



function CompleteProfileContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const datePickerRef = useRef(null);
  const hasMounted = useHasMounted();

  // Get auth state from Redux
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  console.log("Auth State:", auth); // Debug log

  // Use profileData from Redux state
  const profileData = auth.profileData;
  console.log("Profile Data:", profileData); // Debug log

  // Determine login type based on auth data
  const loginType = profileData?.email ? 'email' : profileData?.mobile ? 'mobile' : 'email';
  
  // Initialize form data from auth state
  const [formData, setFormData] = useState({
    fullName: auth.profileData?.name || "",
    email: auth.profileData?.email || "",
    phoneNumber: auth.profileData?.mobile || "",
    gender: "",
    dateOfBirth: "",
    addressLine: "",
    area: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [dateTimeData, setDateTimeData] = useState({
    date: "",
    displayDate: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 25); // Default to 25 years ago
    return defaultDate;
  });

  const [verificationState, setVerificationState] = useState({
    mobileVerified: !!auth.profileData?.mobile,
    emailVerified: !!auth.profileData?.email,
    showEmailOtpField: false,
    showMobileOtpField: false,
    emailOtp: "",
    mobileOtp: "",
    loadingEmailOtp: false,
    loadingMobileOtp: false,
    verifyingEmailOtp: false,
    verifyingMobileOtp: false,
    loginType: auth.profileData?.email ? 'email' : auth.profileData?.mobile ? 'mobile' : 'email',
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when auth state changes
  useEffect(() => {
    if (auth.profileData) {
      setFormData(prev => ({
        ...prev,
        fullName: auth.profileData.name || prev.fullName,
        email: auth.profileData.email || prev.email,
        phoneNumber: auth.profileData.mobile || prev.phoneNumber,
      }));
      setVerificationState(prev => ({
        ...prev,
        mobileVerified: !!auth.profileData.mobile,
        emailVerified: !!auth.profileData.email,
        loginType: auth.profileData.email ? 'email' : auth.profileData.mobile ? 'mobile' : prev.loginType
      }));
    }
  }, [auth.profileData]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dateTimeData.date) {
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: dateTimeData.date,
      }));
    }
  }, [dateTimeData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset email verification if email is changed
    if (name === "email" && verificationState.emailVerified) {
      setVerificationState((prev) => ({
        ...prev,
        emailVerified: false,
        showEmailOtpField: false,
        emailOtp: "",
      }));
    }

    if (error) setError("");
  };

  const handleOtpChange = (type, e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setVerificationState((prev) => ({
      ...prev,
      [type === "email" ? "emailOtp" : "mobileOtp"]: value,
    }));
    if (error) setError("");
  };

  const handleSendMobileOtp = async () => {
    if (!formData.phoneNumber) {
      setError("Please enter your phone number");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setVerificationState((prev) => ({ ...prev, loadingMobileOtp: true }));

    try {
      await dispatch(verifyOrResendOtp(formData.phoneNumber, "mobile"));
      setVerificationState((prev) => ({
        ...prev,
        loadingMobileOtp: false,
        showMobileOtpField: true,
      }));
    } catch (error) {
      setVerificationState((prev) => ({
        ...prev,
        loadingMobileOtp: false,
      }));
      setError(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (verificationState.mobileOtp.length !== 4) {
      setError("Please enter a 4-digit OTP");
      return;
    }

    setVerificationState((prev) => ({ ...prev, verifyingMobileOtp: true }));

    try {
      const result = await dispatch(
        verifyOrResendOtp(
          formData.phoneNumber,
          "mobile",
          verificationState.mobileOtp
        )
      );

      if (result.status === 1) {
        setVerificationState((prev) => ({
          ...prev,
          verifyingMobileOtp: false,
          mobileVerified: true,
          showMobileOtpField: false,
          mobileOtp: "",
        }));
      }
    } catch (error) {
      setVerificationState((prev) => ({
        ...prev,
        verifyingMobileOtp: false,
      }));
      setError(error?.response?.data?.message || "Failed to verify OTP");
    }
  };

  const handleEmailOtpChange = (e) => handleOtpChange("email", e);

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setVerificationState((prev) => ({ ...prev, loadingEmailOtp: true }));

    try {
      await dispatch(verifyOrResendOtp(formData.email, "email"));
      setVerificationState((prev) => ({
        ...prev,
        loadingEmailOtp: false,
        showEmailOtpField: true,
      }));
    } catch (error) {
      setVerificationState((prev) => ({
        ...prev,
        loadingEmailOtp: false,
      }));
      setError(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (verificationState.emailOtp.length !== 4) {
      setError("Please enter a 4-digit OTP");
      return;
    }

    setVerificationState((prev) => ({ ...prev, verifyingEmailOtp: true }));

    try {
      const result = await dispatch(
        verifyOrResendOtp(formData.email, "email", verificationState.emailOtp)
      );

      if (result.status === 1) {
        setVerificationState((prev) => ({
          ...prev,
          verifyingEmailOtp: false,
          emailVerified: true,
          showEmailOtpField: false,
          emailOtp: "",
        }));
      }
    } catch (error) {
      setVerificationState((prev) => ({
        ...prev,
        verifyingEmailOtp: false,
      }));
      setError(error?.response?.data?.message || "Failed to verify OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify that both email and mobile are verified
    if (!verificationState.emailVerified || !verificationState.mobileVerified) {
      toast.error("Both email and mobile number must be verified before submitting");
      return;
    }

    // Validation: check all required fields
    const requiredFields = {
      fullName: "Full Name",
      email: "Email",
      phoneNumber: "Phone Number",
      gender: "Gender",
      dateOfBirth: "Date of Birth",
      addressLine: "Address",
      area: "Area",
      city: "City",
      country: "Country",
      zipCode: "Zip Code"
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label);

    if (emptyFields.length > 0) {
      toast.error(`Please fill in: ${emptyFields.join(", ")}`);
      return;
    }

    // Email validation
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation
    if (!formData.phoneNumber.match(/^[0-9]{10}$/)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!verificationState.mobileVerified) {
      toast.error("Mobile number must be verified");
      return;
    }

    if (!verificationState.emailVerified) {
      toast.error("Email must be verified");
      return;
    }

    if (!["Male", "Female", "Other"].includes(formData.gender)) {
      toast.error("Please select a valid gender");
      return;
    }

    // Age validation (must be 18 or older)
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0)) {
      toast.error("You must be 18 years or older");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const profilePayload = {
        type: "complete_profile",
        name: formData.fullName,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
        mobile: formData.phoneNumber,
        address_type: "Home",
        street: formData.addressLine,
        city: formData.city,
        state: formData.area,
        country: formData.country,
        zip: formData.zipCode,
        is_default: true,
      };

      try {

        console.log("Sending profile payload:", profilePayload); // Debug log
        const response = await service.updateProfile(profilePayload);
        console.log("Update Profile Response:", response); // Debug log

        if (response?.data?.status === 1) {
          try {
            const profileResponse = await service.userProfile();

            if (profileResponse?.data?.status === 1) {
              // Update auth state with fresh data
              dispatch({
                type: 'auth/setUser',
                payload: {
                  token: localStorage.getItem("accessToken"),
                  profileData: profileResponse.data.data
                }
              });

              // Show success message and redirect
              toast.success('Profile updated successfully');

              // Get callback URL and redirect immediately
              const callbackUrl = searchParams.get('callbackUrl');
              const redirectUrl = callbackUrl || "/user-dashboard";
              router.push(redirectUrl);
            } else {
              throw new Error(profileResponse?.data?.message || "Failed to fetch updated profile");
            }
          } catch (profileError) {
            toast.dismiss(loadingToast);
            toast.error(profileError.message || "Failed to fetch updated profile");
          }
        } else {
          toast.dismiss(loadingToast);
          toast.error(response.data.message || "Failed to update profile");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-center bg-white">
      {/* Background shape (mobile only) */}
      <div className="absolute top-0 right-0 w-[300px] h-[280px] md:hidden pointer-events-none z-0">
        <Image
          src={image}
          alt="Texture"
          fill
          style={{ objectFit: "contain", objectPosition: "top right" }}
          className="opacity-70"
          priority
        />
      </div>

      {/* Form section */}
      <div className="order-2 lg:order-none flex-1 flex flex-col justify-center items-center px-4 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <div className="mb-5 md:mb-8 flex flex-col items-start">
            <Image
              src="/sukaii-logo.png"
              alt="Sukaii Logo"
              width={150}
              height={50}
            />
          </div>

          <h2 className="text-3xl md:text-[56px] leading-[56px] font-[500] text-gray-900 mb-4">
            <span className="block">Complete Your</span> Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number with verification */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Phone Number
                {hasMounted && verificationState.mobileVerified && (
                  <span className="ml-2 inline-flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={
                    verificationState.mobileVerified
                      ? "bg-green-50 text-green-800 cursor-not-allowed"
                      : ""
                  }
                  disabled={
                    verificationState.mobileVerified ||
                    verificationState.loginType === "mobile"
                  }
                  required
                />
                {!verificationState.mobileVerified &&
                  verificationState.loginType === "email" && (
                    <button
                      type="button"
                      onClick={handleSendMobileOtp}
                      disabled={
                        verificationState.loadingMobileOtp ||
                        !formData.phoneNumber
                      }
                      className="px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {verificationState.loadingMobileOtp
                        ? "Sending..."
                        : "Verify"}
                    </button>
                  )}
              </div>
            </div>

            {/* Mobile OTP Field */}
            {verificationState.showMobileOtpField && (
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  Enter Mobile OTP
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={verificationState.mobileOtp}
                    onChange={(e) => handleOtpChange("mobile", e)}
                    className="text-left text-lg tracking-widest"
                    placeholder="0000"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyMobileOtp}
                    disabled={
                      verificationState.verifyingMobileOtp ||
                      verificationState.mobileOtp.length !== 4
                    }
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {verificationState.verifyingMobileOtp
                      ? "Verifying..."
                      : "Confirm"}
                  </button>
                </div>
              </div>
            )}

            {/* Email with verification */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Email
                {hasMounted && verificationState.emailVerified && (
                  <span className="ml-2 inline-flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={
                    verificationState.emailVerified
                      ? "bg-green-50 text-green-800"
                      : ""
                  }
                  disabled={
                    verificationState.emailVerified ||
                    verificationState.loginType === "email"
                  }
                  required
                />
                {!verificationState.emailVerified &&
                  verificationState.loginType === "mobile" && (
                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={
                        verificationState.loadingEmailOtp || !formData.email
                      }
                      className="px-4 py-3 bg-pink-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {verificationState.loadingEmailOtp
                        ? "Sending..."
                        : "Verify"}
                    </button>
                  )}
              </div>
            </div>

            {/* Email OTP Field */}
            {verificationState.showEmailOtpField && (
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  Enter Email OTP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationState.emailOtp}
                    onChange={handleEmailOtpChange}
                    className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all text-left text-lg tracking-widest"
                    placeholder="0000"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={
                      verificationState.verifyingEmailOtp ||
                      verificationState.emailOtp.length !== 4
                    }
                    className="px-4 py-3 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {verificationState.verifyingEmailOtp
                      ? "Verifying..."
                      : "Confirm"}
                  </button>
                </div>
              </div>
            )}

            {/* Gender */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Gender
              </label>
              <Select
                name="gender"
                value={formData.gender}
                onValueChange={(value) =>
                  handleChange({ target: { name: "gender", value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth with DatePicker */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Date of Birth
              </label>
              <DateOfBirthPicker
                dateData={dateTimeData}
                setDateData={setDateTimeData}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                datePickerRef={datePickerRef}
                isClient={hasMounted}
              />
            </div>

            {/* Address Line */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Address Line
              </label>
              <Input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Street address, apartment, suite, etc."
                required
              />
            </div>

            {/* Area/Location */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Area/Location
              </label>
              <Input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Neighborhood, locality, area"
                required
              />
            </div>

            {/* City and Country - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  City
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                  Country
                </label>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-[16px] font-[400] text-gray-700 mb-3">
                Zip Code
              </label>
              <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Postal/Zip code"
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-pink-600 mt-6 disabled:cursor-not-allowed transition-all"
              disabled={
                !verificationState.mobileVerified ||
                !verificationState.emailVerified ||
                isSubmitting
              }
            >
              {isSubmitting ? "Completing Profile..." : "Complete Profile"}
            </Button>
          </form>
        </div>
      </div>

      {/* Image section (desktop only) */}
      <div className="order-1 lg:order-2 flex-1 hidden lg:flex items-center justify-center relative h-screen">
        <div className="w-full h-full max-w-3xl flex flex-col items-center justify-center relative p-5">
          <div className="relative w-full h-full rounded-[40px] overflow-hidden">
            <Image
              src="/login-banner/login-banner.jpg"
              alt="Sukaii Health"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 px-6 py-4 flex flex-col items-center justify-center gap-2 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
            <div className="flex -space-x-3">
              {slide.reviewAvatars.map((avatar, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                >
                  {avatar.image ? (
                    <Image
                      src={avatar.image}
                      alt={`Avatar`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    avatar.name
                  )}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm ml-0.5">
                {slide.extra}
              </div>
            </div>
            <div className="flex flex-col items-start mt-2">
              <div className="font-[600] text-gray-900 text-[18px] md:text-[20px]">
                {slide.patients}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {slide.rating}
                </span>
                <span className="text-xs text-gray-500">{slide.reviews}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompleteProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileContent />
    </Suspense>
  );
}
