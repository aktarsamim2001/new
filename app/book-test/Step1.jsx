import { useForm, Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import Select from "react-select";

const Step1 = ({
  allFormData,
  setAllFormData,
  servicesListData,
  serviceDetailsPageData,
  handleContinue,
  userProfile,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: allFormData,
  });

  // Add this useEffect to debug userProfile
  useEffect(() => {
    console.log("User profile data:", userProfile);
  }, [userProfile]);

  const testPackages = Array.isArray(servicesListData?.packages)
    ? servicesListData.packages
    : [];

  // Helper function to strip HTML tags
  const stripBr = (str) => str?.replace(/<br\s*\/?>(\s*)?/gi, " ").trim();

  // Create options for Select component
  const options = testPackages.map((test) => ({
    value: test.id,
    label: stripBr(test.name),
  }));

  // Load user data when userProfile is available
  useEffect(() => {
    if (userProfile && userProfile.name) {
      const age = userProfile.dob
        ? new Date().getFullYear() - new Date(userProfile.dob).getFullYear()
        : "";

      // Normalize gender to match select options
      let normalizedGender = "Select";
      if (userProfile.gender) {
        const g = userProfile.gender.toLowerCase();
        if (["male", "female", "other"].includes(g)) {
          normalizedGender = g;
        }
      }

      // Update form values
      setValue("fullName", userProfile.name || "");
      setValue("gender", normalizedGender);
      setValue("age", age || "");
      setValue("contact", userProfile.mobile || "");

      // Update parent state
      setAllFormData((prev) => ({
        ...prev,
        fullName: userProfile.name || "",
        gender: normalizedGender,
        age: age || "",
        contact: userProfile.mobile || "",
      }));
    }
  }, [userProfile, setValue, setAllFormData]);

  // Auto-update form fields when allFormData changes
  useEffect(() => {
    console.log("Step1 allFormData:", allFormData);
    reset(allFormData);
  }, [allFormData, reset]);

  useEffect(() => {
    console.log("Step1 testPackages:", testPackages);
  }, [testPackages]);

  useEffect(() => {
    const defaultTestId =
      serviceDetailsPageData?.id || (testPackages[0] && testPackages[0].id);
    
    if (testPackages.length > 0 && !watch("selectedTest") && defaultTestId) {
      const defaultOption = options.find(option => option.value === defaultTestId);
      if (defaultOption) {
        setValue("selectedTest", [defaultOption]);
        setAllFormData((prev) => ({
          ...prev,
          selectedTest: [defaultOption],
        }));
      }
    }
  }, [testPackages, serviceDetailsPageData, setValue, watch, setAllFormData, options]);

  const selectedTest = watch("selectedTest");
  const isDisabled = !selectedTest || (Array.isArray(selectedTest) && selectedTest.length === 0);

  const onSubmit = (data) => {
    handleContinue(data);
  };

  return (
    <div onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-lg px-4 flex items-center justify-between relative">
        <div className="space-y-6 lg:ml-[100px] lg:w-[40%] w-full">
          <h2 className="section__heading mb-8 hidden md:block">
            01. Fill in the Details
          </h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="lg:flex lg:flex-row lg:justify-between lg:items-center">
              <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2 lg:text-right">
                Full Name
              </label>
              <div className="lg:w-[70%]">
                <input
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  type="text"
                  disabled={isDisabled}
                  className={`w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl transition-all
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
                    }`}
                  placeholder="Enter your full name"
                  style={{ color: "#6B7280" }}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Gender and Age Row */}
            <div className="lg:flex lg:flex-row lg:justify-between lg:items-center gap-8">
              <div className="lg:text-right">
                <label className="block text-[20px] font-medium text-gray-700 mb-2 lg:mb-0">
                  Gender
                </label>
              </div>
              <div className="lg:w-[70%] flex flex-row items-center gap-6">
                <div className="flex flex-col gap-1">
                  <div className="relative w-[140px]">
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                        validate: (value) =>
                          value !== "Select" || "Gender is required",
                      })}
                      disabled={isDisabled}
                      className={`w-full text-sm appearance-none px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl transition-all text-gray-500
                        ${
                          isDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
                        }`}
                    >
                      <option value="Select">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <ChevronDown />
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="lg:flex lg:flex-row lg:items-center flex flex-col gap-3">
                    <label className="text-[20px] font-medium block text-gray-600 whitespace-nowrap">
                      Age
                    </label>
                    <div className="w-full">
                      <input
                        {...register("age", {
                          required: "Age is required",
                          min: {
                            value: 1,
                            message: "Age must be greater than 0",
                          },
                          max: {
                            value: 120,
                            message: "Age must be less than 120",
                          },
                        })}
                        type="number"
                        disabled={isDisabled}
                        className={`w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl transition-all text-gray-500
                          ${
                            isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
                          }`}
                        placeholder="Enter your age"
                      />
                    </div>
                  </div>
                  {errors.age && (
                    <p className="text-red-500 text-sm">{errors.age.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Test - Multi Select */}
            <div className="lg:flex lg:justify-between lg:flex-row lg:items-center gap-8">
              <label className="block text-[20px] font-medium text-gray-700 lg:mb-0 mb-2 lg:text-right">
                Selected Test
              </label>

              <div className="lg:w-[70%]">
                <Controller
                  name="selectedTest"
                  control={control}
                  rules={{ 
                    required: "Please select at least one test",
                    validate: (value) => 
                      (Array.isArray(value) && value.length > 0) || "Please select at least one test"
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      isMulti
                      placeholder="Select tests"
                      className="text-gray-700"
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          border: "0px",
                          boxShadow: "none",
                          padding: "px",
                          backgroundColor: "#F2F2F2",
                          borderRadius: "6px",
                          minHeight: "56px", // Match other input heights
                          cursor: "pointer",
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "var(--secondary-bg, #ec098d)", // Using CSS variable fallback
                          borderRadius: "6px",
                          padding: "2px 6px",
                          margin: "2px",
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: "white",
                          fontWeight: 300,
                          fontSize: "14px",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: "white",
                          cursor: "pointer",
                          borderRadius: "6px",
                          ":hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                          },
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#6B7280",
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: "12px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#D81B60"
                            : state.isFocused
                            ? "#FFE6F0"
                            : "white",
                          color: state.isSelected ? "white" : "#374151",
                          cursor: "pointer",
                          ":active": {
                            backgroundColor: "#ec098d",
                            borderRadius: "6px",
                          },
                        }),
                      }}
                      // Handle onChange to update parent state
                      onChange={(selectedOptions) => {
                        field.onChange(selectedOptions);
                        setAllFormData((prev) => ({
                          ...prev,
                          selectedTest: selectedOptions,
                        }));
                      }}
                    />
                  )}
                />
                {errors.selectedTest && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedTest.message}
                  </p>
                )}
              </div>
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

export default Step1;