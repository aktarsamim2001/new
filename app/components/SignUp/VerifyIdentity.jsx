import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export const VerifyIdentity = () => {
  const [otp, setOtp] = useState('');

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
              Verify Your<br />
              Identity
            </h2>
            <p className="text-gray-600 text-sm">
              Enter OTP sent to your Mobile Number
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium">
              Continue
            </Button>

            {/* Resend */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button className="text-pink-500 hover:text-pink-600 font-medium">
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=800&fit=crop" 
          alt="Healthcare professionals"
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
