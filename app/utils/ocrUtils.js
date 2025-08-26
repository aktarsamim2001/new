"use client";

import {
  DetectDocumentTextCommand,
  TextractClient,
} from "@aws-sdk/client-textract";
import { Buffer } from "buffer";

// Initialize Buffer for browser environment
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

// Supported file types by AWS Textract
export const SUPPORTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "application/pdf",
];

// Maximum file size for synchronous API (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const getTextractClient = () => {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials not configured. Please check your environment variables.",
    );
  }

  return new TextractClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    maxAttempts: 3, // Retry failed requests
  });
};

// Enhanced medical data extraction patterns with improved accuracy
const MEDICAL_PATTERNS = {
  testName: [
    /(?:test\s*name|investigation|exam|profile|report\s*type)[:\s-]*([a-zA-Z\s&()\-]+)/i,
    /(complete\s+blood\s+count|cbc|hemogram)/i,
    /(lipid\s+profile|lipoprotein\s+profile)/i,
    /(liver\s+function\s+test|lft|hepatic\s+function)/i,
    /(kidney\s+function\s+test|kft|renal\s+profile|renal\s+function)/i,
    /(thyroid\s+profile|thyroid\s+function\s+test)/i,
    /(diabetes\s+test|blood\s+sugar|glucose\s+test)/i,
    /(vitamin\s+d|vit\s*d|25-oh\s*vitamin\s*d)/i,
    /(uric\s+acid|serum\s+uric\s+acid)/i,
    /(electrolyte\s+profile|serum\s+electrolytes)/i,
    /(cardiac\s+markers|troponin|ck\-mb)/i,
  ],
  date: [
    /(?:date|collected\s+on|sample\s+date|report\s+date|test\s+date)[:\s-]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i,
    /(?:dated|on)[:\s-]*(\d{1,2}(?:st|nd|rd|th)?\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4})/i,
    /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/,
  ],
  labName: [
    /(?:laboratory|lab|diagnostics|diagnostic\s+center|healthcare|pathology)[:\s-]*([a-zA-Z\s&.,'\-]+)/i,
    /^([a-zA-Z\s&.,'\-]+)\s*(?:laboratory|lab|diagnostics)/i,
  ],
  patientName: [
    /(?:patient\s+name|name\s+of\s+patient|patient|name)[:\s-]*([a-zA-Z\s.]+)/i,
    /(?:patient\s+details)[:\s-]*([a-zA-Z\s.]+)/i,
  ],
  patientId: [
    /(?:patient\s+id|id|uhid|mr\s+no|medical\s+record)[:\s-]*([a-zA-Z0-9\-]+)/i,
  ],
  doctorName: [
    /(?:referred\s+by|referred|consultant|doctor|physician|dr\.|requesting\s+physician)[:\s-]*([a-zA-Z\s.]+)/i,
  ],
  parameters: {
    // Lipid Profile
    cholesterol:
      /(?:cholesterol|total\s+cholesterol)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    hdl: /(?:hdl|high\s+density\s+lipoprotein)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    ldl: /(?:ldl|low\s+density\s+lipoprotein)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    triglycerides: /(?:triglycerides|tg)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    vldl: /(?:vldl|very\s+low\s+density\s+lipoprotein)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    totalLipids: /(?:total\s+lipids)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,

    // CBC
    hemoglobin: /(?:hemoglobin|hb)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    wbc: /(?:wbc|white\s+blood\s+cell|total\s+leucocyte\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ×\s³]+)?/i,
    rbc: /(?:rbc|red\s+blood\s+cell|erythrocyte\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ×\s³]+)?/i,
    platelets:
      /(?:platelets|platelet\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ×\s³]+)?/i,
    pcv: /(?:pcv|hematocrit|packed\s+cell\s+volume)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    mcv: /(?:mcv|mean\s+corpuscular\s+volume)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    mch: /(?:mch|mean\s+corpuscular\s+hemoglobin)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    mchc: /(?:mchc|mean\s+corpuscular\s+hemoglobin\s+concentration)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    neutrophils:
      /(?:neutrophils|neutrophil\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    lymphocytes:
      /(?:lymphocytes|lymphocyte\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    monocytes:
      /(?:monocytes|monocyte\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    eosinophils:
      /(?:eosinophils|eosinophil\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,
    basophils:
      /(?:basophils|basophil\s+count)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,

    // Liver Function
    bilirubinTotal:
      /(?:bilirubin\s+total|total\s+bilirubin)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    bilirubinDirect:
      /(?:bilirubin\s+direct|direct\s+bilirubin)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    bilirubinIndirect:
      /(?:bilirubin\s+indirect|indirect\s+bilirubin)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    sgpt: /(?:sgpt|alt|alanine\s+transaminase)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    sgot: /(?:sgot|ast|aspartate\s+transaminase)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    alp: /(?:alp|alkaline\s+phosphatase)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    albumin: /(?:albumin)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    totalProtein:
      /(?:total\s+protein|protein\s+total)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    globulin: /(?:globulin)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    agRatio:
      /(?:a\/g\s+ratio|albumin\/globulin\s+ratio)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    ggt: /(?:ggt|gamma\s+glutamyl\s+transferase)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,

    // Kidney Function
    creatinine:
      /(?:creatinine|serum\s+creatinine)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    urea: /(?:urea|blood\s+urea)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    bun: /(?:bun|blood\s+urea\s+nitrogen)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    uricAcid:
      /(?:uric\s+acid|serum\s+uric\s+acid)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    sodium: /(?:sodium|na\+)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    potassium: /(?:potassium|k\+)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    chloride: /(?:chloride|cl\-)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    calcium: /(?:calcium|serum\s+calcium)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    phosphorus: /(?:phosphorus|phosphate)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,

    // Thyroid
    tsh: /(?:tsh|thyroid\s+stimulating\s+hormone)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    t3: /(?:t3|triiodothyronine)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    t4: /(?:t4|thyroxine)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    freeT3: /(?:free\s+t3|ft3)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    freeT4: /(?:free\s+t4|ft4)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,

    // Diabetes
    glucoseFasting:
      /(?:glucose\s+fasting|fasting\s+blood\s+sugar|fbs)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    glucosePostPrandial:
      /(?:glucose\s+post\s+prandial|ppbs|post\s+prandial\s+blood\s+sugar)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    glucoseRandom:
      /(?:glucose\s+random|random\s+blood\s+sugar|rbs)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    hba1c:
      /(?:hba1c|glycosylated\s+hemoglobin|a1c)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ%]+)?/i,

    // Vitamins
    vitaminD:
      /(?:vitamin\s+d|vit\s*d|25-hydroxyvitamin\s+d)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    vitaminB12:
      /(?:vitamin\s+b12|vit\s*b12)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    vitaminB9:
      /(?:vitamin\s+b9|folate|folic\s+acid)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,

    // Cardiac
    troponin: /(?:troponin|troponin\s+i)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    ckMb: /(?:ck\-mb|creatine\s+kinase\s+mb)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
    ntProBnp: /(?:nt\-probnp|bnp)[:\s-]*(\d+\.?\d*)\s*([a-zA-Z\/μ]+)?/i,
  },
};

// Enhanced text cleaning and normalization
const cleanText = (text) => {
  return text
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/[^\w\s.,:%\-()\/&]/g, "") // Remove special characters but keep essential ones
    .trim()
    .toLowerCase();
};

// Context-aware pattern matching
const findPatternInContext = (text, patterns, contextWindow = 50) => {
  const cleanedText = cleanText(text);

  for (const pattern of patterns) {
    const match = cleanedText.match(pattern);
    if (match) {
      // Extract context around the match for better accuracy
      const matchIndex = cleanedText.indexOf(match[0]);
      const start = Math.max(0, matchIndex - contextWindow);
      const end = Math.min(
        cleanedText.length,
        matchIndex + match[0].length + contextWindow,
      );
      const context = cleanedText.substring(start, end);

      return {
        value: match[1] || match[0],
        context,
        confidence: 0.9, // High confidence for pattern matches
      };
    }
  }

  return null;
};

// Extract medical data from text with improved accuracy
const extractMedicalData = (text) => {
  const result = {
    testName: "Unknown Test",
    dateOfReport: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    labName: "Unknown Lab",
    patientName: "Unknown Patient",
    patientId: "Unknown ID",
    doctorName: "Unknown Doctor",
    parameters: [],
    confidence: 0,
    extractedFields: 0,
  };

  const cleanedText = cleanText(text);
  let totalConfidence = 0;
  let fieldsFound = 0;

  // Extract test name with context
  const testNameMatch = findPatternInContext(text, MEDICAL_PATTERNS.testName);
  if (testNameMatch) {
    result.testName = testNameMatch.value;
    totalConfidence += testNameMatch.confidence;
    fieldsFound++;
  }

  // Extract date with multiple pattern attempts
  const dateMatch = findPatternInContext(text, MEDICAL_PATTERNS.date);
  if (dateMatch) {
    try {
      const dateValue = dateMatch.value;
      // Handle different date formats
      let dateObj;

      if (dateValue.match(/[a-z]/i)) {
        // Textual date format (e.g., "15th Jan 2023")
        dateObj = new Date(dateValue);
      } else {
        // Numerical date format (e.g., "15/01/2023")
        const dateParts = dateValue.split(/[\/\-\.]/);
        if (dateParts.length === 3) {
          const day = dateParts[0].padStart(2, "0");
          const month = dateParts[1].padStart(2, "0");
          const year =
            dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
          dateObj = new Date(`${year}-${month}-${day}`);
        }
      }

      if (dateObj && !isNaN(dateObj.getTime())) {
        result.dateOfReport = dateObj.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        totalConfidence += 0.85;
        fieldsFound++;
      }
    } catch (error) {
      console.warn("Date parsing error:", error);
    }
  }

  // Extract lab name
  const labNameMatch = findPatternInContext(text, MEDICAL_PATTERNS.labName);
  if (labNameMatch) {
    result.labName = labNameMatch.value;
    totalConfidence += labNameMatch.confidence;
    fieldsFound++;
  }

  // Extract patient name
  const patientNameMatch = findPatternInContext(
    text,
    MEDICAL_PATTERNS.patientName,
  );
  if (patientNameMatch) {
    result.patientName = patientNameMatch.value;
    totalConfidence += patientNameMatch.confidence;
    fieldsFound++;
  }

  // Extract patient ID
  const patientIdMatch = findPatternInContext(text, MEDICAL_PATTERNS.patientId);
  if (patientIdMatch) {
    result.patientId = patientIdMatch.value;
    totalConfidence += patientIdMatch.confidence;
    fieldsFound++;
  }

  // Extract doctor name
  const doctorNameMatch = findPatternInContext(
    text,
    MEDICAL_PATTERNS.doctorName,
  );
  if (doctorNameMatch) {
    result.doctorName = doctorNameMatch.value;
    totalConfidence += doctorNameMatch.confidence;
    fieldsFound++;
  }

  // Extract parameters with improved accuracy
  const uniqueParameters = new Set();

  for (const [paramName, pattern] of Object.entries(
    MEDICAL_PATTERNS.parameters,
  )) {
    const regex = new RegExp(pattern.source, "gi");
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        const parameterKey = `${paramName}-${match[1]}`;

        // Avoid duplicates
        if (!uniqueParameters.has(parameterKey)) {
          uniqueParameters.add(parameterKey);

          // Calculate confidence based on pattern match quality
          let confidence = 0.8; // Base confidence
          if (match[2]) confidence += 0.1; // Unit present increases confidence
          if (match[0].includes(":")) confidence += 0.05; // Colon format increases confidence

          result.parameters.push({
            name: paramName,
            displayName: paramName
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            value: match[1].trim(),
            unit: match[2]?.trim() || getDefaultUnit(paramName),
            confidence: Math.min(confidence, 0.95),
            rawMatch: match[0],
          });

          totalConfidence += confidence;
          fieldsFound++;
        }
      }
    }
  }

  // Calculate overall confidence
  if (fieldsFound > 0) {
    result.confidence = totalConfidence / fieldsFound;
    result.extractedFields = fieldsFound;
  }

  return result;
};

