import { CampusResource } from "@/types/analysis";

export const campusResources: CampusResource[] = [
  {
    id: "dvc-admissions",
    name: "Admissions and Records",
    category: "Admissions and Records",
    description:
      "Handles applications, registration, residency classification, transcript requests, and student records for Diablo Valley College.",
    topics: [
      "Residency classification",
      "Tuition classification",
      "Registration",
      "Transcripts",
      "Enrollment verification",
      "Student records",
    ],
    requiredDocuments: [
      "Passport",
      "I-94 record",
      "Proof of California address",
      "Residency questionnaire",
      "Transcripts from previous schools",
    ],
    officialUrl: "https://www.dvc.edu/admissions/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-financial-aid",
    name: "Financial Aid Office",
    category: "Financial Aid",
    description:
      "Provides financial aid counseling, FAFSA assistance, scholarship information, and grant and loan processing.",
    topics: [
      "FAFSA",
      "California Dream Act",
      "Scholarships",
      "Grants",
      "Work-study",
      "SAP appeals",
      "Fee waivers",
    ],
    requiredDocuments: [
      "FAFSA or CADAA application",
      "Tax returns",
      "Verification worksheet",
      "Proof of income",
    ],
    officialUrl: "https://www.dvc.edu/financialaid/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-international",
    name: "International Student Office",
    category: "International Student Office",
    description:
      "Supports international students with F-1 visa requirements, I-20 forms, SEVIS registration, and cultural adjustment.",
    topics: [
      "F-1 visa",
      "I-20 form",
      "SEVIS",
      "Full-time enrollment",
      "OPT and CPT",
      "Travel authorization",
      "Health insurance",
    ],
    requiredDocuments: [
      "Passport",
      "I-20 form",
      "I-94 record",
      "Financial support documents",
      "Health insurance proof",
    ],
    officialUrl: "https://www.dvc.edu/international/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-basic-needs",
    name: "Basic Needs and Food Support",
    category: "Basic Needs and Food Support",
    description:
      "Connects students with food assistance, emergency housing referrals, and other essential support services.",
    topics: [
      "Food pantry",
      "CalFresh enrollment",
      "Emergency meals",
      "Housing referrals",
      "Transportation assistance",
      "Hygiene products",
    ],
    requiredDocuments: [
      "Student ID",
      "Basic needs intake form",
    ],
    officialUrl: "https://www.dvc.edu/basicneeds/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-counseling",
    name: "Counseling Center",
    category: "Counseling",
    description:
      "Provides academic, career, and personal counseling services to support student success and well-being.",
    topics: [
      "Academic counseling",
      "Career counseling",
      "Personal counseling",
      "Educational planning",
      "Transfer planning",
      "Academic probation",
    ],
    requiredDocuments: [
      "Student ID",
      "Academic history",
    ],
    officialUrl: "https://www.dvc.edu/counseling/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-tutoring",
    name: "Tutoring Center",
    category: "Tutoring",
    description:
      "Offers free tutoring services in writing, math, science, and other subjects to help students succeed academically.",
    topics: [
      "Writing tutoring",
      "Math tutoring",
      "Science tutoring",
      "ESL support",
      "Study skills",
      "Online tutoring",
    ],
    requiredDocuments: [
      "Student ID",
      "Class syllabus or assignment",
    ],
    officialUrl: "https://www.dvc.edu/tutoring/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-accessibility",
    name: "Accessibility Services (DSS)",
    category: "Accessibility Services",
    description:
      "Provides accommodations and support services for students with disabilities to ensure equal access to education.",
    topics: [
      "Academic accommodations",
      "Testing accommodations",
      "Note-taking support",
      "Assistive technology",
      "Accessible materials",
      "Sign language interpreting",
    ],
    requiredDocuments: [
      "Disability documentation",
      "DSS intake form",
      "Medical or diagnostic records",
    ],
    officialUrl: "https://www.dvc.edu/dss/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
  {
    id: "dvc-housing",
    name: "Housing Support Services",
    category: "Housing Support",
    description:
      "Helps students find housing resources and provides referrals for students experiencing housing insecurity.",
    topics: [
      "Housing search",
      "Roommate matching",
      "Emergency housing referrals",
      "Tenant rights",
      "Rental assistance programs",
    ],
    requiredDocuments: [
      "Student ID",
      "Housing intake form",
    ],
    officialUrl: "https://www.dvc.edu/housing/index.html",
    verified: true,
    lastVerified: "2026-07",
  },
];

export function getResourceById(id: string): CampusResource | undefined {
  return campusResources.find((r) => r.id === id);
}

export function getResourcesByCategory(category: string): CampusResource[] {
  if (!category || category === "All") return campusResources;
  return campusResources.filter((r) => r.category === category);
}

export const resourceCategories = [
  "All",
  "Admissions and Records",
  "Financial Aid",
  "International Student Office",
  "Basic Needs and Food Support",
  "Counseling",
  "Tutoring",
  "Accessibility Services",
  "Housing Support",
];
