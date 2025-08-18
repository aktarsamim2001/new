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
    about: aboutReducer
  },
});

export default store;
