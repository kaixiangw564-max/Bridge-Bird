import { AnalysisResult, AnalysisRequest, Language } from "@/types/analysis";

const VALID_URGENCY = ["low", "medium", "high", "critical"] as const;
const VALID_CONFIDENCE = ["low", "medium", "high"] as const;
const VALID_LANGUAGES: Language[] = ["English", "中文", "Español"];

export function validateAnalysisRequest(
  body: unknown
): AnalysisRequest | null {
  if (!body || typeof body !== "object") return null;
  const req = body as Record<string, unknown>;

  if (typeof req.message !== "string" || req.message.trim().length === 0) {
    return null;
  }

  const language = req.language as string;
  if (!VALID_LANGUAGES.includes(language as Language)) {
    return null;
  }

  return {
    message: req.message.trim(),
    language: language as Language,
  };
}

export function validateAnalysisResult(
  data: unknown
): AnalysisResult | null {
  if (!data || typeof data !== "object") return null;
  const r = data as Record<string, unknown>;

  if (typeof r.issue !== "string") return null;
  if (typeof r.summary !== "string") return null;
  if (typeof r.plainLanguageExplanation !== "string") return null;
  if (typeof r.consequence !== "string") return null;
  if (!VALID_URGENCY.includes(r.urgency as typeof VALID_URGENCY[number]))
    return null;
  if (r.deadline !== null && typeof r.deadline !== "string") return null;
  if (typeof r.department !== "string") return null;
  if (typeof r.departmentReason !== "string") return null;
  if (
    r.notRecommendedDepartment !== null &&
    typeof r.notRecommendedDepartment !== "string"
  )
    return null;
  if (
    r.notRecommendedReason !== null &&
    typeof r.notRecommendedReason !== "string"
  )
    return null;
  if (!Array.isArray(r.documents)) return null;
  if (!r.documents.every((d: unknown) => typeof d === "string")) return null;
  if (!Array.isArray(r.actions)) return null;
  if (!r.actions.every((a: unknown) => typeof a === "string")) return null;
  if (r.resourceId !== null && typeof r.resourceId !== "string") return null;
  if (!VALID_CONFIDENCE.includes(r.confidence as typeof VALID_CONFIDENCE[number]))
    return null;
  if (typeof r.needsHumanConfirmation !== "boolean") return null;
  if (typeof r.emailSubject !== "string") return null;
  if (typeof r.emailBody !== "string") return null;

  return data as AnalysisResult;
}

export function isValidDeadline(deadline: string | null): boolean {
  if (!deadline) return false;
  const d = new Date(deadline);
  return !isNaN(d.getTime());
}

export function getDeadlineCountdown(deadline: string | null): string {
  if (!deadline) return "No confirmed deadline detected";
  const now = new Date();
  const due = new Date(deadline);
  if (isNaN(due.getTime())) return "No confirmed deadline detected";

  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Deadline may have passed";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}

export function formatDeadlineDate(deadline: string | null): string {
  if (!deadline) return "";
  const d = new Date(deadline);
  if (isNaN(d.getTime())) return deadline;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
