"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnquiryFormData,
  clearEnquiryFormData,
  submitEnquiryForm, // Import the thunk action
} from "../../../features/store/enquiryFormSlice";
import toast from "react-hot-toast";
import image from "../../assets/woman/support-woman.jpg";
import Button from "../ui/Button";
import Link from "next/link";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import texture from "../../assets/woman/shape.png";

export default function EnquiryForm({ data }) {
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    contact: "",
    address: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const enquiryState = useSelector((state) => state.enquiryForm);

  useEffect(() => {
    if (enquiryState.status === 1) {
      toast.success(enquiryState.message || "Form submitted successfully!");
      
      setFormData({
        full_name: "",
        gender: "",
        age: "",
        contact: "",
        address: "",
        remarks: "",
      });
      setErrors({});
    } else if (enquiryState.status === 0) {
      toast.error(enquiryState.error || "Failed to submit form. Please try again.");
    }
  }, [enquiryState.status, enquiryState.message, enquiryState.error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (
      !formData.full_name ||
      formData.full_name.length < 2 ||
      formData.full_name.length > 255
    ) {
      tempErrors.full_name = "Full name must be between 2 and 255 characters.";
    }

    if (
      !formData.gender ||
      !["Male", "Female", "Other"].includes(formData.gender)
    ) {
      tempErrors.gender = "Please select a valid gender.";
    }

    if (
      !formData.age ||
      isNaN(formData.age) ||
      formData.age < 0 ||
      formData.age > 120
    ) {
      tempErrors.age = "Age must be a number between 0 and 120.";
    }

    if (
      !formData.contact ||
      formData.contact.length < 6 ||
      formData.contact.length > 20
    ) {
      tempErrors.contact = "Contact must be between 6 and 20 digits.";
    }

    if (!formData.address) {
      tempErrors.address = "Address is required.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const payload = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : "",
    };

    dispatch(submitEnquiryForm(payload));
  };

  const quickHelpItems = data?.content?.contact_us_page?.quick_help || [];
  const ctaBanner = data?.content?.contact_us_page;
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto">
        <div className="__gapTop px-4 md:px-0">
          <h2 className="text-gray-900 section__heading mb-5">Quick Help</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickHelpItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] rounded-[22px] p-4 md:p-8 __cardShadow cursor-pointer"
              >
                <div className="flex flex-col items-start space-y-3">
                  <div>
                    <Image
                      src={"/support-icon/icon.png"}
                      alt={item.title}
                      width={24}
                      height={30}
                    />
                  </div>
                  <p className="text-[15px] font-medium text-gray-700 leading-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="__gapTop2 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:gap-5">
          {/* Image Section */}
          <div className="h-full">
            <Image
              src={image}
              alt="Support Image"
              width={500}
              height={400}
              className="md:rounded-r-[50px] shadow-lg md:h-full h-[400px] object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-3/5 w-full md:px-8 mt-4 md:pt-0 p-[12px] lg:px-12">
            <h2 className="section__heading text-gray-800 mb-5">
              Submit Your Enquiry
            </h2>

            <form className="space-y-6 md:ml-14" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="md:flex flex-col md:flex-row items-start md:items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Full Name</p>
                <div className="w-full flex flex-col">
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Gender and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Gender */}
                <div className="md:flex flex-col md:flex-row items-start md:items-center w-full">
                  <p className="md:min-w-[100px] pb-2 md:pb-0">Gender</p>
                  <div className="w-full flex flex-col">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="px-4 py-4 bg-gray-50 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700"
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                {/* Age */}
                <div className="md:flex flex-col md:flex-row items-start md:items-center w-full md:pl-10">
                  <p className="md:min-w-[100px] pb-2 md:pb-0">Age</p>
                  <div className="w-full flex flex-col">
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="px-4 py-4 w-full bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="md:flex flex-col md:flex-row items-start md:items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Contact</p>
                <div className="w-full flex flex-col">
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="md:flex flex-col md:flex-row items-start md:items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Address</p>
                <div className="w-full flex flex-col">
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Remarks */}
              <div className="md:flex flex-col md:flex-row items-start md:items-center w-full">
                <p className="md:min-w-[100px] pb-2 md:pb-0">Remarks</p>
                <div className="w-full flex flex-col">
                  <textarea
                    name="remarks"
                    placeholder="Remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                  {errors.remarks && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.remarks}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:flex items-center w-full mt-10">
                <p className="md:min-w-[100px]"> </p>
                <Button
                  type="submit"
                  disabled={enquiryState.status === "loading"}
                  className="__secondary-bg text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {enquiryState.status === "loading" ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="container mx-auto __gapTop2 px-4 md:px-0">
          <div className="__primary-bg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 md:px-26 md:pr-20 relative">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 items-center relative z-10">
              <div className="text-left">
                <h3 className="section__heading text-white mb-2 sm:mb-3">
                  {ctaBanner?.title_two}
                </h3>
                <p className="text-white text-opacity-90 text-sm sm:text-[17px]">
                  {ctaBanner?.description_two}
                </p>
              </div>

              <Link href="/our-services" passHref>
                <div className="flex justify-start mt-4 md:mt-0 relative">
                  <Button
                    variant="outline"
                    className="__secondary-bg text-white"
                  >
                    {ctaBanner?.button_name}
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-[1200px] right-0 -z-10 hidden md:block">
            <Image src={texture} alt=" " className="h-[400px] w-[400px]" />
          </div>
          <div className="px-4 md:px-10">
            <BrandLogo />
          </div>
        </div>
      </div>
    </div>
  );
}