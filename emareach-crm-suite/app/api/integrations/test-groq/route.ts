import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json(
        { success: false, message: 'Groq API Key is required.' },
        { status: 400 }
      );
    }

    // Call Groq API models list
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        {
          success: false,
          status: response.status,
          message: `Groq API rejected the key (${response.status}): ${errText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: 'Groq API Key verified! Llama 3.3 70B extraction engine is ready.',
      modelsCount: data.data?.length || 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: `Connection error: ${err.message}` },
      { status: 500 }
    );
  }
}