// Enhanced unit mapping
const getDefaultUnit = (paramName) => {
  const unitMap = {
    hemoglobin: "g/dL",
    wbc: "x10³/μL",
    rbc: "x10⁶/μL",
    platelets: "x10³/μL",
    pcv: "%",
    mcv: "fL",
    mch: "pg",
    mchc: "g/dL",
    neutrophils: "%",
    lymphocytes: "%",
    monocytes: "%",
    eosinophils: "%",
    basophils: "%",

    cholesterol: "mg/dL",
    hdl: "mg/dL",
    ldl: "mg/dL",
    triglycerides: "mg/dL",
    vldl: "mg/dL",
    totalLipids: "mg/dL",

    bilirubinTotal: "mg/dL",
    bilirubinDirect: "mg/dL",
    bilirubinIndirect: "mg/dL",
    sgpt: "U/L",
    sgot: "U/L",
    alp: "U/L",
    albumin: "g/dL",
    totalProtein: "g/dL",
    globulin: "g/dL",
    agRatio: "ratio",
    ggt: "U/L",

    creatinine: "mg/dL",
    urea: "mg/dL",
    bun: "mg/dL",
    uricAcid: "mg/dL",
    sodium: "mEq/L",
    potassium: "mEq/L",
    chloride: "mEq/L",
    calcium: "mg/dL",
    phosphorus: "mg/dL",

    tsh: "μIU/mL",
    t3: "ng/dL",
    t4: "μg/dL",
    freeT3: "pg/mL",
    freeT4: "ng/dL",

    glucoseFasting: "mg/dL",
    glucosePostPrandial: "mg/dL",
    glucoseRandom: "mg/dL",
    hba1c: "%",

    vitaminD: "ng/mL",
    vitaminB12: "pg/mL",
    vitaminB9: "ng/mL",

    troponin: "ng/mL",
    ckMb: "U/L",
    ntProBnp: "pg/mL",
  };

  return unitMap[paramName] || "units";
};

