import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }
  try {
    const raw = await request.text();
    if (raw.length > 5000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const base = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
    const response = await fetch(`${base}/api/contact/consultations/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    if (!response.ok) {
      const message = response.status === 429 ? "Too many requests. Please try again later." : response.status < 500 ? "Please check your details and try again." : "We couldn't save your request. Please try again.";
      return NextResponse.json({ error: message }, { status: response.status < 500 ? response.status : 503 });
    }
    const result = await response.json();
    return NextResponse.json({ reference: result.reference }, { status: response.status });
  } catch {
    return NextResponse.json({ error: "We couldn't reach the booking service. Please try again." }, { status: 503 });
  }
}
