import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import image1 from "../assets/book-test/heart.png";
import image2 from "../assets/book-test/lab.png";
import image3 from "../assets/book-test/medical-team.png";
import { useSelector } from "react-redux";
import Button from "../components/ui/Button";

const Step4 = ({ allFormData, servicesListData, booking, handleBack }) => {
  const [showInvoice, setShowInvoice] = useState(false);
  
  const paymentState = useSelector((state) => state.payment);

  useEffect(() => {
    // Add a new entry to browser history when reaching thank you page
    if (typeof window !== "undefined") {
      window.history.pushState({ step: 4 }, "", window.location.href);
    }
  }, []);
  
  const testPackages = Array.isArray(servicesListData?.packages)
    ? servicesListData.packages
    : [];

  const findSelectedPackages = () => {
    if (!allFormData.selectedTest || !Array.isArray(allFormData.selectedTest)) {
      return [];
    }
    
    return allFormData.selectedTest
      .map(selected => {
        if (selected.packageData) {
          console.log("Step4 Debug - Found package from packageData:", selected.packageData);
          return selected.packageData;
        }
        
        const packageId = selected.id || selected.value;
        const found = testPackages.find(pkg => 
          String(pkg.id) === String(packageId) || pkg.slug === packageId
        );
        
        if (found) {
          console.log("Step4 Debug - Found package from testPackages:", found);
        } else {
          console.log("Step4 Debug - Package not found for:", packageId);
        }
        
        return found;
      })
      .filter(Boolean); // Remove any undefined values
  };

  const selectedPackages = findSelectedPackages();
  console.log("Step4 Debug - Final selectedPackages:", selectedPackages);

  const formatDate = (dateStr) => {
    if (!dateStr) return "[Select Date]";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  const formatTimeSlot = (slot) => {
    if (!slot) return "[Select Time]";
    if (typeof slot === 'object' && slot.label) {
      return slot.label;
    }
    const [start, end] = String(slot).split("-");
    const to12hr = (t) => {
      if (!t) return "";
      let [h, m] = t.split(":");
      h = parseInt(h, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m} ${ampm}`;
    };
    return `${to12hr(start)}`;
  };

  const getTotalPaid = () => {
    if (paymentState?.data?.summary?.final_amount) {
      return paymentState.data.summary.final_amount;
    }
    if (allFormData.totalCost) return allFormData.totalCost;
    if (booking?.data?.totalCost) return booking.data.totalCost;
    return 0;
  };

  const formatPrice = (price) => `RM ${parseFloat(price || 0).toFixed(2)}`;

  const stripBr = (str) => str?.replace(/<br\s*\/?>(\s*)?/gi, " ").trim();

  console.log("Step4 Debug - Full allFormData:", allFormData);
  console.log("Step4 Debug - Date:", allFormData.selectedDate);
  console.log("Step4 Debug - Time:", allFormData.selectedTimeSlot);

  const getSelectedTests = () => {
    const tests = selectedPackages.map(pkg => pkg.name).join(", ");
    return tests || "No Packages Selected";
  };
  return (
    <div className="">
      <div className="md:flex items-center justify-center gap-28">
        <div className="md:rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src="/thank-you-page/thank-you.jpg"
            alt="thank you bg-image"
            width={460}
            height={100}
            className="object-cover md:rounded-4xl h-[350] md:h-[800px] w-[full]"
          />
        </div>

        <div className="p-6 md:p-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[30px] md:text-[50px] font-[600] __secondary-text">
              Congratulations!
            </h2>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-[400] leading-[135%] tracking-[-2%] text-gray-700 mb-6">
            Your test is booked!
          </h2>

          <div className="space-y-4 text-[15px] w-full">
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Full Name
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.fullName || "John Doe"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Gender
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.gender
                  ? allFormData.gender.charAt(0).toUpperCase() + allFormData.gender.slice(1).toLowerCase()
                  : "Male"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Age
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.age || "36"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Contact
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.contact || "+60 123 456 789"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Address
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.streetName || "3rd Street, Malaysia"} -{" "}
                {allFormData.pincode || "19028"}
              </span>
            </div>
            {allFormData.remarks && (
              <div className="flex gap-4">
                <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                  Remarks
                </span>
                <span className="font-[600] text-[20px]">
                  {allFormData.remarks}
                </span>
              </div>
            )}
            
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Selected Tests
              </span>
              <div className="font-[600] text-[20px]">
                {allFormData.selectedTest && allFormData.selectedTest.length > 0 ? (
                  allFormData.selectedTest
                    .map(test => stripBr(test.label || test.name || test.title))
                    .join(", ")
                ) : selectedPackages.length > 0 ? (
                  selectedPackages
                    .map(pkg => stripBr(pkg.name || pkg.title))
                    .join(", ")
                ) : (
                  "No Packages Selected"
                )}
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Date
              </span>
              <span className="font-[600] text-[20px]">
                {formatDate(allFormData.selectedDate || allFormData.date)}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Time Slot
              </span>
              <span className="font-[600] text-[20px]">
                {formatTimeSlot(allFormData.timeSlot) || "12:00 PM to 02:00 PM"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Total Paid
              </span>
              <span className="font-[600] text-[20px]">
                {allFormData.totalCost && !isNaN(parseFloat(allFormData.totalCost)) && parseFloat(allFormData.totalCost) > 0
                  ? `RM ${parseFloat(allFormData.totalCost).toFixed(2)} (Including Tax)`
                  : paymentState?.data?.summary?.final_amount
                  ? `RM ${parseFloat(paymentState.data.summary.final_amount).toFixed(2)} (Including Tax)`
                  : "RM 0.00 (Including Tax)"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-6">
            <div className="flex ____shadow-card items-center space-x-3 bg-white px-7 py-5 rounded-2xl">
              <Image
                src={image2}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />
              <span className="text-sm leading-[16px]">
                Book a <br className="d-none md:block" /> New Test
              </span>
            </div>
            <div className="flex ____shadow-card items-center space-x-3 bg-white px-7 py-5 rounded-2xl">
              <Image
                src={image1}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />
              <span className="text-sm leading-[16px]">
                Upload Past <br className="d-none md:block" /> Reports
              </span>
            </div>
            <div className="flex ____shadow-card items-center space-x-3 bg-white px-7 py-5 rounded-2xl">
              <Image
                src={image3}
                alt="thank you bg-image"
                width={35}
                height={35}
                className="object-cover"
              />
              <span className="text-sm leading-[16px]">
                View Health <br className="d-none md:block" /> Summary
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Link href="/user-dashboard">
              <Button className="__secondary-bg text-white">
                Dashboard
              </Button>
            </Link>
            <Button 
              className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;