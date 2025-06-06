import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const DetailsForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-pink-500">sukai</h1>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Submit Your<br />
              Details
            </h2>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm text-gray-700">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="mobile" className="text-sm text-gray-700">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Create a password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
                placeholder="Confirm your password"
              />
            </div>

            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium">
              Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=800&fit=crop" 
          alt="Healthcare consultation"
          className="w-full h-full object-cover"
        />
        
        {/* Trust badge */}
        <div className="absolute bottom-8 left-8 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">120+ patients</div>
              <div className="text-gray-500 text-xs">★ 4.9 (2635 reviews)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
