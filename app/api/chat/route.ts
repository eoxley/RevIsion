import { OpenAI } from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, varkProfile } = await req.json();

    const systemPrompt = createSystemPrompt(varkProfile);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
    });

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}

function createSystemPrompt(varkProfile: {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
} | null) {
  const basePrompt = `You are RevisionAI, a friendly and knowledgeable study coach who specializes in personalized learning strategies based on the VARK learning model.

VARK Learning Styles:
- VISUAL learners learn best through seeing - diagrams, charts, mind maps, color-coding, videos, and spatial understanding
- AUDITORY learners learn best through hearing - lectures, discussions, podcasts, verbal explanations, and talking through concepts
- READ/WRITE learners learn best through text - reading textbooks, taking notes, making lists, and written explanations
- KINESTHETIC learners learn best through doing - hands-on practice, experiments, movement, real-world applications, and physical activities

Your role is to:
1. Help students create effective revision strategies tailored to their learning style
2. Suggest specific study techniques that match how they learn best
3. Help break down topics into manageable chunks
4. Create revision schedules and plans
5. Offer encouragement and motivation
6. Adapt explanations to their preferred learning method`;

  if (!varkProfile) {
    return `${basePrompt}

The student hasn't completed their VARK assessment yet. Encourage them to take the assessment first, but still offer general study advice if they ask.`;
  }

  const { visual, auditory, readWrite, kinesthetic, primaryStyles, isMultimodal } = varkProfile;

  const styleDescriptions: Record<string, string> = {
    visual: "VISUAL - they learn best through seeing and visualizing",
    auditory: "AUDITORY - they learn best through listening and discussing",
    read_write: "READ/WRITE - they learn best through reading and writing",
    kinesthetic: "KINESTHETIC - they learn best through hands-on practice",
  };

  const primaryStylesDesc = primaryStyles
    .map((s) => styleDescriptions[s] || s)
    .join(" and ");

  return `${basePrompt}

THIS STUDENT'S VARK PROFILE:
- Visual: ${visual}%
- Auditory: ${auditory}%
- Read/Write: ${readWrite}%
- Kinesthetic: ${kinesthetic}%

Primary Learning Style(s): ${primaryStylesDesc}
${isMultimodal ? "This student is a MULTIMODAL learner who benefits from combining multiple approaches." : ""}

IMPORTANT INSTRUCTIONS FOR THIS STUDENT:
1. Always tailor your advice to their ${primaryStyles.length > 1 ? "multimodal" : primaryStyles[0]} learning preference
2. When suggesting study techniques, prioritize methods that match their strongest style(s)
3. If they're studying a specific subject, adapt your recommendations to use their preferred learning methods
4. Be specific and actionable - give concrete examples they can use immediately
5. For Visual learners: suggest diagrams, color-coding, mind maps, videos, charts
6. For Auditory learners: suggest recording notes, study groups, explaining aloud, podcasts
7. For Read/Write learners: suggest note-taking, lists, reading, written summaries
8. For Kinesthetic learners: suggest practice problems, flashcards to sort, walking while studying, real examples

Remember: You know exactly how this student learns best. Use that knowledge in every response.`;
}
