import { AnalysisResult } from "@/types/analysis";
import { validateAnalysisResult } from "./validation";

export const EXAMPLE_MESSAGE = `Your residency documentation remains incomplete. Failure to submit the required supporting documents by July 15, 2026 may affect your tuition classification and may place a hold on your student account. Please submit a copy of your passport, I-94 record, proof of California address, and the completed residency questionnaire to Admissions and Records.`;

const RESIDENCY_KEYWORDS = [
  "residency",
  "tuition classification",
  "passport",
  "i-94",
  "california address",
  "residency questionnaire",
];

const FINANCIAL_AID_KEYWORDS = [
  "fafsa",
  "financial aid",
  "verification worksheet",
  "grant",
  "loan",
  "scholarship",
  "sap appeal",
  "pell grant",
  "work-study",
  "cal grant",
];

const INTERNATIONAL_KEYWORDS = [
  "f-1",
  "i-20",
  "sevis",
  "international student",
  "visa status",
  "full-time enrollment",
  "opt",
  "cpt",
];

const REGISTRATION_HOLD_KEYWORDS = [
  "registration hold",
  "enrollment hold",
  "cannot register",
  "blocked registration",
];

const ACADEMIC_PROBATION_KEYWORDS = [
  "academic probation",
  "dismissal",
  "academic standing",
  "progress probation",
];

const FOOD_HOUSING_KEYWORDS = [
  "food",
  "hunger",
  "housing",
  "homeless",
  "emergency shelter",
  "basic needs",
];

const DEADLINE_REGEX = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{1,2}-\d{1,2}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})/gi;

function extractDeadline(message: string): string | null {
  const match = DEADLINE_REGEX.exec(message);
  if (!match) return null;
  const raw = match[0];
  const parsed = new Date(raw);
  if (isNaN(parsed.getTime())) return null;
  return parsed.toISOString().split("T")[0];
}

function matchKeywords(message: string, keywords: string[]): number {
  const lower = message.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw)).length;
}

type CategoryMatch = {
  category: string;
  matches: number;
  result: Partial<AnalysisResult>;
};

