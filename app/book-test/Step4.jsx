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
    const [start, end] = slot.split("-");
    const to12hr = (t) => {
      if (!t) return "";
      let [h, m] = t.split(":");
      h = parseInt(h, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m} ${ampm}`;
    };
    return `${to12hr(start)} to ${to12hr(end)}`;
  };
import Image from "next/image";
import Link from "next/link";
import image1 from "../assets/book-test/heart.png";
import image2 from "../assets/book-test/lab.png";
import image3 from "../assets/book-test/medical-team.png";
import { useSelector } from "react-redux";
import Button from "../components/ui/Button";

const Step4 = ({ allFormData, servicesListData, booking }) => {
  // Get payment details from redux (reviewSlice)
  const paymentState = useSelector((state) => state.payment);
  const testPackages = Array.isArray(servicesListData?.packages)
    ? servicesListData.packages
    : [];
  // More robust package finding (like Step3)
  const findSelectedPackage = () => {
    if (!Array.isArray(testPackages) || testPackages.length === 0) {
      return null;
    }
    const selectedId = allFormData.selectedTest;
    let found = testPackages.find(t => String(t.id) === String(selectedId));
    if (found) return found;
    found = testPackages.find(t => Number(t.id) === Number(selectedId));
    if (found) return found;
    return testPackages[0];
  };
  const selectedTestObj = findSelectedPackage();

  // Helper to get package price from paymentState or fallback
  const getPackagePrice = () => {
    if (paymentState?.data?.packages && paymentState.data.packages[0]?.price) {
      return paymentState.data.packages[0].price;
    }
    if (selectedTestObj?.price) return selectedTestObj.price;
    return null;
  };
  // Helper to get total paid from paymentState or fallback
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
                Selected Test
              </span>
              <span className="font-[600] text-[20px]">
                {selectedTestObj
                  ? `${stripBr(selectedTestObj.name)}`
                  : "No Package Selected"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 font-[400] text-[20px] min-w-[140px]">
                Date
              </span>
              <span className="font-[600] text-[20px]">
                {formatDate(allFormData.date) || "14 / 05 / 2025"}
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
            <div className="flex ____shadow-card items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
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
            <div className="flex ____shadow-card items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
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
            <div className="flex ____shadow-card items-center space-x-2 bg-white px-5 py-3 rounded-2xl">
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

          <Link href="/user-dashboard">
            <Button className="mt-6 __secondary-bg text-white">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Step4;