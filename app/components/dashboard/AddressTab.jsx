"use client";

import React, { useState } from "react";
import { MapPin, Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { createUserAddress } from "@/features/store/userAddressSlice";
import { fetchAddressList } from "@/features/store/addressListSlice";

const AddressTab = ({ onSaveSuccess }) => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector((state) => state.userAddress);

  const [addressData, setAddressData] = useState({
    id: "",
    address_type: "Home",
    other_address_title: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    zip: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressTypeChange = (value) => {
    setAddressData(prev => ({
      ...prev,
      address_type: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...addressData
    };

    // Only include other_address_title if address_type is Other
    if (addressData.address_type !== "Other") {
      delete payload.other_address_title;
    }

    const result = await dispatch(createUserAddress(payload));
    if (result?.status === 1) {
      // Reset form
      setAddressData({
        id: "",
        address_type: "Home",
        other_address_title: "",
        street: "",
        city: "",
        state: "",
        country: "India",
        zip: ""
      });
      
      // Refresh address list and notify parent component
      await dispatch(fetchAddressList());
      if (onSaveSuccess) {
        onSaveSuccess(); // This will trigger the tab change to "all"
      }
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label>Address Type</Label>
            <RadioGroup
              defaultValue="Home"
              value={addressData.address_type}
              onValueChange={handleAddressTypeChange}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Home" id="home" />
                <Label htmlFor="home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Office" id="office" />
                <Label htmlFor="office">Office</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          {addressData.address_type === "Other" && (
            <div>
              <Label htmlFor="other_address_title">Address Title</Label>
              <Input
                id="other_address_title"
                name="other_address_title"
                value={addressData.other_address_title}
                onChange={handleInputChange}
                placeholder="Enter address title"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              value={addressData.street}
              onChange={handleInputChange}
              placeholder="Enter street address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={addressData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={addressData.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                required
              />
            </div>
            <div>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                name="zip"
                value={addressData.zip}
                onChange={handleInputChange}
                placeholder="Enter ZIP code"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="max-w-[350px] px-4 bg-[#ec098d]"
            disabled={loadingStatus}
          >
            {loadingStatus ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddressTab;