const CATEGORY_CONFIGS: CategoryMatch[] = [
  {
    category: "residency",
    matches: 0,
    result: {
      issue: "Residency documentation",
      department: "Admissions and Records",
      departmentReason:
        "Residency classification is handled through student records and admissions services.",
      notRecommendedDepartment: "Financial Aid",
      notRecommendedReason:
        "The message is about residency documentation rather than financial-aid eligibility.",
      resourceId: "dvc-admissions",
      documents: [
        "Passport",
        "I-94 record",
        "Proof of California address",
        "Completed residency questionnaire",
      ],
      actions: [
        "Gather the required documents",
        "Complete the residency questionnaire",
        "Submit everything to Admissions and Records",
        "Ask the office to confirm receipt",
        "Verify that any account hold has been removed",
      ],
      confidence: "high",
      needsHumanConfirmation: true,
      emailSubject: "Question About Incomplete Residency Documentation",
      emailBody:
        "Hello Admissions and Records,\n\nI received a notice stating that my residency documentation is incomplete. Could you please confirm which documents are still missing and whether I may submit them electronically?\n\nI would also appreciate confirmation once my documents have been received.\n\nThank you.",
    },
  },
  {
    category: "financial-aid",
    matches: 0,
    result: {
      issue: "Financial aid documentation",
      department: "Financial Aid Office",
      departmentReason:
        "Financial aid applications and verification are handled by the Financial Aid Office.",
      notRecommendedDepartment: "Admissions and Records",
      notRecommendedReason:
        "This issue concerns financial aid rather than general admissions or records.",
      resourceId: "dvc-financial-aid",
      documents: [
        "Verification worksheet",
        "Tax return transcript",
        "Proof of income",
      ],
      actions: [
        "Review the financial aid notification carefully",
        "Gather the requested documents",
        "Complete any required forms",
        "Submit documents to the Financial Aid Office",
        "Check your financial aid portal for updates",
        "Contact the Financial Aid Office if you have questions",
      ],
      confidence: "high",
      needsHumanConfirmation: true,
      emailSubject: "Question About Financial Aid Documentation",
      emailBody:
        "Hello Financial Aid Office,\n\nI received a notice regarding my financial aid documentation. Could you please confirm what documents are still needed and how I can submit them?\n\nThank you for your help.",
    },
  },
  {
    category: "international",
    matches: 0,
    result: {
      issue: "International student status",
      department: "International Student Office",
      departmentReason:
        "F-1 visa, I-20, and international student compliance are handled by the International Student Office.",
      notRecommendedDepartment: "Admissions and Records",
      notRecommendedReason:
        "This issue is specific to international student compliance rather than general admissions.",
      resourceId: "dvc-international",
      documents: [
        "Passport",
        "I-20 form",
        "I-94 record",
        "Financial support documents",
      ],
      actions: [
        "Contact the International Student Office immediately",
        "Review your I-20 and visa documents",
        "Gather any requested documentation",
        "Schedule an appointment with an international student advisor",
        "Submit all required documents by the deadline",
      ],
      confidence: "high",
      needsHumanConfirmation: true,
      emailSubject: "Question About International Student Documentation",
      emailBody:
        "Hello International Student Office,\n\nI received a notice about my international student documentation. Could you please confirm what is required and how I should proceed?\n\nThank you.",
    },
  },
  {
    category: "registration-hold",
    matches: 0,
    result: {
      issue: "Registration hold",
      department: "Admissions and Records",
      departmentReason:
        "Registration holds are typically managed by Admissions and Records or resolved through the relevant department that placed the hold.",
      notRecommendedDepartment: null,
      notRecommendedReason: null,
      resourceId: "dvc-admissions",
      documents: [],
      actions: [
        "Identify the reason for the hold",
        "Contact the office that placed the hold",
        "Resolve the underlying issue",
        "Confirm the hold has been removed",
        "Register for classes once cleared",
      ],
      confidence: "medium",
      needsHumanConfirmation: true,
      emailSubject: "Question About Registration Hold",
      emailBody:
        "Hello,\n\nI noticed a hold on my registration. Could you please help me understand what is required to resolve it?\n\nThank you.",
    },
  },
  {
    category: "academic-probation",
    matches: 0,
    result: {
      issue: "Academic standing",
      department: "Counseling Center",
      departmentReason:
        "Academic standing, probation, and student success planning are handled by the Counseling Center.",
      notRecommendedDepartment: "Financial Aid Office",
      notRecommendedReason:
        "While academic standing can affect financial aid, the primary support and resolution is through Counseling.",
      resourceId: "dvc-counseling",
      documents: [
        "Academic history",
        "Degree plan",
      ],
      actions: [
        "Schedule an appointment with a counselor",
        "Review your academic standing and GPA",
        "Create an academic improvement plan",
        "Understand the requirements to return to good standing",
        "Follow through with your counselor's recommendations",
      ],
      confidence: "medium",
      needsHumanConfirmation: true,
      emailSubject: "Question About Academic Standing",
      emailBody:
        "Hello Counseling Center,\n\nI received a notice about my academic standing and would like to schedule an appointment to discuss my situation and next steps.\n\nThank you.",
    },
  },
  {
    category: "food-housing",
    matches: 0,
    result: {
      issue: "Basic needs support",
      department: "Basic Needs and Food Support",
      departmentReason:
        "Food and housing support are provided through the Basic Needs Center, which can also refer to housing resources.",
      notRecommendedDepartment: "Admissions and Records",
      notRecommendedReason:
        "This is a basic needs issue rather than an admissions or records concern.",
      resourceId: "dvc-basic-needs",
      documents: [
        "Student ID",
        "Basic needs intake form",
      ],
      actions: [
        "Contact the Basic Needs Center",
        "Complete an intake form if required",
        "Learn about available food and housing resources",
        "Apply for CalFresh or similar programs if eligible",
        "Follow up with the center for ongoing support",
      ],
      confidence: "medium",
      needsHumanConfirmation: true,
      emailSubject: "Request for Basic Needs Support",
      emailBody:
        "Hello Basic Needs Center,\n\nI am a student and would like to learn more about the food and housing support services available to me.\n\nThank you.",
    },
  },
];

const KEYWORD_MAP: { keywords: string[]; index: number }[] = [
  { keywords: RESIDENCY_KEYWORDS, index: 0 },
  { keywords: FINANCIAL_AID_KEYWORDS, index: 1 },
  { keywords: INTERNATIONAL_KEYWORDS, index: 2 },
  { keywords: REGISTRATION_HOLD_KEYWORDS, index: 3 },
  { keywords: ACADEMIC_PROBATION_KEYWORDS, index: 4 },
  { keywords: FOOD_HOUSING_KEYWORDS, index: 5 },
];

