import { NextResponse } from "next/server";

// HubSpot chat logging (no UI changes).
// NOTE: this uses HubSpot Forms API, so the HubSpot form must have Captcha disabled.
const HUBSPOT_PORTAL_ID = "24198079";
const HUBSPOT_REGION = "na1";
// Create a HubSpot form with a multiline field internal name "message".
const HUBSPOT_CHAT_FORM_GUID = "9367aac3-017b-497f-bc6a-6ea02e2a6b9c";

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

async function submitChatToHubSpot(args: {
  portalId: string;
  formGuid: string;
  region?: string;
  referer?: string;
  ipAddress?: string;
  hutk?: string;
  transcript: string;
}) {
  const { portalId, formGuid, region, referer, ipAddress, hutk, transcript } = args;

  const host =
    region && region.trim()
      ? `https://api-${encodeURIComponent(region.trim())}.hsforms.com`
      : "https://api.hsforms.com";

  const body = {
    fields: [{ name: "message", value: transcript }],
    context: {
      ...(hutk ? { hutk } : {}),
      ...(referer ? { pageUri: referer, pageName: "Chat assistant" } : {}),
      ...(ipAddress ? { ipAddress } : {}),
    },
  };

  // Best-effort: don't block chat response if HubSpot is slow/down.
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 1500);
  try {
    await fetch(
      `${host}/submissions/v3/integration/submit/${encodeURIComponent(
        portalId
      )}/${encodeURIComponent(formGuid)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    );
  } finally {
    clearTimeout(t);
  }
}

export async function POST(request: Request) {
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

  try {
    if (!HUBSPOT_CHAT_FORM_GUID) {
      return NextResponse.json(
        {
          error:
            "Chat is not configured. Set HUBSPOT_CHAT_FORM_GUID in app/api/chat/route.ts.",
        },
        { status: 503 }
      );
    }

    const cookieHeader = request.headers.get("cookie") ?? "";
    const hutk = cookieHeader.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
    const referer = request.headers.get("referer") ?? "";
    const xff = request.headers.get("x-forwarded-for") ?? "";
    const ipAddress = xff.split(",")[0]?.trim() || undefined;

    const lastUser = [...clientMessages].reverse().find((m) => m.role === "user")?.content ?? "";

    const transcript = clientMessages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n")
      .slice(0, 12000);

    // Send the message to HubSpot (best-effort, but we await once to confirm receipt).
    await submitChatToHubSpot({
      portalId: HUBSPOT_PORTAL_ID,
      formGuid: HUBSPOT_CHAT_FORM_GUID,
      region: HUBSPOT_REGION,
      referer,
      ipAddress,
      hutk,
      transcript: `${transcript}\n\nLATEST_USER_MESSAGE: ${lastUser}`.slice(0, 12000),
    });

    return NextResponse.json({
      message:
        "Thanks — we’ve received your message. Our team will get back to you shortly. If it’s urgent, email hi@shivlam.com.",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "HubSpot request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
