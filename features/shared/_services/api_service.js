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
  const response = await axios.get(rootUrl + "api/web/user/address/list", {
    headers: await authHeader(),
  });
  return response.data;
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

export const service = {
  signin,
  verifyOTP,
  userProfile,
  updateProfile,
  homepage,
  serviceList,
  serviceDetails,
  enquiryForm,
  bookingForm,
  addressDetails,
  bookings,
  paymentDetails,
  verifyOrResendOtp
};