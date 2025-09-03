import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/features/store/profileSlice";
import ProfessionalDateTimePicker from "./ProfessionalDateTimePicker";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Step2 = ({
  allFormData,
  setAllFormData,
  dateTimeData,
  setDateTimeData,
  validationErrors,
  setValidationErrors,
  handleContinue,
  handleBack,
  showDatePicker,
  setShowDatePicker,
  showTimePicker,
  setShowTimePicker,
  currentMonth,
  setCurrentMonth,
  datePickerRef,
  timePickerRef,
  isClient,
  // Address management props
  userAddresses = [],
  defaultAddress = null,
  isFirstTimeUser = false,
  onAddNewAddress,
  onUpdateAddress,
  onSelectAddress,
}) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: {
      ...allFormData,
      contact: selectedAddress?.contact || profileData?.mobile || allFormData.contact || "",
      streetName: selectedAddress?.street || profileData?.address?.street || allFormData.streetName || "",
      pincode: selectedAddress?.zip || profileData?.address?.zip || allFormData.pincode || "",
    },
    mode: "onChange",
  });

  // Watch form values for address changes
  const watchedValues = watch(["contact", "streetName", "pincode"]);

  // Get current form values to check if they're filled
  const currentContact = watch("contact");
  const currentStreetName = watch("streetName");
  const currentPincode = watch("pincode");
  
  // Enhanced validation state checking
  const hasFormErrors = Object.keys(errors).length > 0;
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const hasDate = !!dateTimeData.date;
  const hasTimeSlot = !!dateTimeData.timeSlot;
  const hasRequiredFields = !!(currentContact && currentStreetName && currentPincode);
  const isDisabled = hasFormErrors || hasValidationErrors || !hasDate || !hasTimeSlot || !hasRequiredFields;

  // Auto-populate address fields when component mounts or selectedAddress/profileData changes
  useEffect(() => {
    if (selectedAddress) {
      setValue("contact", selectedAddress.contact);
      setValue("streetName", selectedAddress.street);
      setValue("pincode", selectedAddress.zip);
      // Trigger validation after setting values
      setTimeout(() => {
        trigger(["contact", "streetName", "pincode"]);
      }, 100);
    } else if (profileData?.address) {
      setValue("contact", profileData.mobile);
      setValue("streetName", profileData.address.street);
      setValue("pincode", profileData.address.zip);
      // Trigger validation after setting values
      setTimeout(() => {
        trigger(["contact", "streetName", "pincode"]);
      }, 100);
    } else if (defaultAddress) {
      // If no selected address but there's a default, use it
      setSelectedAddress(defaultAddress);
    }
  }, [selectedAddress, defaultAddress, profileData, setValue, trigger]);

  // Fetch profile data when component mounts
  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  // Show modal for first-time users or when no addresses exist
  useEffect(() => {
    if (isFirstTimeUser && userAddresses.length === 0) {
      setShowAddressModal(true);
    }
  }, [isFirstTimeUser, userAddresses.length]);

  const onSubmit = (data) => {
    const newErrors = {};

    // Validate date
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

    // Validate time slot
    if (!dateTimeData.timeSlot) {
      newErrors.timeSlot = "Time slot is required";
    }

    setValidationErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalData = {
        ...data,
        date: dateTimeData.date,
        timeSlot: dateTimeData.timeSlot,
        selectedAddressId: selectedAddress?.id, // Include selected address ID
      };
      
      // Update parent form data
      setAllFormData(finalData);
      
      handleContinue(finalData);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddressSelector(false);
    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  const handleAddNewAddressSubmit = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now(), // Simple ID generation - use proper UUID in production
      isDefault: userAddresses.length === 0, // First address becomes default
      address_type: addressData.address_type || "Home",
      other_address_title: addressData.address_type === "Other" ? addressData.other_address_title : "",
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      country: addressData.country,
      zip: addressData.zip
    };
    
    if (onAddNewAddress) {
      onAddNewAddress(newAddress);
    }
    
    setShowAddressModal(false);
    setSelectedAddress(newAddress);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveEditedAddress = () => {
    const updatedAddress = {
      ...selectedAddress,
      contact: watchedValues[0],
      street: watchedValues[1], 
      zip: watchedValues[2], // Fixed: should be 'zip' not 'pincode'
    };
    
    if (onUpdateAddress) {
      onUpdateAddress(updatedAddress);
    }
    
    setIsEditingAddress(false);
    setSelectedAddress(updatedAddress);
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    // Reset form values to selected address
    if (selectedAddress) {
      setValue("contact", selectedAddress.contact);
      setValue("streetName", selectedAddress.street); // Fixed mapping
      setValue("pincode", selectedAddress.zip); // Fixed mapping
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddressSelector && !event.target.closest('.address-selector-container')) {
        setShowAddressSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddressSelector]);

  // Address Selector Component
  const AddressSelector = () => (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      <div className="p-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">Select Address</h3>
      </div>
      <div className="p-2">
        {userAddresses.map((address) => (
          <button
            key={address.id}
            type="button"
            onClick={() => handleAddressSelect(address)}
            className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors ${
              selectedAddress?.id === address.id ? 'bg-pink-50 border border-pink-200' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {address.address_type === "Other" ? address.other_address_title : address.address_type}
                </p>
                <p className="text-sm text-gray-600 truncate">{address.street}</p>
                <p className="text-xs text-gray-500">{address.contact} • {address.zip}</p>
              </div>
              {address.isDefault && (
                <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">
                  Default
                </span>
              )}
            </div>
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setShowAddressModal(true);
            setShowAddressSelector(false);
          }}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2"
        >
          <div className="flex items-center gap-2 text-pink-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Add New Address</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="rounded-lg px-4 md:p-6 flex items-center justify-between relative lg:pt-[60px]">
        <div className="space-y-4 lg:ml-16 lg:w-[40%] w-full">
          <h2 className="section__heading mb-8 hidden md:block">
            02. Contact Details
          </h2>

          <div className="space-y-4">
            {/* Default Address Display - Show when user has addresses */}
            {userAddresses.length > 0 && selectedAddress && (
              <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">Current Address</h4>
                      {selectedAddress.isDefault && (
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-1 leading-relaxed">
                      {selectedAddress.street}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {selectedAddress.contact}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {selectedAddress.zip}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 address-selector-container">
                    {/* Edit Address Button */}
                    <button
                      type="button"
                      onClick={handleEditAddress}
                      className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors group"
                      title="Edit address"
                      disabled={isEditingAddress}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    {/* Switch Address Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowAddressSelector(!showAddressSelector)}
                        className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
                        title="Switch address"
                        disabled={isEditingAddress}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </button>
                      {showAddressSelector && <AddressSelector />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Number Field */}
            <div className="lg:flex flex-row items-center gap-3">
              <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                Contact
              </label>
              <div className="lg:w-[60%] w-full">
                <input
                  {...register("contact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[+]?[0-9\s-()]{10,15}$/,
                      message: "Please enter a valid phone number (10-15 digits)",
                    },
                    minLength: {
                      value: 10,
                      message: "Contact number must be at least 10 digits"
                    }
                  })}
                  type="tel"
                  className="w-full px-4 py-4 bg-gray-100 text-gray-700 border-0 rounded-xl opacity-75 cursor-not-allowed focus:outline-none"
                  placeholder="Enter phone number"
                  readOnly
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            {/* Street Address Field */}
            <div className="lg:flex flex-row items-center gap-3">
              <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
                Street Name
              </label>
              <div className="lg:w-[60%] w-full">
                <input
                  {...register("streetName", {
                    required: "Street address is required",
                    minLength: {
                      value: 2,
                      message: "Street address must be at least 2 characters",
                    },
                    validate: {
                      notEmpty: (value) => value.trim().length > 0 || "Street address cannot be empty"
                    }
                  })}
                  className="w-full px-4 py-4 bg-gray-100 text-gray-700 border-0 rounded-xl opacity-75 focus:outline-none"
                  placeholder="Enter complete street address"
                  readOnly
                />
                {errors.streetName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Pin Code Field */}
            <div className="lg:flex flex-row items-center gap-3">
              <label className="block mb-2 lg:mb-0 text-[20px] font-medium text-gray-700 w-[160px]">
                Pin Code
              </label>
              <div className="lg:w-[60%] w-full">
                <input
                  {...register("pincode", {
                    required: "Pin code is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Please enter a valid 6 digit pin code",
                    },
                    minLength: {
                      value: 6,
                      message: "Pin code must be 6 digits"
                    },
                    maxLength: {
                      value: 6,
                      message: "Pin code must be 6 digits"
                    }
                  })}
                  type="text"
                  className="w-full px-4 py-4 bg-gray-100 text-gray-700 border-0 rounded-xl opacity-75 cursor-not-allowed focus:outline-none"
                  placeholder="Enter 6-digit pincode"
                  readOnly
                  maxLength={6}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date Time Picker */}
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

            {/* Validation Error Messages */}
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

          {/* Remarks Field */}
          <div className="lg:flex flex-row items-start gap-3">
            <label className="mb-2 lg:mb-0 block text-[20px] font-medium text-gray-700 w-[160px]">
              Remarks
            </label>
            <div className="lg:w-[115%] w-full relative lg:left-12">
              <Input
                {...register("remarks")}
                rows={3}
                placeholder="Any special instructions or remarks"
                className="min-h-[100px] flex items-start"
              />
            </div>
          </div>


          {/* Navigation Buttons */}
          <div className="flex items-center justify-end mt-10">
            <div className="lg:w-[70%] flex justify-end">
              <div className="lg:w-[60%] flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-[166px] bg-gray-200 text-gray-700 text-[20px] py-3 px-6 rounded-lg font-bold transition-all hover:bg-gray-300 border border-gray-300"
                >
                  Back
                </button>
              </div>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className={`w-[166px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold transition-all`}
                title={isDisabled ? 'Please fill all required fields and select date/time' : ''}
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