export type Urgency = "low" | "medium" | "high" | "critical";
export type Confidence = "low" | "medium" | "high";
export type Language = "English" | "中文" | "Español";

export interface AnalysisRequest {
  message: string;
  language: Language;
}

export interface AnalysisResult {
  issue: string;
  summary: string;
  plainLanguageExplanation: string;
  consequence: string;
  urgency: Urgency;
  deadline: string | null;
  department: string;
  departmentReason: string;
  notRecommendedDepartment: string | null;
  notRecommendedReason: string | null;
  documents: string[];
  actions: string[];
  resourceId: string | null;
  confidence: Confidence;
  needsHumanConfirmation: boolean;
  emailSubject: string;
  emailBody: string;
}

export interface CampusResource {
  id: string;
  name: string;
  category: string;
  description: string;
  topics: string[];
  requiredDocuments: string[];
  officialUrl: string;
  verified: boolean;
  lastVerified: string;
}