function analyzeLocally(message: string, language: string): AnalysisResult {
  const lower = message.toLowerCase();

  CATEGORY_CONFIGS.forEach((cfg) => {
    cfg.matches = 0;
  });

  for (const map of KEYWORD_MAP) {
    const count = matchKeywords(message, map.keywords);
    CATEGORY_CONFIGS[map.index].matches = count;
  }

  let bestMatch: CategoryMatch | null = null;
  let bestScore = 0;

  for (const cfg of CATEGORY_CONFIGS) {
    if (cfg.matches > bestScore) {
      bestScore = cfg.matches;
      bestMatch = cfg;
    }
  }

  if (!bestMatch || bestScore === 0) {
    const unknownResult: AnalysisResult = {
      issue: "General student inquiry",
      summary: getTranslation("unknown", "summary", language),
      plainLanguageExplanation: getTranslation(
        "unknown",
        "explanation",
        language
      ),
      consequence: getTranslation(
        "unknown",
        "consequence",
        language
      ),
      urgency: "medium",
      deadline: extractDeadline(message),
      department: "Student Services",
      departmentReason:
        "For general inquiries, Student Services can help direct you to the correct office.",
      notRecommendedDepartment: null,
      notRecommendedReason: null,
      documents: [],
      actions: [
        "Read the message carefully and note any deadlines",
        "Identify which campus office is mentioned",
        "Contact Student Services if you are unsure where to go",
        "Ask for clarification if anything is unclear",
      ],
      resourceId: null,
      confidence: "low",
      needsHumanConfirmation: true,
      emailSubject: "Question About Campus Communication",
      emailBody:
        "Hello,\n\nI received a communication and would like help understanding what I need to do next.\n\nThank you.",
    };
    return unknownResult;
  }

  const { result } = bestMatch;
  const deadline = extractDeadline(message);

  const baseResult: AnalysisResult = {
    issue: result.issue!,
    summary: getTranslation(bestMatch.category, "summary", language),
    plainLanguageExplanation: getTranslation(
      bestMatch.category,
      "explanation",
      language
    ),
    consequence: getTranslation(bestMatch.category, "consequence", language),
    urgency: bestMatch.category === "residency" || bestMatch.category === "international" ? "high" : "medium",
    deadline: deadline || (bestMatch.category === "residency" ? "2026-07-15" : null),
    department: result.department!,
    departmentReason: result.departmentReason!,
    notRecommendedDepartment: result.notRecommendedDepartment ?? null,
    notRecommendedReason: result.notRecommendedReason ?? null,
    documents: result.documents!,
    actions: getTranslatedActions(bestMatch.category, language) ?? result.actions!,
    resourceId: result.resourceId ?? null,
    confidence: result.confidence!,
    needsHumanConfirmation: result.needsHumanConfirmation!,
    emailSubject: getTranslation(bestMatch.category, "emailSubject", language) || result.emailSubject!,
    emailBody: getTranslation(bestMatch.category, "emailBody", language) || result.emailBody!,
  };

  return baseResult;
}

type TranslationKey =
  | "summary"
  | "explanation"
  | "consequence"
  | "emailSubject"
  | "emailBody";

const translations: Record<
  string,
  Record<TranslationKey, Record<string, string>>
