import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...allFormData,
      contact: selectedAddress?.contact || allFormData.contact || "",
      streetName: selectedAddress?.streetName || allFormData.streetName || "",
      pincode: selectedAddress?.pincode || allFormData.pincode || "",
    },
    mode: "onChange",
  });

  // Watch form values for address changes
  const watchedValues = watch(["contact", "streetName", "pincode"]);

  // Auto-populate address fields when component mounts or selectedAddress changes
  useEffect(() => {
    if (selectedAddress) {
      setValue("contact", selectedAddress.contact);
      setValue("streetName", selectedAddress.streetName);
      setValue("pincode", selectedAddress.pincode);
    } else if (defaultAddress) {
      // If no selected address but there's a default, use it
      setSelectedAddress(defaultAddress);
    }
  }, [selectedAddress, defaultAddress, setValue]);

  // Show modal for first-time users or when no addresses exist
  useEffect(() => {
    if (isFirstTimeUser && userAddresses.length === 0) {
      setShowAddressModal(true);
    }
  }, [isFirstTimeUser, userAddresses.length]);

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
        selectedAddressId: selectedAddress?.id, // Include selected address ID
      };
      handleContinue(finalData);
    }
  };

  // Handle address selection from dropdown
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddressSelector(false);
    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  // Handle new address submission
  const handleAddNewAddressSubmit = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now(), // Simple ID generation - use proper UUID in production
      isDefault: userAddresses.length === 0, // First address becomes default
    };
    
    if (onAddNewAddress) {
      onAddNewAddress(newAddress);
    }
    
    setShowAddressModal(false);
    setSelectedAddress(newAddress);
  };

  // Handle address editing
  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveEditedAddress = () => {
    const updatedAddress = {
      ...selectedAddress,
      contact: watchedValues[0],
      streetName: watchedValues[1],
      pincode: watchedValues[2],
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
      setValue("streetName", selectedAddress.streetName);
      setValue("pincode", selectedAddress.pincode);
    }
  };

  // Address Modal Component
  const AddressModal = () => {
    const [modalErrors, setModalErrors] = useState({});
    const {
      register: registerModal,
      handleSubmit: handleSubmitModal,
      formState: { errors: modalFormErrors },
      reset: resetModal
    } = useForm({
      mode: "onChange",
    });

    const onModalSubmit = (data) => {
      const newErrors = {};
      
      if (!data.contact || !data.contact.match(/^[+]?[\d\s-()]+$/)) {
        newErrors.contact = "Please enter a valid phone number";
      }
      
      if (!data.streetName || data.streetName.trim().length < 5) {
        newErrors.streetName = "Street address must be at least 5 characters";
      }
      
      if (!data.pincode || !data.pincode.match(/^\d{5,6}$/)) {
        newErrors.pincode = "Please enter a valid 5-6 digit pincode";
      }

      setModalErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        handleAddNewAddressSubmit(data);
        resetModal();
        setModalErrors({});
      }
    };

    const handleModalClose = () => {
      setShowAddressModal(false);
      resetModal();
      setModalErrors({});
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              {isFirstTimeUser ? "Add Your Address" : "Add New Address"}
            </h3>
            <button
              type="button"
              onClick={handleModalClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmitModal(onModalSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number *
              </label>
              <input
                {...registerModal("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[+]?[\d\s-()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                type="tel"
                placeholder="Enter phone number"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {(modalFormErrors.contact || modalErrors.contact) && (
                <p className="text-red-500 text-sm mt-1">
                  {modalFormErrors.contact?.message || modalErrors.contact}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <textarea
                {...registerModal("streetName", {
                  required: "Street address is required",
                  minLength: {
                    value: 5,
                    message: "Street address must be at least 5 characters",
                  },
                })}
                rows={3}
                placeholder="Enter complete street address"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
              {(modalFormErrors.streetName || modalErrors.streetName) && (
                <p className="text-red-500 text-sm mt-1">
                  {modalFormErrors.streetName?.message || modalErrors.streetName}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code *
              </label>
              <input
                {...registerModal("pincode", {
                  required: "Pin code is required",
                  pattern: {
                    value: /^\d{5,6}$/,
                    message: "Please enter a valid 5-6 digit pincode",
                  },
                })}
                type="text"
                placeholder="Enter pincode"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {(modalFormErrors.pincode || modalErrors.pincode) && (
                <p className="text-red-500 text-sm mt-1">
                  {modalFormErrors.pincode?.message || modalErrors.pincode}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleModalClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Address Selector Dropdown
  const AddressSelector = () => (
    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
      <div className="p-2">
        <div className="text-sm font-medium text-gray-700 px-2 py-1 border-b border-gray-200 mb-2">
          Saved Addresses ({userAddresses.length})
        </div>
        {userAddresses.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500 text-center">
            No saved addresses found
          </div>
        ) : (
          userAddresses.map((address, index) => (
            <button
              key={address.id || index}
              onClick={() => handleAddressSelect(address)}
              className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors ${
                selectedAddress?.id === address.id ? 'bg-pink-50 border border-pink-200' : ''
              }`}
            >
              <div className="font-medium truncate">{address.streetName}</div>
              <div className="text-gray-500 text-xs mt-1">
                {address.contact} • {address.pincode}
                {address.isDefault && <span className="ml-2 text-pink-600">• Default</span>}
              </div>
            </button>
          ))
        )}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <button
            onClick={() => {
              setShowAddressSelector(false);
              setShowAddressModal(true);
            }}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-pink-600 font-medium transition-colors"
          >
            <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );

  // Close address selector when clicking outside
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
                      {selectedAddress.streetName}
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
                        {selectedAddress.pincode}
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
                    {/* Add New Address Button */}
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                      title="Add new address"
                      disabled={isEditingAddress}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Edit Mode Controls */}
                {isEditingAddress && (
                  <div className="mt-3 pt-3 border-t border-pink-200">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveEditedAddress}
                        className="text-sm bg-pink-500 text-white px-3 py-1.5 rounded hover:bg-pink-600 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-sm bg-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-400 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add New Address Button - Always visible */}
            {!isFirstTimeUser && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-pink-300 text-pink-600 rounded-lg hover:border-pink-400 hover:bg-pink-50 transition-all font-medium"
                  disabled={isEditingAddress}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Address
                </button>
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
                      value: /^[+]?[\d\s-()]+$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  type="tel"
                  className={`w-full px-4 py-4 bg-[#F2F2F2] text-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all ${
                    selectedAddress && !isEditingAddress ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''
                  }`}
                  placeholder="Enter phone number"
                  disabled={selectedAddress && !isEditingAddress}
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
                <textarea
                  {...register("streetName", {
                    required: "Street address is required",
                    minLength: {
                      value: 5,
                      message: "Street address must be at least 5 characters",
                    },
                  })}
                  rows={3}
                  className={`w-full px-4 py-4 bg-[#F2F2F2] text-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all resize-none ${
                    selectedAddress && !isEditingAddress ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''
                  }`}
                  placeholder="Enter complete street address"
                  disabled={selectedAddress && !isEditingAddress}
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
                      value: /^\d{5,6}$/,
                      message: "Please enter a valid 5-6 digit pin code",
                    },
                  })}
                  type="text"
                  className={`w-full px-4 py-4 bg-[#F2F2F2] text-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all ${
                    selectedAddress && !isEditingAddress ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''
                  }`}
                  placeholder="Enter pincode"
                  disabled={selectedAddress && !isEditingAddress}
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
              <textarea
                {...register("remarks")}
                rows={3}
                className="w-full px-4 py-4 bg-[#F2F2F2] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all resize-none"
                placeholder="Any special instructions or remarks"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
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
                  className="w-[166px] bg-gray-200 text-gray-700 text-[20px] py-3 px-6 rounded-lg font-bold transition-all hover:bg-gray-300 border border-gray-300"
                >
                  Back
                </button>
              </div>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isDisabled}
                className={`w-[166px] __secondary-bg text-white text-[20px] py-3 px-6 rounded-lg font-bold transition-all ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && <AddressModal />}
    </div>
  );
};

export default Step2;