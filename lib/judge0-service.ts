// lib/judge0-service.ts

const LANGUAGE_MAP: Record<string, number> = {
  javascript: 93, // Node.js
  python: 71, // Python 3
  java: 91, // Java
  cpp: 54, // C++ (GCC)
};

export async function executeCode(code: string, language: string) {
  const judge0LangId = LANGUAGE_MAP[language.toLowerCase()];

  if (!judge0LangId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  // Auto-inject standard boilerplate for C++ execution
  let processedCode = code;
  if (judge0LangId === 54) {
    const cppBoilerplate =
      "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n";
    if (!processedCode.includes("using namespace std;")) {
      processedCode = cppBoilerplate + processedCode;
    }
  }

  // Forward the code to Judge0
  const response = await fetch(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: judge0LangId,
        source_code: processedCode,
      }),
    },
  );

  const data = await response.json();

  if (data.message) {
    throw new Error(data.message);
  }

  return {
    output: data.stdout || "",
    error: data.stderr || data.compile_output || "",
  };
}
