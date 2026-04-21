import { NextResponse } from "next/server";

type ContactPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  details?: unknown;
  hcaptchaToken?: unknown;
};

function asTrimmedString(value: unknown, maxLen: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function isValidEmail(email: string) {
  if (!email) return false;
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type HubSpotErrorBody = {
  message?: unknown;
  errors?: unknown;
  correlationId?: unknown;
  category?: unknown;
};

function asShortText(value: unknown, maxLen: number) {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLen);
}

function extractHubSpotErrorMessage(body: unknown) {
  if (!body || typeof body !== "object") return "";
  const b = body as HubSpotErrorBody & { [k: string]: unknown };

  const topMessage = asShortText(b.message, 500).trim();
  if (topMessage) return topMessage;

  if (Array.isArray(b.errors) && b.errors.length) {
    const first = b.errors[0];
    if (first && typeof first === "object") {
      const msg = asShortText((first as { message?: unknown }).message, 500).trim();
      if (msg) return msg;
    }
  }

  const category = asShortText(b.category, 120).trim();
  const correlationId = asShortText(b.correlationId, 120).trim();
  const extras = [category ? `category=${category}` : "", correlationId ? `correlationId=${correlationId}` : ""]
    .filter(Boolean)
    .join(" ");
  return extras;
}

async function verifyHCaptcha(token: string, ipAddress?: string) {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, error: "Captcha is not configured. Set HCAPTCHA_SECRET_KEY." };
  }

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ipAddress) form.append("remoteip", ipAddress);

  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    body: form,
  });

  const out = (await res.json().catch(() => null)) as
    | { success?: boolean; "error-codes"?: unknown }
    | null;

  if (!out?.success) {
    const codes = Array.isArray(out?.["error-codes"]) ? out?.["error-codes"].join(", ") : "";
    return { ok: false, error: `Captcha verification failed.${codes ? ` (${codes})` : ""}` };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  const region = process.env.HUBSPOT_REGION;

  if (!portalId || !formGuid) {
    return NextResponse.json(
      {
        error:
          "HubSpot is not configured. Set HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID in your environment.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = (body ?? {}) as ContactPayload;

  const firstName = asTrimmedString(payload.firstName, 80);
  const lastName = asTrimmedString(payload.lastName, 80);
  const email = asTrimmedString(payload.email, 254).toLowerCase();
  const phone = asTrimmedString(payload.phone, 50);
  const website = asTrimmedString(payload.website, 200);
  const details = asTrimmedString(payload.details, 4000);

  if (!firstName || !lastName || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide first name, last name, and a valid email." },
      { status: 400 }
    );
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const hutk = cookieHeader.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];

  const referer = request.headers.get("referer") ?? "";
  const xff = request.headers.get("x-forwarded-for") ?? "";
  const ipAddress = xff.split(",")[0]?.trim() || undefined;

  const hcaptchaToken = asTrimmedString(payload.hcaptchaToken, 4096);
  if (!hcaptchaToken) {
    return NextResponse.json({ error: "Please complete the captcha." }, { status: 400 });
  }

  const captcha = await verifyHCaptcha(hcaptchaToken, ipAddress);
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.error }, { status: 400 });
  }

  const hubspotBody = {
    fields: [
      { name: "firstname", value: firstName },
      { name: "lastname", value: lastName },
      { name: "email", value: email },
      ...(phone ? [{ name: "phone", value: phone }] : []),
      ...(website ? [{ name: "website", value: website }] : []),
      ...(details ? [{ name: "message", value: details }] : []),
    ],
    context: {
      ...(hutk ? { hutk } : {}),
      ...(referer ? { pageUri: referer, pageName: "Contact" } : {}),
      ...(ipAddress ? { ipAddress } : {}),
    },
  };

  const host =
    region && region.trim()
      ? `https://api-${encodeURIComponent(region.trim())}.hsforms.com`
      : "https://api.hsforms.com";

  try {
    const res = await fetch(
      `${host}/submissions/v3/integration/submit/${encodeURIComponent(
        portalId
      )}/${encodeURIComponent(formGuid)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(hubspotBody),
      }
    );

    if (!res.ok) {
      let hubspotErrorText = "";
      let hubspotErrorJson: unknown = null;
      try {
        hubspotErrorJson = await res.json();
        hubspotErrorText = JSON.stringify(hubspotErrorJson);
      } catch {
        hubspotErrorText = await res.text();
      }

      const extracted = extractHubSpotErrorMessage(hubspotErrorJson);
      return NextResponse.json(
        {
          error: extracted || "HubSpot submission failed.",
          detail: hubspotErrorText.slice(0, 2000),
          status: res.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "HubSpot request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

