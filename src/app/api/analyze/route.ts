import { NextRequest, NextResponse } from "next/server";
import { analyzeMessage } from "@/lib/analyzer";
import { validateAnalysisRequest } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const validated = validateAnalysisRequest(body);

    if (!validated) {
      return NextResponse.json(
        { error: "Invalid request. Message (non-empty) and language (English, 中文, or Español) are required." },
        { status: 400 }
      );
    }

    if (validated.message.length < 10) {
      return NextResponse.json(
        { error: "Message is too short. Please paste a complete school message." },
        { status: 400 }
      );
    }

    const result = await analyzeMessage(validated.message, validated.language);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Something went wrong during analysis. Please try again." },
      { status: 500 }
    );
  }
}
