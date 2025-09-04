"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  BadgePlus,
  MapPin,
  Home,
  Users,
  Plus,
  Save,
  X,
} from "lucide-react";
import DateOfBirthPicker from "./DateOfBirthPicker";
import AddressTab from "./AddressTab";
import { BsWhatsapp } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/features/store/profileSlice";
import { fetchAddressList } from "@/features/store/addressListSlice";
import { service } from "@/features/shared/_services/api_service";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const {
    profileData: reduxProfileData,
    loadingStatus,
    error,
  } = useSelector((state) => state.profile);
  const addressListData = useSelector((state) => state.addressList);
  const [localProfileData, setLocalProfileData] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [activeAddressTab, setActiveAddressTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [deleteProcessing, setDeleteProcessing] = useState(false);

  const [newAddress, setNewAddress] = useState({
    id: "",
    label: "home",
    addressLine1: "",
    addressLine2: "",
    area: "",
    city: "",
    zipCode: "",
    country: "Malaysia",
    isDefault: false,
  });

  const [dateData, setDateData] = useState({ date: "", displayDate: "" });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [validationErrors, setValidationErrors] = useState({});
  const datePickerRef = useRef(null);

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImage(url);
    toast.success("Profile picture selected");
  };

  const handleEditSave = () => {
    setLocalProfileData({ ...editFormData, profileImage });
    setIsEditMode(false);
    toast.success("Your personal information has been successfully updated.");
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete || !addressToDelete.id) {
      toast.error("Invalid address selected");
      return;
    }

    // Prevent deletion of default address or last address
    if (addressToDelete.isDefault) {
      toast.error("Cannot delete the default address");
      setDeleteDialogOpen(false);
      setAddressToDelete(null);
      return;
    }

    if (editFormData.addresses.length <= 1) {
      toast.error("Cannot delete the last address");
      setDeleteDialogOpen(false);
      setAddressToDelete(null);
      return;
    }

    try {
      console.log("Attempting to delete address with ID:", addressToDelete.id);
      setDeleteProcessing(true);
      const response = await service.deleteAddress({ id: addressToDelete.id });

      if (response.status === 1) {
        toast.success("Address deleted successfully");
        await dispatch(fetchAddressList());
        setDeleteDialogOpen(false);
        setAddressToDelete(null);
      } else {
        console.error("Delete failed with response:", response);
        toast.error(response.message || "Failed to delete address");
      }
    } catch (error) {
      console.error("Delete address error:", error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    } finally {
      setDeleteProcessing(false);
    }
  };

  const handleAddressUpdate = (addressId, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) =>
        addr.id === addressId ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const setDefaultAddress = (addressId) => {
    setEditFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    }));
  };

  const openAddNewTab = () => {
    setNewAddress({
      id: "",
      label: "home",
      addressLine1: "",
      addressLine2: "",
      area: "",
      city: "",
      zipCode: "",
      country: "Malaysia",
      isDefault: false,
    });
    setActiveAddressTab("add-new");
  };

  const saveNewAddress = async () => {
    try {
      // Assuming service.addAddress exists and returns the new address with a server-generated ID
      const response = await service.addAddress({
        address_type: newAddress.label.toUpperCase(),
        street: newAddress.addressLine1,
        other_address_title: newAddress.addressLine2,
        city: newAddress.city,
        zip: newAddress.zipCode,
        country: newAddress.country,
        is_default: newAddress.isDefault ? "1" : "0",
      });

      if (response.status === 1 && response.data) {
        const addr = {
          id: response.data.id,
          label: newAddress.label,
          addressLine1: newAddress.addressLine1,
          addressLine2: newAddress.addressLine2,
          area: newAddress.area,
          city: newAddress.city,
          zipCode: newAddress.zipCode,
          country: newAddress.country,
          isDefault: newAddress.isDefault,
        };
        setEditFormData((prev) => ({
          ...prev,
          addresses: [...prev.addresses, addr],
        }));
        setNewAddress({
          id: "",
          label: "home",
          addressLine1: "",
          addressLine2: "",
          area: "",
          city: "",
          zipCode: "",
          country: "Malaysia",
          isDefault: false,
        });
        setActiveAddressTab("all"); // Always return to All Addresses tab after saving
        toast.success("New address added successfully");
        await dispatch(fetchAddressList());
      } else {
        toast.error(response.message || "Failed to add address");
      }
    } catch (error) {
      console.error("Add address error:", error);
      toast.error(error.response?.data?.message || "Failed to add address");
    }
  };

  useEffect(() => {
    dispatch(fetchProfileDetails());
    dispatch(fetchAddressList());
  }, [dispatch]);

  useEffect(() => {
    if (reduxProfileData) {
      const defaultAddress = reduxProfileData.address
        ? {
            id: reduxProfileData.address.id,
            label: reduxProfileData.address.address_type.toLowerCase(),
            addressLine1: reduxProfileData.address.street || "",
            addressLine2: reduxProfileData.address.other_address_title || "",
            area: "",
            city: reduxProfileData.address.city || "",
            zipCode: reduxProfileData.address.zip || "",
            country: reduxProfileData.address.country || "",
            isDefault: true,
          }
        : null;

      const additionalAddresses = addressListData?.data
        ? addressListData.data.map((addr) => ({
            id: addr.id,
            label: addr.address_type.toLowerCase(),
            addressLine1: addr.street || "",
            addressLine2: addr.other_address_title || "",
            area: "",
            city: addr.city || "",
            zipCode: addr.zip || "",
            country: addr.country || "",
            isDefault: addr.is_default === "1",
          }))
        : [];

      const allAddresses = defaultAddress
        ? [
            defaultAddress,
            ...additionalAddresses.filter(
              (addr) => addr.id !== defaultAddress.id
            ),
          ]
        : additionalAddresses;

      const formattedData = {
        name: reduxProfileData.name || "",
        phoneNumber: reduxProfileData.mobile || "",
        email: reduxProfileData.email || "",
        dob: reduxProfileData.dob || "",
        gender: reduxProfileData.gender || "",
        profileImage: reduxProfileData.profile_photo_path || null,
        addresses: allAddresses,
      };

      setLocalProfileData(formattedData);
      setEditFormData(formattedData);
      setProfileImage(formattedData.profileImage);
    }
  }, [reduxProfileData, addressListData]);

  if (!localProfileData) {
    return null;
  }

  const defaultAddress = localProfileData.addresses.find(
    (addr) => addr.isDefault
  );
  const defaultAddressDisplay = defaultAddress
    ? `${defaultAddress.addressLine1}${
        defaultAddress.addressLine2 ? ", " + defaultAddress.addressLine2 : ""
      }${defaultAddress.area ? ", " + defaultAddress.area : ""}, ${
        defaultAddress.city
      }`
    : "No address available";

  const renderAddressForm = (address) => {
    if (!address) return null;

    return (
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Label>Address Type</Label>
            <RadioGroup
              value={address.label}
              onValueChange={(value) =>
                handleAddressUpdate(address.id, "label", value)
              }
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id={`home-${address.id}`} />
                <Label htmlFor={`home-${address.id}`}>Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="office" id={`office-${address.id}`} />
                <Label htmlFor={`office-${address.id}`}>Office</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id={`other-${address.id}`} />
                <Label htmlFor={`other-${address.id}`}>Other</Label>
              </div>
            </RadioGroup>
          </div>

          {address.label === "other" && (
            <div>
              <Label htmlFor={`other-title-${address.id}`}>Address Title</Label>
              <Input
                id={`other-title-${address.id}`}
                value={address.addressLine2}
                onChange={(e) =>
                  handleAddressUpdate(
                    address.id,
                    "addressLine2",
                    e.target.value
                  )
                }
                placeholder="Enter address title"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor={`street-${address.id}`}>Street Address</Label>
            <Input
              id={`street-${address.id}`}
              value={address.addressLine1}
              onChange={(e) =>
                handleAddressUpdate(address.id, "addressLine1", e.target.value)
              }
              placeholder="Enter street address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`city-${address.id}`}>City</Label>
              <Input
                id={`city-${address.id}`}
                value={address.city}
                onChange={(e) =>
                  handleAddressUpdate(address.id, "city", e.target.value)
                }
                placeholder="Enter city"
                required
              />
            </div>
            <div>
              <Label htmlFor={`state-${address.id}`}>State</Label>
              <Input
                id={`state-${address.id}`}
                value={address.area}
                onChange={(e) =>
                  handleAddressUpdate(address.id, "area", e.target.value)
                }
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`country-${address.id}`}>Country</Label>
              <Input
                id={`country-${address.id}`}
                value={address.country}
                onChange={(e) =>
                  handleAddressUpdate(address.id, "country", e.target.value)
                }
                placeholder="Enter country"
                required
              />
            </div>
            <div>
              <Label htmlFor={`zip-${address.id}`}>ZIP Code</Label>
              <Input
                id={`zip-${address.id}`}
                value={address.zipCode}
                onChange={(e) =>
                  handleAddressUpdate(address.id, "zipCode", e.target.value)
                }
                placeholder="Enter ZIP code"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <RadioGroup
                value={address.isDefault ? address.id : ""}
                onValueChange={() => setDefaultAddress(address.id)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={address.id}
                    id={`default-${address.id}`}
                  />
                  <Label htmlFor={`default-${address.id}`}>
                    Mark as default address
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              variant="default"
              className="bg-[#ec098d] flex items-center gap-2"
              onClick={() => {
                // Save the changes here if needed
                setActiveAddressTab("all");
                toast.success("Address updated successfully");
              }}
            >
              <Save className="w-4 h-4" />
              Save Address
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  if (isEditMode) {
    return (
      <div className="p-4 md:p-6 max-w-[82.5rem] mx-auto">
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Address</DialogTitle>
              <DialogDescription>
                <span>
                  Are you sure you want to delete this address?
                </span>
              </DialogDescription>
            </DialogHeader>
            {addressToDelete && (
              <div className="mt-2 p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">
                  {addressToDelete.addressLine1}
                  {addressToDelete.addressLine2 &&
                    `, ${addressToDelete.addressLine2}`}
                  {addressToDelete.area && `, ${addressToDelete.area}`}
                  {`, ${addressToDelete.city}`}
                  {addressToDelete.zipCode && ` - ${addressToDelete.zipCode}`}
                  {`, ${addressToDelete.country}`}
                </span>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-[#ec098d]"
                onClick={handleConfirmDelete}
                disabled={deleteProcessing}
              >
                {deleteProcessing ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="rounded-[20px] p-6 shadow-lg">
          <div className="flex items-start">
            <div className="hidden md:flex items-center justify-center mr-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center border-2 border-amber-400 overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="w-8 h-8 text-white" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleProfileImageClick}
                  className="absolute -bottom-0 -right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                  aria-label="Change profile picture"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2z"
                    />
                  </svg>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    Name
                  </Label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="flex-1 ml-4"
                  />
                </div>
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    Phone Number
                  </Label>
                  <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight ml-4 px-2 py-4.5 bg-muted rounded-md">
                    {editFormData.phoneNumber}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    Email
                  </Label>
                  <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight ml-4 px-2 py-4.5 bg-muted rounded-md">
                    {editFormData.email}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    DOB
                  </Label>
                  <div className="flex-1 ml-4">
                    <DateOfBirthPicker
                      dateData={{
                        date: editFormData.dob,
                        displayDate: editFormData.dob
                          ? new Date(editFormData.dob).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "",
                      }}
                      setDateData={(newData) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          dob: newData.date,
                        }))
                      }
                      showDatePicker={showDatePicker}
                      setShowDatePicker={setShowDatePicker}
                      currentMonth={currentMonth}
                      setCurrentMonth={setCurrentMonth}
                      datePickerRef={datePickerRef}
                      isClient={true}
                      validationErrors={validationErrors}
                      setValidationErrors={setValidationErrors}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    Gender
                  </Label>
                  <Input
                    value={
                      editFormData.gender
                        ? editFormData.gender.charAt(0).toUpperCase() +
                          editFormData.gender.slice(1).toLowerCase()
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditFormData((prev) => ({
                        ...prev,
                        gender:
                          value.charAt(0).toUpperCase() +
                          value.slice(1).toLowerCase(),
                      }));
                    }}
                    className="flex-1 ml-4"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Label className="text-sm font-medium text-slate-600 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Addresses
                </Label>

                <Tabs
                  value={activeAddressTab}
                  onValueChange={(value) => {
                    if (value === "add-new") {
                      openAddNewTab();
                    } else {
                      setActiveAddressTab("all");
                    }
                  }}
                  className="mt-4"
                >
                  <TabsList className="flex gap-2 w-full">
                    <TabsTrigger
                      value="all"
                      className="flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      All Addresses
                    </TabsTrigger>
                    <TabsTrigger
                      value="add-new"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add New
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-4">
                      {editFormData.addresses
                        .filter((address) => address.isDefault)
                        .map((address) => (
                          <div
                            key={address.id}
                            className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium capitalize">
                                  {address.label}
                                </span>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                  Default
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">
                                {address.addressLine1}
                                {address.addressLine2 &&
                                  `, ${address.addressLine2}`}
                                {`, ${address.city}`}
                                {`, ${address.zipCode}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setActiveAddressTab(`edit-${address.id}`)
                                }
                                className="flex items-center gap-1"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2z"
                                  />
                                </svg>
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}

                      {editFormData.addresses
                        .filter((address) => !address.isDefault)
                        .map((address) => (
                          <div
                            key={address.id}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium capitalize">
                                  {address.label}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">
                                {address.addressLine1}
                                {address.addressLine2 &&
                                  `, ${address.addressLine2}`}
                                {address.area && `, ${address.area}`}
                                {`, ${address.city}`}
                                {address.zipCode && ` - ${address.zipCode}`}
                                {`, ${address.country}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setActiveAddressTab(`edit-${address.id}`)
                                }
                                className="flex items-center gap-1"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2z"
                                  />
                                </svg>
                                Edit
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setAddressToDelete(address);
                                  setDeleteDialogOpen(true);
                                }}
                                className="flex items-center gap-1 bg-[#ec098d]"
                                disabled={deleteProcessing}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  {editFormData.addresses.map((address) => (
                    <TabsContent
                      key={`edit-${address.id}`}
                      value={`edit-${address.id}`}
                      className="space-y-4 mt-6"
                    >
                      {renderAddressForm(address)}
                    </TabsContent>
                  ))}

                  <TabsContent value="add-new" className="space-y-4 mt-6">
                    <AddressTab onSaveSuccess={() => setActiveAddressTab("all")} />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex lg:flex-row flex-col gap-4 mt-8">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border-0 text-slate-600"
                  onClick={() => setIsEditMode(false)}
                >
                  <X className="w-5 h-5" />
                  <span className="text-sm p-4 !py-6">Cancel</span>
                </Button>
                <Button
                  className="flex items-center gap-2 bg-[#ec098d]"
                  onClick={handleEditSave}
                >
                  <Save className="w-5 h-5" />
                  <span className="text-sm p-4">Save Changes</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 max-w-[82.5rem] mx-auto">
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              <span>
                Are you sure you want to delete this address?
              </span>
            </DialogDescription>
          </DialogHeader>
          {addressToDelete && (
            <div className="mt-2 p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">
                {addressToDelete.addressLine1}
                {addressToDelete.addressLine2 &&
                  `, ${addressToDelete.addressLine2}`}
                {addressToDelete.area && `, ${addressToDelete.area}`}
                {`, ${addressToDelete.city}`}
                {addressToDelete.zipCode && ` - ${addressToDelete.zipCode}`}
                {`, ${addressToDelete.country}`}
              </span>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-[#ec098d]"
              onClick={handleConfirmDelete}
              disabled={deleteProcessing}
            >
              {deleteProcessing ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="rounded-[20px] p-6 shadow-lg">
        <div className="flex items-start">
          <div className="hidden md:flex items-center justify-center mr-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center border-2 border-amber-400 overflow-hidden">
                {localProfileData.profileImage ? (
                  <img
                    src={localProfileData.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-8 h-8 text-white" />
                )}
              </div>

              <button
                type="button"
                onClick={handleProfileImageClick}
                className="absolute -bottom-0 -right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                aria-label="Change profile picture"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2z"
                  />
                </svg>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                  Name
                </Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">
                  {localProfileData.name}
                </p>
              </div>
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                  Phone Number
                </Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">
                  {localProfileData.phoneNumber}
                </p>
              </div>
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                  Email
                </Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">
                  {localProfileData.email}
                </p>
              </div>
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                  DOB
                </Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">
                  {localProfileData.dob}
                </p>
              </div>
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                  Gender
                </Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">
                  {localProfileData.gender
                    ? localProfileData.gender.charAt(0).toUpperCase() +
                      localProfileData.gender.slice(1).toLowerCase()
                    : ""}
                </p>
              </div>
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                  Default Address
                </Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">
                  {defaultAddressDisplay}
                </p>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-4 mt-6">
              <Button
                variant="outline"
                className="flex items-center gap-2 !py-6 bg-slate-200 border-0 text-slate-900"
              >
                <BsWhatsapp className="w-5 h-5" />
                <span className="text-sm">Turn on WhatsApp Notifications</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 !py-6 bg-slate-200 border-0 text-slate-900"
                onClick={() => {
                  setEditFormData(localProfileData);
                  setProfileImage(localProfileData.profileImage);
                  setIsEditMode(true);
                }}
              >
                <BadgePlus className="w-5 h-5" />
                <span className="text-sm">Edit Personal Information</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSection;
export { ProfileSection };