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

async function homepage(payload) {
  return axios.get(rootUrl + "api/web/pages/details", { params: payload });
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

export const service = {
  signin,
  verifyOTP,
  userProfile,
  homepage,
  serviceList,
  serviceDetails,
  enquiryForm,
  bookingForm,
  addressDetails
};
