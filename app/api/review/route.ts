import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { prompt, code } = await req.json()

    const systemPrompt = `You are a senior technical interviewer evaluating a candidate.
    The candidate was asked to solve: "${prompt}"
    
    Here is their submitted code:
    ${code}
    
    Analyze the code and respond STRICTLY in this format. Keep it concise:
    
    **Time Complexity:** O(...)
    [1 sentence explanation]
    
    **Space Complexity:** O(...)
    [1 sentence explanation]
    
    **Optimization Suggestion:**
    [1-2 sentences on how to improve the code's efficiency or readability.]`

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      prompt: "Please review my code.",
    })

    return result.toTextStreamResponse()
    
  } catch (error) {
    console.error("AI Review Error:", error)
    return new Response("Failed to generate review", { status: 500 })
  }
}