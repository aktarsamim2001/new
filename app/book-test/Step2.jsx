import { useForm } from "react-hook-form";
import ProfessionalDateTimePicker from "./ProfessionalDateTimePicker";

const Step2 = ({
  allFormData,
  setAllFormData,
  dateTimeData,
  setDateTimeData,
  validationErrors,
  setValidationErrors,
  handleContinue,
  showDatePicker,
  setShowDatePicker,
  showTimePicker,
  setShowTimePicker,
  currentMonth,
  setCurrentMonth,
  datePickerRef,
  timePickerRef,
  isClient
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({
    defaultValues: allFormData,
    mode: "onChange",
  });

  const isDisabled =
  !isValid ||
  !dateTimeData.date ||
  !dateTimeData.timeSlot ||
  Object.keys(validationErrors).length > 0;


  const onSubmit = (data) => {
    const newErrors = {};

    if (!dateTimeData.date) {
      newErrors.date = "Date is required";
    } else {
      const selected = new Date(dateTimeData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Schedule date cannot be in the past";
      }
    }

    if (!dateTimeData.timeSlot) {
      newErrors.timeSlot = "Time slot is required";
    }

    setValidationErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalData = {
        ...data,
        date: dateTimeData.date,
        timeSlot: dateTimeData.timeSlot,
      };
      handleContinue(finalData);
    }
  };

  return (
    <div>
      <div className="rounded-lg px-4 md:p-6 flex items-center justify-between relative lg:pt-[60px]">
        <div className="space-y-4 lg:ml-16 lg:w-[40%] w-full">
          <h2 className="section__heading mb-8 hidden md:block">
            02. Contact Details
          </h2>

          <div className="space-y-4">
            <div className="lg:flex flex-row items-center gap-3">
              <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                Contact
              </label>
              <div className="lg:w-[60%] w-full">
                <input
                  {...register("contact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[+]?[\d\s-()]+$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  type="tel"
                  className="w-full px-4 py-4 bg-[#F2F2F2] text-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  placeholder="Enter phone number"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:flex flex-row items-center gap-3">
              <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                Street Name
              </label>
              <div className="lg:w-[60%] w-full">
                <input
                  {...register("streetName", {
                    required: "Street address is required",
                  })}
                  type="text"
                  className="w-full px-4 py-4 bg-[#F2F2F2] text-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  placeholder="Enter street address"
                />
                {errors.streetName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:flex flex-row items-center gap-3">
              <label className="block mb-2 lg:mb-0 text-[20px] font-medium text-gray-700 w-[160px]">
                Pin Code
              </label>
              <div className="lg:w-[60%] w-full">
                <input
                  {...register("pincode", {
                    required: "Pin code is required",
                    pattern: {
                      value: /^\d{5,6}$/,
                      message: "Please enter a valid pin code",
                    },
                  })}
                  type="text"
                  className="w-full px-4 py-4 bg-[#F2F2F2] text-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  placeholder="Enter pincode"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>

            <ProfessionalDateTimePicker
              dateTimeData={dateTimeData}
              setDateTimeData={setDateTimeData}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              showTimePicker={showTimePicker}
              setShowTimePicker={setShowTimePicker}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              datePickerRef={datePickerRef}
              timePickerRef={timePickerRef}
              isClient={isClient}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />

            {validationErrors.date && (
              <div className="lg:flex flex-row items-center gap-3">
                <div className="w-[160px]"></div>
                <p className="text-red-500 text-sm">
                  {validationErrors.date}
                </p>
              </div>
            )}
            {validationErrors.timeSlot && (
              <div className="lg:flex flex-row items-center gap-3">
                <div className="w-[160px]"></div>
                <p className="text-red-500 text-sm">
                  {validationErrors.timeSlot}
                </p>
              </div>
            )}
          </div>
          <div className="lg:flex flex-row items-start gap-3">
                <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                  Remarks
                </label>
                <div className="lg:w-[115%] w-full relative lg:left-12">
                  <textarea
                    {...register("remarks")}
                    rows={3}
                    className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                    placeholder="Any special instructions or remarks"
                  />
                </div>
              </div>

           <div className="flex items-center justify-end mt-10">
            <div className="lg:w-[70%] flex justify-end">
              <div className="lg:w-[60%] flex justify-between">
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
                disabled={isDisabled}
                className={`w-[166px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold transition-opacity
                  ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;