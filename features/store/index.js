import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import homeReducer from "./homeSlice";
import serviceReducer from "./serviceSlice";
import brandReducer from "./brandSlice";
import testimonialReducer from "./testimonialSlice";
import howItWorkReducer from "./howItWorkSlice";
import servicesListReducer from "./servicesListSlice";
import serviceDetailsReducer from "./serviceDetailsSlice";
import serviceDetailsPageReducer from "./serviceDetailsPageSlice";
import aboutReducer from "./aboutSlice";
import faqReducer from "./faqSlice";
import enquiryReducer from "./enquirySlice";
import dynamicPageReducer from "./dynamicSlice";

import enquiryFormReducer from "./enquiryFormSlice";
import userProfileReducer from "./userProfileSlice";

import bookingReducer from "./bookingSlice";
import addressListReducer from "./addressListSlice";
import privacyPolicyReducer from "./privacyPolicySlice";
import termsConditionReducer from "./termsConditionSlice";
import bookingsReducer from "./BookingList"
import cmsReducer from "./dynamicSlice";
import paymentReducer from "./reviewSlice";

import reportReducer from "./reportSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    service: serviceReducer,
    brand: brandReducer,
    testimonial: testimonialReducer,
    howItWork: howItWorkReducer,
    servicesList: servicesListReducer,
    serviceDetails: serviceDetailsReducer,
    serviceDetailsPage: serviceDetailsPageReducer,
    about: aboutReducer,
    faq: faqReducer,
    enquiry: enquiryReducer,
    dynamicPage: dynamicPageReducer,
  enquiryForm: enquiryFormReducer,
  userProfile: userProfileReducer,
  booking: bookingReducer,
  addressList: addressListReducer,
  privacyPolicy: privacyPolicyReducer,
  termsCondition: termsConditionReducer,
  bookings: bookingsReducer,
  cms: cmsReducer,
  payment: paymentReducer,
  report: reportReducer,
  },
});

export default store;