// Enhanced OCR processing with better error handling
const processDocument = async (file) => {
  const client = getTextractClient();

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds the maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params = {
      Document: {
        Bytes: buffer,
      },
    };

    const command = new DetectDocumentTextCommand(params);
    const response = await client.send(command);

    if (!response.Blocks || response.Blocks.length === 0) {
      throw new Error(
        "No text could be extracted from the document. The document may be blank, low quality, or in an unsupported format.",
      );
    }

    // Extract and organize text blocks
    const textBlocks = response.Blocks.filter(
      (block) =>
        block.BlockType === "LINE" && block.Text && block.Confidence > 60,
    ).map((block, index) => ({
      id: `line-${index}-${block.Page || 1}`,
      text: block.Text,
      confidence: block.Confidence,
      page: block.Page || 1,
      geometry: block.Geometry,
    }));

    if (textBlocks.length === 0) {
      throw new Error(
        "No readable text found with sufficient confidence. Please ensure the document is clear and legible.",
      );
    }

    // Organize text by pages and maintain reading order
    const textByPage = {};
    textBlocks.forEach((block) => {
      if (!textByPage[block.page]) {
        textByPage[block.page] = [];
      }
      textByPage[block.page].push(block);
    });

    // Sort text within each page by vertical position (reading order)
    Object.keys(textByPage).forEach((page) => {
      textByPage[page].sort((a, b) => {
        const aTop = a.geometry?.BoundingBox?.Top || 0;
        const bTop = b.geometry?.BoundingBox?.Top || 0;
        return aTop - bTop;
      });
    });

    // Extract full text with proper ordering
    const fullText = Object.keys(textByPage)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((page) => textByPage[page].map((block) => block.text).join(" "))
      .join("\n\n");

    const medicalData = extractMedicalData(fullText);

    // Calculate overall confidence
    const averageConfidence =
      textBlocks.reduce((sum, block) => sum + block.confidence, 0) /
      textBlocks.length;
    const overallConfidence =
      averageConfidence * 0.6 + medicalData.confidence * 0.4;

    return {
      success: true,
      data: {
        ...medicalData,
        overallConfidence: Math.round(overallConfidence * 100) / 100,
      },
      rawText: fullText,
      textByPage,
      totalPages: Object.keys(textByPage).length,
      totalLines: textBlocks.length,
      averageConfidence: Math.round(averageConfidence * 100) / 100,
      processingTime: new Date().toISOString(),
      fileInfo: {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      },
    };
  } catch (error) {
    console.error("OCR Processing Error:", error);

    // Enhanced error messages
    let userMessage = error.message;

    if (error.name === "InvalidParameterException") {
      userMessage =
        "Invalid document format. Please ensure the file is a valid JPEG, PNG, TIFF, or PDF file.";
    } else if (error.name === "AccessDeniedException") {
      userMessage =
        "AWS access denied. Please check your credentials and permissions.";
    } else if (error.name === "ThrottlingException") {
      userMessage =
        "Service temporarily unavailable. Please try again in a few moments.";
    } else if (error.name === "InternalServerError") {
      userMessage = "Internal server error. Please try again later.";
    } else if (error.name === "InvalidS3ObjectException") {
      userMessage = "Invalid file format or corrupted file.";
    }

    throw new Error(userMessage);
  }
};

// Main OCR processing function
export const processDocumentWithOCR = async (file) => {
  // Validate file type
  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    const supportedTypes = SUPPORTED_FILE_TYPES.map((type) =>
      type.replace("image/", "").replace("application/", ""),
    ).join(", ");

    throw new Error(`Unsupported file format. Please use: ${supportedTypes}`);
  }

  try {
    const result = await processDocument(file);
    return result;
  } catch (error) {
    console.error("OCR Processing Failed:", error);
    throw error; // Re-throw the enhanced error message
  }
};

// Utility function to validate document before processing
export const validateDocument = (file) => {
  const errors = [];

  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    errors.push("Unsupported file format");
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (file.size === 0) {
    errors.push("File is empty");
  }

  return {
    isValid: errors.length === 0,
    errors,
    fileInfo: {
      name: file.name,
      type: file.type,
      size: file.size,
      sizeMB: (file.size / 1024 / 1024).toFixed(2),
    },
  };
};