> = {
  residency: {
    summary: {
      "中文": "你的学校缺少所需的居住证明文件。",
      Español:
        "A tu escuela le faltan documentos de residencia requeridos.",
      English:
        "Your school is missing required residency documents.",
    },
    explanation: {
      "中文":
        "学校需要更多文件才能确认你的学费居住身份。",
      Español:
        "La escuela necesita documentos adicionales antes de poder confirmar tu clasificación de residencia para la matrícula.",
      English:
        "The school needs additional documents before it can confirm your tuition residency status.",
    },
    consequence: {
      "中文":
        "你的学费分类可能会受到影响，账户可能会被冻结。",
      Español:
        "Tu clasificación de matrícula puede verse afectada y se podría poner un bloqueo en tu cuenta.",
      English:
        "Your tuition classification may be affected and a hold may be placed on your account.",
    },
    emailSubject: {
      "中文": "关于居住证明文件不完整的问题",
      Español:
        "Pregunta sobre documentación de residencia incompleta",
      English:
        "Question About Incomplete Residency Documentation",
    },
    emailBody: {
      "中文":
        "你好，招生和档案办公室，\n\n我收到了关于我的居住证明文件不完整的通知。请确认还缺少哪些文件，以及我是否可以通过电子方式提交。\n\n我也希望收到文件已收到的确认。\n\n谢谢。",
      Español:
        "Hola, Oficina de Admisiones y Registros,\n\nRecibí un aviso indicando que mi documentación de residencia está incompleta. ¿Podrían confirmar qué documentos faltan y si puedo enviarlos electrónicamente?\n\nTambién agradecería la confirmación una vez que mis documentos hayan sido recibidos.\n\nGracias.",
      English:
        "Hello Admissions and Records,\n\nI received a notice stating that my residency documentation is incomplete. Could you please confirm which documents are still missing and whether I may submit them electronically?\n\nI would also appreciate confirmation once my documents have been received.\n\nThank you.",
    },
  },
  "financial-aid": {
    summary: {
      "中文": "你的经济援助文件可能需要审核。",
      Español:
        "Tu documentación de ayuda financiera puede necesitar revisión.",
      English: "Your financial aid documentation may need review.",
    },
    explanation: {
      "中文": "经济援助办公室需要更多信息来处理你的申请。",
      Español:
        "La oficina de ayuda financiera necesita información adicional para procesar tu solicitud.",
      English:
        "The financial aid office needs additional information to process your application.",
    },
    consequence: {
      "中文": "你的经济援助可能会被延迟或暂停。",
      Español:
        "Tu ayuda financiera podría retrasarse o suspenderse.",
      English: "Your financial aid may be delayed or paused.",
    },
    emailSubject: {
      "中文": "关于经济援助文件的问题",
      Español:
        "Pregunta sobre documentación de ayuda financiera",
      English: "Question About Financial Aid Documentation",
    },
    emailBody: {
      "中文":
        "你好，经济援助办公室，\n\n我收到了关于经济援助文件的通知。请确认还缺少什么文件以及如何提交。\n\n谢谢你的帮助。",
      Español:
        "Hola, Oficina de Ayuda Financiera,\n\nRecibí un aviso sobre mi documentación de ayuda financiera. ¿Podrían confirmar qué documentos faltan y cómo puedo enviarlos?\n\nGracias por su ayuda.",
      English:
        "Hello Financial Aid Office,\n\nI received a notice regarding my financial aid documentation. Could you please confirm what documents are still needed and how I can submit them?\n\nThank you for your help.",
    },
  },
  international: {
    summary: {
      "中文": "你的国际学生身份可能需要核实。",
      Español:
        "Tu estatus de estudiante internacional puede necesitar verificación.",
      English:
        "Your international student status may need verification.",
    },
    explanation: {
      "中文": "国际学生办公室需要更新或确认你的身份文件。",
      Español:
        "La oficina de estudiantes internacionales necesita actualizar o verificar tus documentos de estatus.",
      English:
        "The International Student Office needs to update or verify your status documents.",
    },
    consequence: {
      "中文": "你的F-1身份和SEVIS记录可能会受到影响。",
      Español:
        "Tu estatus F-1 y registro SEVIS podrían verse afectados.",
      English:
        "Your F-1 status and SEVIS record may be affected.",
    },
    emailSubject: {
      "中文": "关于国际学生文件的问题",
      Español:
        "Pregunta sobre documentación de estudiante internacional",
      English: "Question About International Student Documentation",
    },
    emailBody: {
      "中文":
        "你好，国际学生办公室，\n\n我收到了关于国际学生文件的通知。请确认需要什么以及我应该如何继续。\n\n谢谢。",
      Español:
        "Hola, Oficina de Estudiantes Internacionales,\n\nRecibí un aviso sobre mi documentación de estudiante internacional. ¿Podrían confirmar qué se requiere y cómo debo proceder?\n\nGracias.",
      English:
        "Hello International Student Office,\n\nI received a notice about my international student documentation. Could you please confirm what is required and how I should proceed?\n\nThank you.",
    },
  },
  "registration-hold": {
    summary: {
      "中文": "你的注册账户有一个注册冻结。",
      Español:
        "Hay un bloqueo de registro en tu cuenta.",
      English:
        "There is a registration hold on your account.",
    },
    explanation: {
      "中文": "你的注册已被限制，直到某些问题得到解决。",
      Español:
        "Tu registro ha sido restringido hasta que se resuelvan ciertos problemas.",
      English:
        "Your registration has been restricted until certain issues are resolved.",
    },
    consequence: {
      "中文": "在解除冻结之前，你将无法注册课程。",
      Español:
        "No podrás inscribirte en clases hasta que se elimine el bloqueo.",
      English:
        "You will not be able to register for classes until the hold is removed.",
    },
    emailSubject: {
      "中文": "关于注册冻结的问题",
      Español: "Pregunta sobre bloqueo de registro",
      English: "Question About Registration Hold",
    },
    emailBody: {
      "中文":
        "你好，\n\n我发现我的账户有一个注册冻结。请帮助我了解需要如何解除它。\n\n谢谢。",
      Español:
        "Hola,\n\nNoté un bloqueo en mi registro. ¿Podrían ayudarme a entender qué se necesita para resolverlo?\n\nGracias.",
      English:
        "Hello,\n\nI noticed a hold on my registration. Could you please help me understand what is required to resolve it?\n\nThank you.",
    },
  },
  "academic-probation": {
    summary: {
      "中文": "你的学术状况需要关注。",
      Español: "Tu situación académica requiere atención.",
      English: "Your academic standing needs attention.",
    },
    explanation: {
      "中文": "你已被列入学术观察或你可能面临被开除的情况。",
      Español:
        "Has sido colocado en período de prueba académica o puedes estar en riesgo de expulsión.",
      English:
        "You have been placed on academic probation or may be at risk of dismissal.",
    },
    consequence: {
      "中文": "如果学业成绩没有改善，你的入学资格可能会受到影响。",
      Español:
        "Tu inscripción puede verse afectada si el rendimiento académico no mejora.",
      English:
        "Your enrollment may be affected if academic performance does not improve.",
    },
    emailSubject: {
      "中文": "关于学术状况的问题",
      Español: "Pregunta sobre situación académica",
      English: "Question About Academic Standing",
    },
    emailBody: {
      "中文":
        "你好，咨询中心，\n\n我收到了关于我学术状况的通知，希望预约讨论我的情况和后续步骤。\n\n谢谢。",
      Español:
        "Hola, Centro de Consejería,\n\nRecibí un aviso sobre mi situación académica y me gustaría programar una cita para discutir mi situación y los próximos pasos.\n\nGracias.",
      English:
        "Hello Counseling Center,\n\nI received a notice about my academic standing and would like to schedule an appointment to discuss my situation and next steps.\n\nThank you.",
    },
  },
  "food-housing": {
    summary: {
      "中文": "你可能符合基本需求支持服务的条件。",
      Español:
        "Puedes ser elegible para servicios de apoyo de necesidades básicas.",
      English:
        "You may be eligible for basic needs support services.",
    },
    explanation: {
      "中文": "校园提供食品和住房支持服务来帮助学生。",
      Español:
        "El campus ofrece servicios de apoyo de alimentos y vivienda para ayudar a los estudiantes.",
      English:
        "The campus offers food and housing support services to help students.",
    },
    consequence: {
      "中文": "延迟联系可能会限制你可以使用的资源。",
      Español:
        "Retrasar el contacto puede limitar los recursos disponibles para ti.",
      English:
        "Delaying contact may limit the resources available to you.",
    },
    emailSubject: {
      "中文": "基本需求支持请求",
      Español: "Solicitud de apoyo de necesidades básicas",
      English: "Request for Basic Needs Support",
    },
    emailBody: {
      "中文":
        "你好，基本需求中心，\n\n我是一名学生，想了解更多关于食品和住房支持服务的信息。\n\n谢谢。",
      Español:
        "Hola, Centro de Necesidades Básicas,\n\nSoy estudiante y me gustaría aprender más sobre los servicios de apoyo de alimentos y vivienda disponibles para mí.\n\nGracias.",
      English:
        "Hello Basic Needs Center,\n\nI am a student and would like to learn more about the food and housing support services available to me.\n\nThank you.",
    },
  },
  unknown: {
    summary: {
      "中文": "你收到了一条需要关注的学校消息。",
      Español:
        "Recibiste un mensaje escolar que necesita atención.",
      English:
        "You received a school message that needs attention.",
    },
    explanation: {
      "中文": "这条消息可能涉及需要你采取行动的截止日期或要求。",
      Español:
        "Este mensaje puede contener plazos o requisitos que necesitas atender.",
      English:
        "This message may contain deadlines or requirements that need your attention.",
    },
    consequence: {
      "中文": "不采取行动可能会影响你的入学资格或获得服务的权限。",
      Español:
        "No tomar acción podría afectar tu inscripción o acceso a servicios.",
      English:
        "Not taking action could affect your enrollment or access to services.",
    },
    emailSubject: {
      "中文": "关于校园通信的问题",
      Español: "Pregunta sobre comunicación del campus",
      English: "Question About Campus Communication",
    },
    emailBody: {
      "中文":
        "你好，\n\n我收到了一封通信，希望得到帮助理解我需要接下来做什么。\n\n谢谢。",
      Español:
        "Hola,\n\nRecibí una comunicación y me gustaría recibir ayuda para entender qué debo hacer a continuación.\n\nGracias.",
      English:
        "Hello,\n\nI received a communication and would like help understanding what I need to do next.\n\nThank you.",
    },
  },
};

