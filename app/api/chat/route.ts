import OpenAI from "openai";
import { NextResponse } from "next/server";

const SHIVLAM_SYSTEM = `You are a helpful assistant for Shivlam, a technology services company.
You represent Shivlam professionally. Services include: web development, mobile apps (iPhone, Android, Flutter), game development (Unity, Vision Pro), digital marketing, and SEO.
Be concise and friendly. If someone needs pricing, contracts, or detailed project scoping, invite them to use the contact form on the site or email hi@shivlam.com.
Do not invent specific prices, delivery dates, or client names. If unsure, suggest contacting the team.`;

type ClientMessage = { role: "user" | "assistant"; content: string };

function sanitizeMessages(raw: unknown): ClientMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: ClientMessage[] = [];
  for (const item of raw) {
    if (out.length >= 24) break;
    if (!item || typeof item !== "object") continue;
    const role = (item as ClientMessage).role;
    const content = (item as ClientMessage).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.slice(0, 8000).trim();
    if (!trimmed) continue;
    out.push({ role, content: trimmed });
  }
  return out.length ? out : null;
}

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "OpenAI is not configured. Set OPENAI_API_KEY in your environment." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const clientMessages = sanitizeMessages(
    typeof body === "object" && body !== null && "messages" in body
      ? (body as { messages: unknown }).messages
      : null
  );
  if (!clientMessages) {
    return NextResponse.json(
      { error: "Expected a non-empty messages array with user/assistant roles." },
      { status: 400 }
    );
  }

  const openai = new OpenAI({ apiKey: key });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [{ role: "system", content: SHIVLAM_SYSTEM }, ...clientMessages],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: "Empty model response." }, { status: 502 });
    }

    return NextResponse.json({ message: text });
  } catch (e) {
    const message = e instanceof Error ? e.message : "OpenAI request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
