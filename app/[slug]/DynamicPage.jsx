'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
// Redux actions
import { fetchPageDataThunk, clearPageData } from '../../features/store/dynamicSlice'
import HomeClient from "../home/HomeClient";
import AboutClient from '../about/AboutClient'
import OurServices from "../our-services/OurServices.jsx";
import HowItWorkPage from "../how-it-works/HowItWorkPage";
import FAQPage from "../faq/FAQPage"
import EnquiryFormPage from "../enquiry-form/EnquiryForm";
import PrivacyPolicyPage from "../privacy-policy/PrivacyPolicyPage";
import TermsConditionPage from "../terms-condition/TermsConditionPage";
import SignInPage from "../sign-in/SignInPage"; 
import ServiceDetails from "../our-services/[slug]/page";

const DynamicPageClient = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { data, isLoading } = useSelector((state) => state.cms) || {};
  const { template } = data || {};

  useEffect(() => {
    dispatch(clearPageData());
    if (slug) {
      dispatch(fetchPageDataThunk({ slug }));
    }
  }, [dispatch, slug]);

  const renderPages = () => {
    switch (template) {
      case 'home_page':
        return <HomeClient content={data} />;
      case 'about_page':
        return <AboutClient content={data} />;
      case 'our_services':
        return <OurServices content={data} />;
      case 'how_it_works':
        return <HowItWorkPage content={data} />;
      case 'faq_page':
        return <FAQPage content={data} />;
      case 'contact_us_page':
        return <EnquiryFormPage content={data} />;
      case 'privacy_policy_page':
        return <PrivacyPolicyPage content={data.content} />;
      case 'terms_condition_page':
        return <TermsConditionPage content={data} />;
      case 'sign_in_page':
        return <SignInPage content={data} />;
      default:
        return null;
    }
  };

  return renderPages();
}

export default DynamicPageClient;