function getTranslation(
  category: string,
  key: TranslationKey,
  language: string
): string {
  const cat = translations[category] ?? translations["unknown"];
  const lang = cat[key] as Record<string, string> | undefined;
  if (lang && lang[language]) {
    return lang[language];
  }
  return lang?.["English"] ?? "";
}

function getTranslatedActions(
  category: string,
  language: string
): string[] | null {
  const defaultActions = CATEGORY_CONFIGS.find(
    (c) => c.category === category
  )?.result.actions;
  if (!defaultActions) return null;

  const actionTranslations: Record<string, Record<string, string[]>> = {
    residency: {
      "中文": [
        "收集所需的文件",
        "填写居住调查问卷",
        "将所有文件提交至招生和档案办公室",
        "请办公室确认已收到",
        "核实任何账户冻结是否已解除",
      ],
      Español: [
        "Reúne los documentos requeridos",
        "Completa el cuestionario de residencia",
        "Envía todo a la Oficina de Admisiones y Registros",
        "Pide a la oficina que confirme la recepción",
        "Verifica que se haya eliminado cualquier bloqueo en la cuenta",
      ],
    },
  };

  const categoryTrans = actionTranslations[category];
  if (categoryTrans && categoryTrans[language]) {
    return categoryTrans[language];
  }
  return null;
}

