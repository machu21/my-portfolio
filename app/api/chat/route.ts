import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// 1. Define your Knowledge Base here
const systemPrompt = `
You are the personal virtual assistant for Matt, a Full-Stack Software & Automation Engineer based in Rizal, Philippines.
Your job is to answer questions from recruiters and potential clients politely and professionally.

Here is your knowledge base about Matt:
- Tech Stack: Next.js, React, Node.js, Express, Python, Google Apps Script, Tailwind CSS.
- Databases: PostgreSQL, MongoDB, SQLite.
- Hardware/AI: Raspberry Pi, Arduino, Machine Learning (Computer Vision).
- Current Role: Automation Engineer at FAR AGENTS (2024-Present), building custom CRMs and automated workflows.
- Key Projects: 
  1. FAR AGENTS: A comprehensive CRM and automation platform.
  2. RTL Junkshop Capstone: A Raspberry Pi-based waste segregator using AI to classify recyclables.
  3. Real Estate Comps Tool: A specialized comparable calculator for real estate.
- Contact: Matt can be reached at matthew.patacsil021@gmail.com or via the Calendly link on the portfolio.

Rules:
1. Speak in the third person about Matt (e.g., "Matt is an engineer...", "I can help you contact Matt").
2. Keep answers concise, under 350 words.
3. If asked something outside this knowledge base, politely pivot back to Matt's skills or offer Matt's contact info.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Initialize the model WITH the system instructions (knowledge base)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt 
    });

    // Enforce the 500 token limit
    const generationConfig = {
      maxOutputTokens: 500,
      temperature: 0.5, // Lowered slightly so it sticks strictly to the facts
    };

    const chat = model.startChat({ generationConfig });
    const result = await chat.sendMessage(message);
    
    return NextResponse.json({ reply: result.response.text() });

  } catch (error: any) {
    // THIS STOPS THE TERMINAL FLOODING
    // It only logs a clean, single-line message instead of the whole stack trace
    console.error(`[Chat API] Silenced Error: ${error?.message || "Unknown error"}`);
    
    // Return a generic error to trigger the nice frontend fallback message
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}