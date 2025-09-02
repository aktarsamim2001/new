import { useForm, Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    control,
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

  // Updated function to handle multiple selected packages
  const findSelectedPackages = () => {
    if (!allFormData.selectedTest || !Array.isArray(allFormData.selectedTest)) {
      return [];
    }
    
    return allFormData.selectedTest
      .map(selected => {
        // First try to use packageData if available
        if (selected.packageData) {
          return selected.packageData;
        }
        
        // Otherwise find in testPackages by slug or id
        const packageId = selected.id || selected.value;
        return testPackages.find(pkg => 
          String(pkg.id) === String(packageId) || pkg.slug === packageId
        );
      })
      .filter(Boolean); // Remove any undefined values
  };

  const selectedPackages = findSelectedPackages();
  console.log("Selected Packages:", selectedPackages);

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
    return `${to12hr(start)}`;
  };

  const getBookingSummary = () => {
    if (selectedPackages.length === 0) {
      return "No packages selected.";
    }
    
    const packageNames = selectedPackages
      .map(pkg => stripBr(pkg.name))
      .join(", ");
    
    const scheduledDate = formatDate(allFormData.date);
    const scheduledTime = formatTimeSlot(allFormData.timeSlot);
    return `Your booking for ${packageNames} is scheduled on ${scheduledDate} at ${scheduledTime}.`;
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
    // Collect all selected package IDs
    const selectedPackageIds = [];
    
    if (Array.isArray(allFormData.selectedTest)) {
      allFormData.selectedTest.forEach(selected => {
        // First try to get ID from packageData
        if (selected.packageData && selected.packageData.id) {
          selectedPackageIds.push(parseInt(selected.packageData.id, 10));
        } else {
          // Otherwise find the package in servicesListData
          const packageId = selected.id || selected.value;
          const found = servicesListData?.packages?.find(
            pkg => pkg.slug === packageId || String(pkg.id) === String(packageId)
          );
          if (found) {
            selectedPackageIds.push(parseInt(found.id, 10));
          }
        }
      });
    }

    const payload = {
      package_ids: selectedPackageIds.filter(id => Number.isInteger(id)),
    };
    
    if (watchedCouponCode) {
      payload.coupon_code = watchedCouponCode;
    }
    
    console.log('Fetching payment details with payload:', payload);
    if (payload.package_ids.length > 0) {
      dispatch(fetchPaymentDetails(payload));
    }
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

    // Collect all selected package IDs for booking
    const selectedPackageIds = [];
    
    if (Array.isArray(allFormData.selectedTest)) {
      allFormData.selectedTest.forEach(selected => {
        if (selected.packageData && selected.packageData.id) {
          selectedPackageIds.push(parseInt(selected.packageData.id, 10));
        } else {
          const packageId = selected.id || selected.value;
          const found = servicesListData?.packages?.find(
            pkg => pkg.slug === packageId || String(pkg.id) === String(packageId)
          );
          if (found) {
            selectedPackageIds.push(parseInt(found.id, 10));
          }
        }
      });
    }

    const payload = {
      address_id,
      package_ids: selectedPackageIds.filter(id => Number.isInteger(id)),
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
                <div className="mb-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  {selectedPackages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedPackages.map((pkg, index) => {
                        const packagePrice = paymentState?.data?.packages?.find(
                          p => String(p.id) === String(pkg.id)
                        )?.price || pkg.price || pkg.cost || pkg.amount;

                        return (
                          <div key={pkg.id || index} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col h-full">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-900 font-semibold">
                                {stripBr(pkg.name || pkg.title || "Package")}
                              </span>
                              <span className="text-gray-900 font-semibold">
                                ({formatPrice(packagePrice)})
                              </span>
                            </div>
                            {pkg.description && (
                              <div className="mt-2 text-sm text-gray-600">
                                {stripBr(pkg.description)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          No packages selected
                        </span>
                        <span className="text-gray-900 font-semibold">
                          (RM 0.00)
                        </span>
                      </div>
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
                  <Input
                    {...register("totalCost", {
                      required: "Total cost is required",
                      min: {
                        value: 1,
                        message: "Cost must be greater than 0",
                      },
                    })}
                    type="text"
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
                  <Input
                    {...register("applyCode")}
                    type="text"
                    placeholder="Discount code"
                  />
                  {paymentState.loading && (
                    <p className="text-blue-500 text-sm mt-1">
                      Validating coupon...
                    </p>
                  )}
                  {!paymentState.loading && watchedCouponCode && (
                    <>
                      {paymentState.data?.coupon ? (
                        <p className="text-green-500 text-sm mt-1">
                          Coupon applied: {paymentState.data.coupon.code} (
                          {paymentState.data.coupon.discount_type === "percentage"
                            ? `${paymentState.data.coupon.discount_value}%`
                            : `₹${paymentState.data.coupon.discount_value}`}{" "}
                          off)
                        </p>
                      ) : (
                        <p className="text-red-500 text-sm mt-1">
                          Invalid coupon
                        </p>
                      )}
                    </>
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
                <Controller
                  name="paymentMode"
                  control={control}
                  rules={{ required: "Payment mode is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="debit_card">Debit Card</SelectItem>
                          <SelectItem value="online_banking">Online Banking</SelectItem>
                          <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
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
          <div className="flex items-center justify-end mt-10">
            <div className="lg:w-[81%] flex justify-start">
              <div className="lg:w-[20%] flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.history.length > 1
                    ) {
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
}
export default Step3;