import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not defined in environment variables");
}

interface ChatRequest {
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an AI assistant for SoftSell, a company that helps businesses sell unused software licenses.

About SoftSell:
- We help businesses recover value from unused software licenses
- We typically help sellers recover 40-70% of the original purchase price
- Process: Submit license details -> Get valuation within 24 hours -> Accept offer -> Get paid once a buyer is found
- Average selling time: 2-4 weeks (faster for premium licenses)
- We handle all legal aspects
- Vendors: Microsoft, Adobe, Oracle, SAP, etc.

Be concise, helpful, and professional. Encourage users to submit their license details for valuation.

User message: "${message}"`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.json();
      console.error("Gemini API Error:", err);
      return NextResponse.json(
        { error: "Failed to fetch from Gemini" },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();

    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json(
        { error: "No response text received from Gemini" },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: responseText });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
