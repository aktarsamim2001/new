import React from 'react';

const TestSection = ({ booking }) => {
  if (!booking) return null;

  const {
    booking_id,
    packages,
    booking_amount,
    coupon_code,
    coupon_discount_amount,
    final_amount,
    schedule_date,
    schedule_time,
    booking_status,
    payment_status,
    patient,
    address,
  } = booking;

  // Format date
  const formattedDate = new Date(schedule_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time
  const formattedTime = new Date(`2000-01-01T${schedule_time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Booking Header */}
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Booking ID: {booking_id}</h2>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              booking_status === 'confirmed' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {booking_status.charAt(0).toUpperCase() + booking_status.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              payment_status === 'paid' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {payment_status.charAt(0).toUpperCase() + payment_status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Patient Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{patient.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Contact</p>
            <p className="font-medium">{patient.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{patient.email}</p>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Address Details</h3>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-medium">{address.address_type}</p>
          <p className="text-gray-600">
            {address.street}, {address.city}, {address.state}, {address.country} - {address.zip}
          </p>
        </div>
      </div>

      {/* Schedule Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Schedule Details</h3>
        <div className="bg-gray-50 p-3 rounded">
          <p className="font-medium">{formattedDate}</p>
          <p className="text-gray-600">{formattedTime}</p>
        </div>
      </div>

      {/* Package Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Package Details</h3>
        <div className="border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Package Name</th>
                <th className="px-4 py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{pkg.package_name}</td>
                  <td className="px-4 py-2 text-right">${pkg.package_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div>
        <h3 className="text-lg font-medium mb-2">Payment Summary</h3>
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex justify-between mb-2">
            <span>Booking Amount</span>
            <span>${booking_amount}</span>
          </div>
          {coupon_code && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>Coupon Discount ({coupon_code})</span>
              <span>-${coupon_discount_amount}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-lg pt-2 border-t">
            <span>Final Amount</span>
            <span>${final_amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSection;