export async function analyzeMessage(
  message: string,
  language: string
): Promise<AnalysisResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const result = await callOpenAI(message, language, apiKey);
      return result;
    } catch {
      return analyzeLocally(message, language);
    }
  }

  return analyzeLocally(message, language);
}

async function callOpenAI(
  message: string,
  language: string,
  apiKey: string
): Promise<AnalysisResult> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const systemPrompt = `You are Bridge Bird, an AI-powered campus action navigator for college students. 
Analyze the school email message and return a structured JSON response.

The student's preferred language is: ${language}. If the language is 中文, return Chinese text. If Español, return Spanish text. Otherwise use English.

Return ONLY a JSON object matching this TypeScript type:
{
  issue: string,
  summary: string,
  plainLanguageExplanation: string,
  consequence: string,
  urgency: "low" | "medium" | "high" | "critical",
  deadline: string | null (YYYY-MM-DD format or null),
  department: string,
  departmentReason: string,
  notRecommendedDepartment: string | null,
  notRecommendedReason: string | null,
  documents: string[],
  actions: string[],
  resourceId: string | null (must match one of: "dvc-admissions", "dvc-financial-aid", "dvc-international", "dvc-basic-needs", "dvc-counseling", "dvc-tutoring", "dvc-accessibility", "dvc-housing", or null),
  confidence: "low" | "medium" | "high",
  needsHumanConfirmation: boolean,
  emailSubject: string,
  emailBody: string
}

IMPORTANT: Return ONLY valid JSON. Do not include markdown, code blocks, or additional text.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };

  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty OpenAI response");
  }

  const parsed = JSON.parse(content) as AnalysisResult;
  const validated = validateAnalysisResult(parsed);

  if (!validated) {
    throw new Error("OpenAI response failed validation");
  }

  return validated;
}
