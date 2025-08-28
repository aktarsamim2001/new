"use client";

import React, { useState, useRef } from "react";
import {
  BadgePlus,
  MapPin,
  Home,
  Building2,
  Users,
  Plus,
  Save,
  X,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const initialProfileData = {
  name: "Alex Herman",
  phoneNumber: "943252463",
  dob: "01/06/1999",
  gender: "Male",
  profileImage: null, // optional: preview data url
  addresses: [
    {
      id: "1",
      label: "home",
      addressLine1: "11 Green Lane",
      addressLine2: "",
      area: "Downtown",
      city: "Boston",
      zipCode: "05274",
      country: "Malaysia",
      isDefault: true,
    },
    {
      id: "2",
      label: "work",
      addressLine1: "22 Crown Road",
      addressLine2: "Suite 100",
      area: "Business District",
      city: "Boston",
      zipCode: "02732",
      country: "Malaysia",
      isDefault: false,
    },
  ],
};

const ProfileSection = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [profileImage, setProfileImage] = useState(initialProfileData.profileImage);
  const fileInputRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState(profileData);
  const [activeAddressTab, setActiveAddressTab] = useState("home");

  // state for the "Add New" form
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

  const handleEditSave = () => {
    // include profileImage in saved profile
    setProfileData({ ...editFormData, profileImage });
    setIsEditMode(false);
    toast.success("Your personal information has been successfully updated.");
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

  // When user clicks the Add New tab, show blank form (activate tab)
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

  const saveNewAddress = () => {
    const id = Date.now().toString();
    const addr = { ...newAddress, id };
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
    setActiveAddressTab(`address-${id}`);
    toast.success("New address added");
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImage(url);
    // Note: if you want to upload/save the file, handle the file object here
    toast.success("Profile picture selected");
  };

  const defaultAddress = profileData.addresses.find((addr) => addr.isDefault);
  const defaultAddressDisplay = defaultAddress
    ? `${defaultAddress.addressLine1}${
        defaultAddress.addressLine2 ? ", " + defaultAddress.addressLine2 : ""
      }, ${defaultAddress.area}, ${defaultAddress.city}`
    : "";

  const getAddressByLabel = (label) => {
    return editFormData.addresses.find((addr) => addr.label === label);
  };

  // ---------- helper to render the address form ----------
  const renderAddressForm = (address) => {
    if (!address) return null;

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="w-full">
            <Label className="text-sm font-medium">Address Label</Label>
            <Select
              value={address.label}
              onValueChange={(value) =>
                handleAddressUpdate(address.id, "label", value)
              }
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="family">Friends/Family</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Label className="text-sm font-medium">Country</Label>
            <Input
              value={address.country}
              onChange={(e) =>
                handleAddressUpdate(address.id, "country", e.target.value)
              }
              className="mt-1 w-full"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Address Line 1</Label>
          <Input
            value={address.addressLine1}
            onChange={(e) =>
              handleAddressUpdate(address.id, "addressLine1", e.target.value)
            }
            className="mt-1"
            placeholder="Enter address line 1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Address Line 2</Label>
          <Input
            value={address.addressLine2}
            onChange={(e) =>
              handleAddressUpdate(address.id, "addressLine2", e.target.value)
            }
            className="mt-1"
            placeholder="Enter address line 2 (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium">Area/Location</Label>
            <Input
              value={address.area}
              onChange={(e) =>
                handleAddressUpdate(address.id, "area", e.target.value)
              }
              className="mt-1"
              placeholder="Enter area"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">City</Label>
            <Input
              value={address.city}
              onChange={(e) =>
                handleAddressUpdate(address.id, "city", e.target.value)
              }
              className="mt-1"
              placeholder="Enter city"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Zip Code</Label>
            <Input
              value={address.zipCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                handleAddressUpdate(address.id, "zipCode", value);
              }}
              className="mt-1"
              placeholder="Enter zip code"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroup
            value={address.isDefault ? address.id : ""}
            onValueChange={() => setDefaultAddress(address.id)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={address.id} id={`default-${address.id}`} />
              <Label htmlFor={`default-${address.id}`} className="text-sm">
                Mark as default address
              </Label>
            </div>
          </RadioGroup>
        </div>
      </>
    );
  };

  // ----------------------- JSX -----------------------
  if (isEditMode) {
    return (
      <div className="p-4 md:p-6 max-w-[82.5rem] mx-auto">
        <Card className="rounded-[20px] p-6 shadow-lg ">
          <div className="flex items-start">
            <div className="hidden md:flex items-center justify-center mr-6">
              {/* Profile image with pencil overlay */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center border-2 border-amber-400 overflow-hidden">
                  {profileImage ? (
                    // preview chosen image
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
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
                  {/* pencil icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2z" />
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
                {/* Name */}
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    Name
                  </Label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="flex-1 ml-4"
                  />
                </div>
                {/* Phone Number - Read only */}
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">
                    Phone Number
                  </Label>
                  <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight ml-4 px-2 py-4.5 bg-muted rounded-md">
                    {editFormData.phoneNumber} <span className="text-[#00b8c1]"> (Verified Number)</span>
                  </p>
                </div>
                {/* DOB */}
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">DOB</Label>
                  <Input value={editFormData.dob} onChange={(e) => setEditFormData((prev) => ({ ...prev, dob: e.target.value }))} className="flex-1 ml-4" />
                </div>
                {/* Gender */}
                <div className="flex items-center justify-between pb-2">
                  <Label className="text-sm font-medium text-slate-600 w-40 text-left">Gender</Label>
                  <Input value={editFormData.gender} onChange={(e) => setEditFormData((prev) => ({ ...prev, gender: e.target.value }))} className="flex-1 ml-4" />
                </div>
              </div>

              {/* Addresses Section */}
              <div className="mt-8">
                <Label className="text-sm font-medium text-slate-600 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Addresses
                </Label>

                <Tabs value={activeAddressTab} onValueChange={setActiveAddressTab} className="mt-4">
                  <TabsList className="flex gap-2 w-full overflow-auto">
                    <TabsTrigger value="home" className="flex items-center gap-2">
                      <Home className="w-4 h-4" /> Home
                    </TabsTrigger>
                    <TabsTrigger value="work" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Work
                    </TabsTrigger>
                    <TabsTrigger value="family" className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Family/Friends
                    </TabsTrigger>

                    {/* dynamic triggers for "others" / custom addresses */}
                    {editFormData.addresses
                      .filter((addr) => !["home", "work", "family"].includes(addr.label))
                      .map((addr) => (
                        <TabsTrigger
                          key={addr.id}
                          value={`address-${addr.id}`}
                          className="flex items-center gap-2"
                        >
                          {addr.label || "Other"}
                        </TabsTrigger>
                      ))}

                    <TabsTrigger value="add-new" className="flex items-center gap-2" onClick={openAddNewTab}>
                      <Plus className="w-4 h-4" /> Add New
                    </TabsTrigger>
                  </TabsList>

                  {/* Fixed address tabs */}
                  {["home", "work", "family"].map((label) => {
                    const address = getAddressByLabel(label);
                    if (!address) return null;

                    return (
                      <TabsContent key={label} value={label} className="space-y-4 mt-6">
                        {renderAddressForm(address)}
                      </TabsContent>
                    );
                  })}

                  {/* Dynamic address contents */}
                  {editFormData.addresses
                    .filter((addr) => !["home", "work", "family"].includes(addr.label))
                    .map((address) => (
                      <TabsContent key={address.id} value={`address-${address.id}`} className="space-y-4 mt-6">
                        {renderAddressForm(address)}
                      </TabsContent>
                    ))}

                  {/* Add New tab content */}
                  <TabsContent value="add-new" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="w-full">
                        <Label className="text-sm font-medium">Address Label</Label>
                        <Select value={newAddress.label} onValueChange={(value) => setNewAddress((p) => ({ ...p, label: value }))}>
                          <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="Choose label" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="family">Friends/Family</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="w-full">
                        <Label className="text-sm font-medium">Country</Label>
                        <Input value={newAddress.country} onChange={(e) => setNewAddress((p) => ({ ...p, country: e.target.value }))} className="mt-1 w-full" placeholder="Enter country" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Address Line 1</Label>
                      <Input value={newAddress.addressLine1} onChange={(e) => setNewAddress((p) => ({ ...p, addressLine1: e.target.value }))} className="mt-1" placeholder="Enter address line 1" />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Address Line 2</Label>
                      <Input value={newAddress.addressLine2} onChange={(e) => setNewAddress((p) => ({ ...p, addressLine2: e.target.value }))} className="mt-1" placeholder="Enter address line 2 (optional)" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Area/Location</Label>
                        <Input value={newAddress.area} onChange={(e) => setNewAddress((p) => ({ ...p, area: e.target.value }))} className="mt-1" placeholder="Enter area" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">City</Label>
                        <Input value={newAddress.city} onChange={(e) => setNewAddress((p) => ({ ...p, city: e.target.value }))} className="mt-1" placeholder="Enter city" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Zip Code</Label>
                        <Input value={newAddress.zipCode} onChange={(e) => setNewAddress((p) => ({ ...p, zipCode: e.target.value.replace(/\D/g, "") }))} className="mt-1" placeholder="Enter zip code" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex lg:flex-row flex-col gap-4 mt-8">
                <Button variant="outline" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border-0 text-slate-600" onClick={() => setIsEditMode(false)}>
                  <X className="w-5 h-5" />
                  <span className="text-sm p-4 !py-6">Cancel</span>
                </Button>
                <Button className="flex items-center gap-2 bg-[#ec098d]" onClick={handleEditSave}>
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

  // ---------------- view mode ----------------
  return (
    <div className="px-4 md:px-6 max-w-[82.5rem] mx-auto">
      <Card className="rounded-[20px] p-6 shadow-lg">
        <div className="flex items-start">
          <div className="hidden md:flex items-center justify-center mr-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center border-2 border-amber-400 overflow-hidden">
                {profileData.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profileData.profileImage} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-8 h-8 text-white" />
                )}
              </div>

              {/* small pencil (non-editable view) — can still open file selector if you want */}
              <button type="button" onClick={handleProfileImageClick} className="absolute -bottom-0 -right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100" aria-label="Change profile picture">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-1.414.586H9v-2z" />
                </svg>
              </button>

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-5">
              {/* Name */}
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">Name</Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">{profileData.name}</p>
              </div>
              {/* Phone Number */}
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">Phone Number</Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">{profileData.phoneNumber}</p>
              </div>
              {/* DOB */}
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">DOB</Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">{profileData.dob}</p>
              </div>
              {/* Gender */}
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">Gender</Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">{profileData.gender}</p>
              </div>
              {/* Default Address */}
              <div className="flex items-center justify-between pb-2">
                <Label className="text-sm font-medium text-slate-600 w-40 text-left">Default Address</Label>
                <p className="text-slate-800 text-left flex-1 font-medium text-sm leading-tight">{defaultAddressDisplay}</p>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-4 mt-6">
              <Button variant="outline" className="flex items-center gap-2 !py-6 bg-slate-200 border-0 text-slate-900">
                <BsWhatsapp className="w-5 h-5" />
                <span className="text-sm">Turn on WhatsApp Notifications</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 !py-6 bg-slate-200 border-0 text-slate-900" onClick={() => { setEditFormData(profileData); setProfileImage(profileData.profileImage); setIsEditMode(true); }}>
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
