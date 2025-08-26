import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/store/bookingSlice";
import { fetchPaymentDetails } from "../../features/store/reviewSlice";
import Link from "next/link";

const Step3 = ({
  allFormData,
  setAllFormData,
  servicesListData,
  booking,
  handleContinue,
  dispatch,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...allFormData,
    },
  });

  const [dateError, setDateError] = useState("");

  const paymentState = useSelector((state) => state.payment);
  console.log("paymentState:", paymentState);
  const address_id = useSelector(
    (state) => state.addressList?.data?.[0]?.id || null
  );

  const watchedCouponCode = watch("applyCode");

  const testPackages = Array.isArray(servicesListData?.packages)
    ? servicesListData.packages
    : [];
  console.log("servicesListData.packages:", servicesListData?.packages);
  console.log("allFormData.selectedTest:", allFormData.selectedTest);

  // More robust package finding
  const findSelectedPackage = () => {
    if (!Array.isArray(testPackages) || testPackages.length === 0) {
      return null;
    }

    const selectedId = allFormData.selectedTest;
    console.log(
      "Looking for package with ID:",
      selectedId,
      "Type:",
      typeof selectedId
    );

    // Try multiple matching strategies
    let found = testPackages.find((t) => String(t.id) === String(selectedId));
    if (found) {
      console.log("Found package by string match:", found);
      return found;
    }

    found = testPackages.find((t) => Number(t.id) === Number(selectedId));
    if (found) {
      console.log("Found package by number match:", found);
      return found;
    }

    // Log all available packages for debugging
    console.log(
      "Available packages:",
      testPackages.map((p) => ({ id: p.id, name: p.name, type: typeof p.id }))
    );

    // Return first package as fallback
    console.log("Using first package as fallback:", testPackages[0]);
    return testPackages[0];
  };

  const selectedTestObj = findSelectedPackage();

  const stripBr = (str) => str?.replace(/<br\s*\/?>(\s*)?/gi, " ").trim();

  // Format date as DD / MM / YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "[Select Date]";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  // Format time as hh:mm AM/PM (for slot like '14:00-15:00')
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

  const getBookingSummary = () => {
    const packageName = selectedTestObj
      ? stripBr(selectedTestObj.name)
      : "the selected package";
    const scheduledDate = formatDate(allFormData.date);
    const scheduledTime = formatTimeSlot(allFormData.timeSlot);
    return `Your booking for ${packageName} is scheduled on ${scheduledDate} at ${scheduledTime}.`;
  };

  const formatPrice = (price) => {
    if (!price) return "RM 0.00";
    return `RM ${parseFloat(price).toFixed(2)}`;
  };

  useEffect(() => {
    setValue("bookingSummary", getBookingSummary());
  }, [
    allFormData.selectedTest,
    allFormData.date,
    allFormData.timeSlot,
    servicesListData,
    setValue,
  ]);

  useEffect(() => {
    if (paymentState?.data?.summary?.final_amount) {
      setValue("totalCost", paymentState.data.summary.final_amount);
    }
  }, [paymentState?.data?.summary?.final_amount, setValue]);

  useEffect(() => {
    let selectedPackageId = null;
    if (Array.isArray(servicesListData?.packages)) {
      const selected = servicesListData.packages.find(
        (t) => String(t.id) === String(allFormData.selectedTest)
      );
      if (selected) {
        selectedPackageId = parseInt(selected.id, 10);
      } else if (servicesListData.packages.length > 0) {
        selectedPackageId = parseInt(servicesListData.packages[0].id, 10);
      }
    }
    const payload = {
      package_ids: Number.isInteger(selectedPackageId)
        ? [selectedPackageId]
        : [],
    };
    if (watchedCouponCode) {
      payload.coupon_code = watchedCouponCode;
    }
    dispatch(fetchPaymentDetails(payload));
  }, [watchedCouponCode, allFormData.selectedTest, dispatch, servicesListData]);

  const onSubmit = (data) => {
    setDateError("");
    if (data.date) {
      const selected = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setDateError("Schedule date cannot be in the past");
        return;
      }
    }

    let schedule_time = "";
    if (data.timeSlot) {
      const start = data.timeSlot.split("-")[0];
      schedule_time = /^\d{2}:\d{2}$/.test(start) ? `${start}:00` : start;
    }

    // Always provide a valid package id: use selected or fallback to first available
    let selectedPackageId = null;
    if (Array.isArray(servicesListData?.packages)) {
      const selected = servicesListData.packages.find(
        (t) => String(t.id) === String(data.selectedTest)
      );
      if (selected) {
        selectedPackageId = parseInt(selected.id, 10);
      } else if (servicesListData.packages.length > 0) {
        selectedPackageId = parseInt(servicesListData.packages[0].id, 10);
      }
    }
    const payload = {
      address_id,
      package_ids: Number.isInteger(selectedPackageId)
        ? [selectedPackageId]
        : [],
      schedule_date: data.date,
      schedule_time,
      payment_method: data.paymentMode,
      terms_condition: data.agreeTerms,
      remarks: data.remarks || "",
    };
    if (data.applyCode) {
      payload.coupon_code = data.applyCode;
    }

    dispatch(createBooking(payload)).then(() => {
      if (booking.status === 1) {
        toast.success(booking.message || "Booking completed successfully!");
      }
      // Always pass the exact value shown in Step 3's Total Cost field
      handleContinue({
        ...data,
        totalCost: paymentState?.data?.summary?.final_amount || "",
      });
    });
  };

  return (
    <div>
      <div className="rounded-lg px-4 lg:w-10/12 lg:mx-auto md:p-6 md:pt-0 flex items-center justify-between relative pt-[60px]">
        <div className="space-y-6 lg:ml-16 w-full">
          <h2 className="section__heading mb-8 hidden md:block">
            03. Review and Pay
          </h2>

          {dateError && (
            <div className="text-red-500 text-sm mb-2">{dateError}</div>
          )}

          <div className="md:space-y-6">
            {/* Booking Summary - Card Style */}
            <div className="md:flex flex-row items-start gap-3">
              <div className="md:w-[230px] w-full">
                <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
                  Booking Summary
                </label>
              </div>
              <div className="w-full">
                {/* Package Details Display */}
                <div className="mb-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  {selectedTestObj ? (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-semibold">
                          {stripBr(
                            selectedTestObj.name ||
                              selectedTestObj.title ||
                              "Package"
                          )}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          (
                          {formatPrice(
                            (paymentState?.data?.packages &&
                              paymentState.data.packages[0]?.price) ||
                              selectedTestObj.price ||
                              selectedTestObj.cost ||
                              selectedTestObj.amount ||
                              paymentState?.data?.summary?.original_amount
                          )}
                          )
                        </span>
                      </div>
                      {/* Tax breakdown under package price */}
                      {paymentState?.data?.pricing?.tax_breakdown &&
                        Array.isArray(
                          paymentState.data.pricing.tax_breakdown
                        ) &&
                        paymentState.data.pricing.tax_breakdown.length > 0 && (
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="font-medium">Tax Breakdown:</span>
                            <ul className="ml-2 mt-1">
                              {paymentState.data.pricing.tax_breakdown.map(
                                (tax, idx) => (
                                  <li
                                    key={idx}
                                    className="flex justify-between"
                                  >
                                    <span>{tax.title}:</span>
                                    <span className="ml-2">
                                      {formatPrice(tax.amount)}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      {selectedTestObj.description && (
                        <div className="mt-2 text-sm text-gray-600">
                          {stripBr(selectedTestObj.description)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          {testPackages.length > 0
                            ? stripBr(
                                testPackages[0]?.name ||
                                  testPackages[0]?.title ||
                                  "Available Package"
                              )
                            : "No package available"}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          (
                          {formatPrice(
                            (paymentState?.data?.packages &&
                              paymentState.data.packages[0]?.price) ||
                              testPackages[0]?.price ||
                              testPackages[0]?.cost ||
                              paymentState?.data?.summary?.original_amount ||
                              0
                          )}
                          )
                        </span>
                      </div>
                      {/* Tax breakdown under package price */}
                      {paymentState?.data?.pricing?.tax_breakdown &&
                        Array.isArray(
                          paymentState.data.pricing.tax_breakdown
                        ) &&
                        paymentState.data.pricing.tax_breakdown.length > 0 && (
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="font-medium">Tax Breakdown:</span>
                            <ul className="ml-2 mt-1">
                              {paymentState.data.pricing.tax_breakdown.map(
                                (tax, idx) => (
                                  <li
                                    key={idx}
                                    className="flex justify-between"
                                  >
                                    <span>{tax.title}:</span>
                                    <span className="ml-2">
                                      {formatPrice(tax.amount)}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}

                  {/* Schedule Information */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">
                          Scheduled Date
                        </label>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <p className="text-gray-800 font-medium">
                            {formatDate(allFormData.date) || "DD / MM / YYYY"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">
                          Scheduled Time
                        </label>
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <p className="text-gray-800 font-medium">
                            {formatTimeSlot(allFormData.timeSlot) ||
                              "HH:MM to HH:MM"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost and Discount Code */}
            <div className="md:grid grid-cols-2 gap-4">
              <div className="md:flex flex-row items-start gap-3">
                <div className="w-[300px] pt-4">
                  <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
                    Total Cost
                  </label>
                </div>
                <div className="w-full">
                  <input
                    {...register("totalCost", {
                      required: "Total cost is required",
                      min: {
                        value: 1,
                        message: "Cost must be greater than 0",
                      },
                    })}
                    type="text"
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    placeholder="Enter cost"
                    value={
                      paymentState?.data?.summary?.final_amount
                        ? `RM ${parseFloat(
                            paymentState.data.summary.final_amount
                          ).toFixed(2)}`
                        : ""
                    }
                    readOnly
                  />
                  {errors.totalCost && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.totalCost.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:flex flex-row items-start gap-3">
                <div className="w-[180px] md:ml-4 pt-4">
                  <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
                    Apply Code
                  </label>
                </div>
                <div className="w-full">
                  <input
                    {...register("applyCode")}
                    type="text"
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    placeholder="Discount code"
                  />
                  {paymentState.loading && (
                    <p className="text-blue-500 text-sm mt-1">
                      Validating coupon...
                    </p>
                  )}
                  {paymentState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {paymentState.error}
                    </p>
                  )}
                  {paymentState.data?.coupon && (
                    <p className="text-green-500 text-sm mt-1">
                      Coupon applied: {paymentState.data.coupon.code}(
                      {paymentState.data.coupon.discount_type === "percentage"
                        ? `${paymentState.data.coupon.discount_value}%`
                        : `₹${paymentState.data.coupon.discount_value}`}{" "}
                      off)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="md:flex flex-row items-start gap-3">
              <div className="md:w-[190px] pt-4">
                <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2">
                  Payment Mode
                </label>
              </div>
              <div className="relative w-full md:w-1/2">
                <select
                  {...register("paymentMode", {
                    required: "Payment mode is required",
                  })}
                  className="w-full appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="online_banking">Online Banking</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <ChevronDown />
                </div>
                {errors.paymentMode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentMode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-4 md:mt-0 flex flex-row items-start gap-3">
              <div className="md:w-[190px]"></div>
              <div className="flex md:items-center items-start gap-2">
                <input
                  {...register("agreeTerms", {
                    required: "You must agree to terms and conditions",
                  })}
                  type="checkbox"
                  id="terms"
                  className="appearance-none w-4 h-4 rounded border-2 border-gray-300 
             bg-white checked:bg-pink-500 checked:border-pink-500
             relative top-1 md:top-0 cursor-pointer transition-all duration-200
             before:content-[''] before:absolute before:top-[1px] before:left-[4px]
             before:w-[6px] before:h-[10px] before:border-white before:border-r-2 
             before:border-b-2 before:transform before:rotate-45 before:scale-0
             checked:before:scale-100 before:transition-transform before:duration-200"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms-condition"
                    className="__secondary-text underline cursor-pointer"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and
                  <Link
                    href="/privacy-policies"
                    className="__secondary-text underline cursor-pointer"
                  >
                    {" "}
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            {errors.agreeTerms && (
              <div className="md:flex flex-row items-start gap-3">
                <div className="md:w-[190px]"></div>
                <p className="text-red-500 text-sm">
                  {errors.agreeTerms.message}
                </p>
              </div>
            )}
          </div>

          {/* Confirm & Pay Button */}
          {/* <div className="flex items-center justify-center md:justify-start mt-6 cursor-pointer">
            <div className="md:w-[200px]"></div>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={paymentState.loading}
              className="w-[200px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {paymentState.loading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div> */}
          <div className="flex items-center justify-end mt-10">
            <div className="lg:w-[81%] flex justify-start">
              <div className="lg:w-[20%] flex justify-between">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.history.length > 1) {
                    window.history.back();
                  }
                }}
                className="w-[166px] bg-gray-200 text-gray-700 text-[20px] py-3 px-6 rounded-lg font-bold transition-opacity hover:opacity-90 border border-gray-300"
              >
                Back
              </button>
            </div>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={paymentState.loading}
              className="w-[200px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {paymentState.loading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
