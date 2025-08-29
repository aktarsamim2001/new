'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

const SkeletonLayout = () => {
  return (
    <div className="p-6 space-y-8 animate-pulse">
      {/* Banner / Hero Section */}
      <div className="w-full h-48 rounded-xl overflow-hidden">
        <Skeleton height="100%" />
      </div>

      {/* Title */}
      <div>
        <Skeleton height={30} width={260} />
        <Skeleton height={20} width={180} className="mt-2" />
      </div>

      {/* Content blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton height={25} width="70%" />
            <Skeleton count={3} />
          </div>
        ))}
      </div>

      {/* Image cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-32 rounded-xl overflow-hidden">
            <Skeleton height="100%" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Skeleton height={45} width={140} borderRadius={9999} />
        <Skeleton height={45} width={140} borderRadius={9999} />
      </div>
    </div>
  )
}

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

  if (isLoading) {
    return <SkeletonLayout />;
  }

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
        return <SkeletonLayout />;
    }
  };

  return renderPages();
}

export default DynamicPageClient;
