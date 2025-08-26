import React, { useState } from "react";
import { BadgePlus, X } from "lucide-react";
import { MdOutlineZoomOutMap } from "react-icons/md";

const ReviewDetailSection = ({ reportData, onConfirm, onEdit }) => {
  const [isEditing, setIsEditing] = useState({});
  const [showAddParamModal, setShowAddParamModal] = useState(false);

  // Local state to track temporary values during editing
  const [tempValues, setTempValues] = useState({});

  const [newParameter, setNewParameter] = useState({
    name: "",
    value: "",
    unit: "",
  });

  const handleEdit = (field) => {
    if (isEditing[field]) {
      // Save the value when switching from edit mode
      const valueToSave =
        tempValues[field] !== undefined
          ? tempValues[field]
          : getCurrentValue(field);
      onEdit(field, valueToSave);
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      // Clear temp value
      setTempValues((prev) => {
        const newTempValues = { ...prev };
        delete newTempValues[field];
        return newTempValues;
      });
    } else {
      // Enter edit mode and store current value in temp
      setTempValues((prev) => ({ ...prev, [field]: getCurrentValue(field) }));
      setIsEditing((prev) => ({ ...prev, [field]: true }));
    }
  };

  const getCurrentValue = (field) => {
    if (field.startsWith("param-")) {
      const [, type, index] = field.split("-");
      return reportData.parameters[parseInt(index)][type];
    }
    return reportData[field];
  };

  const handleTempValueChange = (field, value) => {
    setTempValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleParameterEdit = (index, field, value) => {
    const parameters = [...reportData.parameters];
    parameters[index][field] = value;
    onEdit("parameters", parameters);
  };

  const handleParameterTempChange = (index, field, value) => {
    const fieldKey = `param-${field}-${index}`;
    setTempValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleParameterSave = (index, field) => {
    const fieldKey = `param-${field}-${index}`;
    const value =
      tempValues[fieldKey] !== undefined
        ? tempValues[fieldKey]
        : reportData.parameters[index][field];
    handleParameterEdit(index, field, value);
    setIsEditing((prev) => ({ ...prev, [fieldKey]: false }));
    // Clear temp value
    setTempValues((prev) => {
      const newTempValues = { ...prev };
      delete newTempValues[fieldKey];
      return newTempValues;
    });
  };

  const addNewParameter = () => {
    if (newParameter.name && newParameter.value) {
      const parameters = [...reportData.parameters, { ...newParameter }];
      onEdit("parameters", parameters);
      setNewParameter({ name: "", value: "", unit: "" });
      setShowAddParamModal(false);
    }
  };

  const removeParameter = (index) => {
    if (reportData.parameters.length > 1) {
      const newParams = reportData.parameters.filter((_, i) => i !== index);
      onEdit("parameters", newParams);
    }
  };

  return (
    <>
      <div className="container mx-auto __gapTop">
        {/* Header with Back Button (show based on source) */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="section__heading text-[#EC098D] mb-4">
                Review & Confirm Your Report
              </h2>
              <p className="text-gray-600">
                Here's what we found from your uploaded report. Please review
                and make corrections if needed before saving.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 __gapTop">
          {/* Section 01: File Preview */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-16 w-full md:w-[90%] mb-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="text-black font-[550] text-[20px]">01</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Uploaded File Preview
              </h2>
            </div>
            <div className="bg-white ____shadow-card w-full rounded-xl p-4 text-center text-[16px] font-[550] cursor-pointer flex-1">
              <button className="flex items-center gap-2 font-[500px] leading-[135%] cursor-pointe text-[18px] mx-auto px-4 py-6 text-gray-600 hover:__secondary-text transition-colors">
                <MdOutlineZoomOutMap className="w-5 h-5" />
                View Uploaded File
              </button>
            </div>
          </div>

          {/* Section 02: Auto-Extracted Info */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-20 md:w-[90%] mb-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="text-black font-[550] text-[20px]">02</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Auto-Extracted Info
              </h2>
            </div>

            <div className="space-y-4 w-full flex-1">
              {/* Basic Info */}
              <div className="w-full grid grid-cols-1 gap-4 bg-white p-4 md:p-6 rounded-lg ____shadow-card">
                {/* Test Name */}
                <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                  <span className="text-gray-600 font-[400]">Test Name</span>
                  <div className="flex items-center gap-2">
                    {isEditing.testName ? (
                      <input
                        type="text"
                        value={
                          tempValues.testName !== undefined
                            ? tempValues.testName
                            : reportData.testName
                        }
                        onChange={(e) =>
                          handleTempValueChange("testName", e.target.value)
                        }
                        className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-800 text-[16px] font-[550]">
                        {reportData.testName}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit("testName")}
                    className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                  >
                    {isEditing.testName ? "Save" : "Edit"}
                  </button>
                </div>

                {/* Date of Report */}
                <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                  <span className="text-gray-600 font-[400]">
                    Date of Report
                  </span>
                  <div className="flex items-center gap-2">
                    {isEditing.dateOfReport ? (
                      <input
                        type="text"
                        value={
                          tempValues.dateOfReport !== undefined
                            ? tempValues.dateOfReport
                            : reportData.dateOfReport
                        }
                        onChange={(e) =>
                          handleTempValueChange("dateOfReport", e.target.value)
                        }
                        className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-800 text-[16px] font-[550]">
                        {reportData.dateOfReport}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit("dateOfReport")}
                    className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                  >
                    {isEditing.dateOfReport ? "Save" : "Edit"}
                  </button>
                </div>

                {/* Lab Name */}
                <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                  <span className="text-gray-600 font-[400]">Lab Name</span>
                  <div className="flex items-center gap-2">
                    {isEditing.labName ? (
                      <input
                        type="text"
                        value={
                          tempValues.labName !== undefined
                            ? tempValues.labName
                            : reportData.labName
                        }
                        onChange={(e) =>
                          handleTempValueChange("labName", e.target.value)
                        }
                        className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-800 text-[16px] font-[550]">
                        {reportData.labName}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit("labName")}
                    className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                  >
                    {isEditing.labName ? "Save" : "Edit"}
                  </button>
                </div>

                {/* Patient Name */}
                <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                  <span className="text-gray-600 font-[400]">Patient Name</span>
                  <div className="flex items-center gap-2">
                    {isEditing.patientName ? (
                      <input
                        type="text"
                        value={
                          tempValues.patientName !== undefined
                            ? tempValues.patientName
                            : reportData.patientName
                        }
                        onChange={(e) =>
                          handleTempValueChange("patientName", e.target.value)
                        }
                        className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-800 text-[16px] font-[550]">
                        {reportData.patientName}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit("patientName")}
                    className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                  >
                    {isEditing.patientName ? "Save" : "Edit"}
                  </button>
                </div>

                {/* Doctor Name */}
                <div className="flex justify-between items-center md:grid grid-cols-3 md:p-3">
                  <span className="text-gray-600 font-[400]">Doctor Name</span>
                  <div className="flex items-center gap-2">
                    {isEditing.doctorName ? (
                      <input
                        type="text"
                        value={
                          tempValues.doctorName !== undefined
                            ? tempValues.doctorName
                            : reportData.doctorName
                        }
                        onChange={(e) =>
                          handleTempValueChange("doctorName", e.target.value)
                        }
                        className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-800 text-[16px] font-[550]">
                        {reportData.doctorName}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit("doctorName")}
                    className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors"
                  >
                    {isEditing.doctorName ? "Save" : "Edit"}
                  </button>
                </div>
              </div>

              {/* Detailed Parameters */}
              <div className="mt-8 bg-white p-4 md:p-6 rounded-lg ____shadow-card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Detailed Parameters
                </h3>
                <div className="space-y-3">
                  {reportData.parameters.map((param, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center md:grid grid-cols-3 p-3"
                    >
                      {/* Parameter Name */}
                      <div className="flex items-center gap-2">
                        {isEditing[`param-name-${index}`] ? (
                          <input
                            type="text"
                            value={
                              tempValues[`param-name-${index}`] !== undefined
                                ? tempValues[`param-name-${index}`]
                                : param.name
                            }
                            onChange={(e) =>
                              handleParameterTempChange(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1 w-full"
                            autoFocus
                          />
                        ) : (
                          <span className="font-[400]">{param.name}</span>
                        )}
                      </div>

                      {/* Parameter Value and Unit */}
                      <div className="flex items-center gap-2">
                        {isEditing[`param-value-${index}`] ? (
                          <input
                            type="text"
                            value={
                              tempValues[`param-value-${index}`] !== undefined
                                ? tempValues[`param-value-${index}`]
                                : param.value
                            }
                            onChange={(e) =>
                              handleParameterTempChange(
                                index,
                                "value",
                                e.target.value,
                              )
                            }
                            className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1 w-20"
                            autoFocus
                          />
                        ) : (
                          <span className="text-[16px] font-[550]">
                            {param.value}
                          </span>
                        )}

                        {isEditing[`param-unit-${index}`] ? (
                          <input
                            type="text"
                            value={
                              tempValues[`param-unit-${index}`] !== undefined
                                ? tempValues[`param-unit-${index}`]
                                : param.unit
                            }
                            onChange={(e) =>
                              handleParameterTempChange(
                                index,
                                "unit",
                                e.target.value,
                              )
                            }
                            className="border-0 border-b-2 border-gray-300 focus:border-[#EC098D] outline-none bg-transparent px-2 py-1 w-16"
                          />
                        ) : (
                          <span className="text-[15px] font-semibold">
                            {param.unit}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            // Toggle edit mode for all parameter fields
                            const nameKey = `param-name-${index}`;
                            const valueKey = `param-value-${index}`;
                            const unitKey = `param-unit-${index}`;

                            const isCurrentlyEditing =
                              isEditing[nameKey] ||
                              isEditing[valueKey] ||
                              isEditing[unitKey];

                            if (isCurrentlyEditing) {
                              // Save all fields
                              if (isEditing[nameKey])
                                handleParameterSave(index, "name");
                              if (isEditing[valueKey])
                                handleParameterSave(index, "value");
                              if (isEditing[unitKey])
                                handleParameterSave(index, "unit");
                            } else {
                              // Enter edit mode for all fields
                              setTempValues((prev) => ({
                                ...prev,
                                [nameKey]: param.name,
                                [valueKey]: param.value,
                                [unitKey]: param.unit,
                              }));
                              setIsEditing((prev) => ({
                                ...prev,
                                [nameKey]: true,
                                [valueKey]: true,
                                [unitKey]: true,
                              }));
                            }
                          }}
                          className="text-gray-400 underline cursor-pointer hover:text-pink-500 transition-colors ml-2"
                        >
                          Edit
                        </button>

                        {reportData.parameters.length > 1 && (
                          <button
                            onClick={() => removeParameter(index)}
                            className="text-red-400 underline cursor-pointer hover:text-red-600 transition-colors ml-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Parameter Button */}
                <button
                  onClick={() => setShowAddParamModal(true)}
                  className="mt-4 md:mt-10 bg-[#eee] p-3 rounded-[4px] flex items-center gap-2 text-gray-500 hover:text-gray-600 cursor-pointer font-[400] transition-colors"
                >
                  <BadgePlus />
                  <span>Add Another Parameter</span>
                </button>
              </div>

              {/* Confirm Button */}
              <div className="text-left mt-10">
                <button
                  onClick={onConfirm}
                  className="__secondary-bg px-5 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-colors __heading"
                >
                  Confirm & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Parameter Modal */}
      {showAddParamModal && (
        <div className="fixed inset-0 bg-transparent-blur flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Parameter</h3>
              <button
                onClick={() => setShowAddParamModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parameter Name
                </label>
                <input
                  type="text"
                  value={newParameter.name}
                  onChange={(e) =>
                    setNewParameter({ ...newParameter, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., HDL, LDL, Glucose"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="text"
                  value={newParameter.value}
                  onChange={(e) =>
                    setNewParameter({ ...newParameter, value: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., 35, 150, 90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit (optional)
                </label>
                <input
                  type="text"
                  value={newParameter.unit}
                  onChange={(e) =>
                    setNewParameter({ ...newParameter, unit: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., mg/dl, U/L, %"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddParamModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addNewParameter}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                disabled={!newParameter.name || !newParameter.value}
              >
                Add Parameter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewDetailSection;
