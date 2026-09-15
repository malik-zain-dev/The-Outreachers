import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json(
        { success: false, message: 'Serper API Key is required.' },
        { status: 400 }
      );
    }

    // Call Serper.dev directly from server-side (no CORS restrictions)
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey.trim(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: 'site:linkedin.com/in/ "VP of Sales" "B2B SaaS"',
        num: 3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        {
          success: false,
          status: response.status,
          message: `Serper API rejected the key (${response.status}): ${errText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const resultCount = data.organic?.length || 0;

    return NextResponse.json({
      success: true,
      message: `Serper API key verified successfully! Discovered ${resultCount} real Google results.`,
      sampleResult: data.organic?.[0] || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: `Connection error: ${err.message}` },
      { status: 500 }
    );
  }
}
