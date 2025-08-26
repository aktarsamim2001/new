"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTermsConditionData } from "../../features/store/termsConditionSlice";

export default function TermsConditionPage() {
  const dispatch = useDispatch();
  const { data, status, message, error } = useSelector(
    (state) => state.termsCondition
  );

  useEffect(() => {
    dispatch(fetchTermsConditionData({ slug: "terms-conditions" }));
  }, [dispatch]);

  const page = data?.content?.terms_condition_page;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full container mx-auto __gapTop px-2">
        <h1 className="text-3xl font-bold __secondary-text mb-6">{page?.main_title || "Terms & Conditions"}</h1>
        <p className="text-gray-700 mb-4">{page?.main_description}</p>
        {page?.items?.map((item, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-xl font-semibold __secondary-text mt-6 mb-3">{item.item_title}</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              {item.item_descriptions?.map((descObj, i) => (
                <li key={i}>{descObj.desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
