import axios from "axios";
import { authHeader } from "../_helper/auth-header";

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;

// api/signin

async function signin(payload) {
  return axios.post(rootUrl + "api/auth/login", payload);
}

async function verifyOTP(payload) {
  return axios.post(rootUrl + "api/auth/login", payload);
}

async function userProfile() {
  return axios.get(rootUrl + "api/web/user/profile-details", {
    headers: await authHeader(),
  });
}

async function updateProfile(payload) {
  return axios.put(rootUrl + "api/web/user/update-profile", payload, {
    headers: await authHeader(),
  });
}

async function homepage(payload) {
  return axios.get(rootUrl + "api/web/pages/details", { params: payload });
}

// export const service = {
//   homepage: async (payload) => {
//     return axios.get(rootUrl + "api/web/pages/details", { params: payload });
//   }
// };

async function paymentDetails(payload) {
  return axios.post(rootUrl + "api/web/bookings/payment-details", payload);
}

export async function getPageData(slug) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/web/pages/details`,
    { params: { slug } }
  ).then(res => res.data.data);
}

async function serviceList(payload) {
  return axios.get(rootUrl + "api/web/services/list", { params: payload });
}

async function serviceDetails(payload) {
  return axios.post(rootUrl + "api/web/services/details", payload, {
    headers: await authHeader(),
  });
}

async function enquiryForm(payload) {
  return axios.post(rootUrl + "/api/web/enquiry/submit", payload, {
    headers: await authHeader(),
  });
}

async function bookingForm(payload) {
  return axios.post(rootUrl + "/api/web/bookings/create", payload, {
    headers: await authHeader(),
  });
}

async function addressDetails() {
  return axios.get(rootUrl + "api/web/user/address/list", {
    headers: await authHeader(),
  });
}

// Bookings API method
async function bookings({ page = 1, limit = 10, booking_type = "past" }) {
  const params = {
    page: page.toString(),
    limit: limit.toString(),
    booking_type
  };
  
  return axios.get(rootUrl + "api/web/bookings", {
    params,
    headers: await authHeader(),
  });
}

// Verify or resend OTP
async function verifyOrResendOtp(payload) {
  return axios.post(rootUrl + "api/web/user/verify-or-resend-otp", payload, {
    headers: await authHeader(),
  });
}

// Cancel booking
async function cancelBooking(id, reason) {
  return axios.put(rootUrl + `api/web/bookings/${id}/cancel`, 
    { cancellation_reason: reason },
    { headers: await authHeader() }
  );
}

// Reschedule booking
async function rescheduleBooking(id, schedule_date, schedule_time, assigned_technician_id) {
  // Ensure we have a valid integer using unary plus operator
  const payload = {
    schedule_date: schedule_date,
    schedule_time: schedule_time,
    assigned_technician_id: +assigned_technician_id || 1
  };

  console.log('Reschedule Payload:', {
    ...payload,
    assigned_technician_id_type: typeof payload.assigned_technician_id
  });
    
  return axios.put(rootUrl + `api/web/bookings/${id}/reschedule`,
    payload,
    { headers: await authHeader() }
  );
}

async function createAddress(payload) {
  return axios.post(rootUrl + "api/web/user/address/create", payload, {
    headers: await authHeader(),
  }).then(response => response.data);
}

async function updateAddress(payload) {
  return axios.post(rootUrl + "api/web/user/address/create", payload, {
    headers: await authHeader(),
  }).then(response => response.data);
}

async function deleteAddress(payload) {
  return axios.delete(rootUrl + "api/web/user/address/delete", {
    headers: await authHeader(),
    data: { id: payload.id }
  }).then(response => response.data);
}

async function fetchSettings() {
  return axios.get(rootUrl + "api/web/settings");
}

export const service = {
  signin,
  verifyOTP,
  userProfile,
  updateProfile,
  homepage,
  fetchSettings,
  serviceList,
  serviceDetails,
  enquiryForm,
  bookingForm,
  addressDetails,
  bookings,
  paymentDetails,
  verifyOrResendOtp,
  createAddress,
  updateAddress,
  deleteAddress,
  cancelBooking,
  rescheduleBooking
};