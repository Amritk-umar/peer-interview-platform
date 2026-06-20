import { NextResponse } from "next/server";
import { executeCode } from "@/lib/judge0-service";
import logger from "@/lib/logger";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 },
      );
    }

    const result = await executeCode(code, language);

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    // 1. Safely narrow 'e' into a guaranteed Error object
    const error = e instanceof Error ? e : new Error(String(e));

    // 2. Now pass the guaranteed Error object to your logger
    logger.error("Code Execution Error: " + error.message);

    // 3. Return the clean message to the client
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
