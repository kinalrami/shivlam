"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

type ContactFormFieldProps = {
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  title?: string;
  name: string;
};

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create?: (opts: {
          portalId: string;
          formId: string;
          region?: string;
          target: string;
          cssClass?: string;
          redirectUrl?: string;
          inlineMessage?: string;
          onFormReady?: (form: HTMLFormElement) => void;
          onFormSubmitted?: (form: HTMLFormElement) => void;
        }) => void;
      };
    };
  }
}

let hubspotScriptPromise: Promise<void> | null = null;

function loadHubSpotScript() {
  if (hubspotScriptPromise) return hubspotScriptPromise;
  hubspotScriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.hbspt?.forms?.create) return resolve();

    const src = "https://js.hsforms.net/forms/embed/v2.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("HubSpot script failed to load (existing tag).")),
        {
          once: true,
        }
      );
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", () => resolve(), { once: true });
    s.addEventListener(
      "error",
      () => reject(new Error("HubSpot script failed to load.")),
      {
        once: true,
      }
    );
    document.head.appendChild(s);
  });
  return hubspotScriptPromise;
}

function HubSpotFormStyled() {
  const hostId = useId();
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [renderSeq, setRenderSeq] = useState(0);
  const lastScrollYRef = useRef<number | null>(null);

  const portalId = "24198079";
  const formId = "9367aac3-017b-497f-bc6a-6ea02e2a6b9c";
  const region = "na1";
  const isDev = true;

  const keepOnContact = useCallback(() => {
    if (typeof window === "undefined") return;
    const section = document.getElementById("contact");
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 96; // ~scroll-mt-24
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.has("submissionGuid")) {
      // Preserve scroll position; HubSpot may mutate DOM/URL after submit.
      lastScrollYRef.current = window.scrollY;
      setSubmitted(true);
      url.searchParams.delete("submissionGuid");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      // Restore scroll after the URL mutation.
      queueMicrotask(() => {
        keepOnContact();
      });
    }
  }, [keepOnContact]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!portalId || !formId) {
        setErrorMessage("Missing HubSpot form configuration.");
        setState("error");
        return;
      }

      setState("loading");
      try {
        await loadHubSpotScript();
        if (cancelled) return;

        const target = `#${CSS.escape(hostId)}`;
        const container = document.querySelector(target);
        if (container) container.innerHTML = "";

        window.hbspt?.forms?.create?.({
          portalId,
          formId,
          region,
          target,
          cssClass: "sl-hubspot-form",
          // Prevent HubSpot redirecting to a non-existent thank-you page.
          redirectUrl:
            typeof window !== "undefined"
              ? (() => {
                const u = new URL(window.location.href);
                console.log(u);
                // Keep hash so we don't jump back to the hero/top.
                u.searchParams.delete("submissionGuid");
                return u.pathname + u.search + u.hash;
              })()
              : "",
          onFormReady: (formEl) => {
            // Make the HubSpot form feel like our UI (placeholders + submit label).
            const setPh = (name: string, ph: string) => {
              const input = formEl.querySelector<HTMLInputElement | HTMLTextAreaElement>(
                `[name="${CSS.escape(name)}"]`
              );
              if (input) input.placeholder = ph;
            };

            setPh("firstname", "Jane");
            setPh("lastname", "Doe");
            setPh("email", "jane@company.com");
            setPh("phone", "+91 98765 43210");
            setPh("website", "https://company.com");

            // Common message field names vary per portal; try a few.
            setPh("message", "What are you looking to build?");
            setPh("details", "What are you looking to build?");
            setPh("hs_message", "What are you looking to build?");

            const submit = formEl.querySelector<HTMLInputElement>('input[type="submit"]');
            if (submit) submit.value = "Send message";
          },
          onFormSubmitted: () => {
            if (typeof window !== "undefined") lastScrollYRef.current = window.scrollY;
            setSubmitted(true);
            // Best-effort: if HubSpot still tries to redirect, keep user here.
            // (Some forms enforce redirectUrl from portal settings.)
            if (typeof window !== "undefined") {
              const url = new URL(window.location.href);
              url.searchParams.delete("submissionGuid");
              window.history.replaceState({}, "", url.pathname + url.search + url.hash);
            }

            // HubSpot replaces the form markup on submit. Re-create the form so the user
            // can submit again without refreshing, while we show our own thank-you message.
            setTimeout(() => {
              setRenderSeq((v) => v + 1);
            }, 50);

            // HubSpot may autofocus/scroll during captcha + post-submit rendering.
            // Re-assert scroll position a few times so we stay on the contact section.
            // keepOnContact();
            // setTimeout(keepOnContact, 50);
            // setTimeout(keepOnContact, 150);
            // setTimeout(keepOnContact, 350);
            // setTimeout(keepOnContact, 650);
          },
        });

        setState("ready");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        if (isDev) console.error("HubSpot form init failed:", e);
        setErrorMessage(msg);
        setState("error");
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [formId, hostId, isDev, portalId, region, renderSeq]);

  return (
    <div className="flex flex-col gap-3">
      {state === "error" ? (
        <p className="font-sans text-sm text-rose-300">
          Form failed to load. Please refresh.
          {isDev && errorMessage ? ` (${errorMessage})` : ""}
        </p>
      ) : null}
      {state === "loading" ? (
        <p className="font-sans text-sm text-gray-400">Loading form...</p>
      ) : null}

      {/* Style HubSpot's generated markup to match site UI */}
      <style jsx global>{`
        .sl-hubspot-form {
          width: 100%;
        }
        .sl-hubspot-form * {
          box-sizing: border-box;
        }
        .sl-hubspot-form .hs-form fieldset {
          max-width: 100%;
        }
        .sl-hubspot-form .hs-form .hs-form-field {
          margin-bottom: 1.25rem;
        }
        .sl-hubspot-form .hs-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica,
            Arial, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 0.875rem;
          font-weight: 500;
          color: rgb(209 213 219);
        }
        /* HubSpot uses .hs-input on most controls; force our theme with !important. */
        .sl-hubspot-form .hs-form .hs-input,
        .sl-hubspot-form .hs-form .input input,
        .sl-hubspot-form .hs-form .input textarea,
        .sl-hubspot-form .hs-form input[type="text"],
        .sl-hubspot-form .hs-form input[type="email"],
        .sl-hubspot-form .hs-form input[type="tel"],
        .sl-hubspot-form .hs-form input[type="url"],
        .sl-hubspot-form .hs-form textarea,
        .sl-hubspot-form .hs-form select {
          width: 100%;
          height: 2.75rem;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background-color: rgba(255, 255, 255, 0.03) !important;
          background-image: none !important;
          border-radius: 0.75rem !important;
          padding: 0.75rem 1rem !important;
          outline: none !important;
          box-shadow: none !important;
          backdrop-filter: blur(24px) !important;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica,
            Arial, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 0.875rem !important;
        }
        .sl-hubspot-form .hs-form textarea {
          height: auto;
          border-radius: 1rem !important;
          resize: none !important;
          min-height: 140px !important;
          padding-top: 0.75rem !important;
          padding-bottom: 0.75rem !important;
        }
        .sl-hubspot-form .hs-form .hs-input::placeholder,
        .sl-hubspot-form .hs-form .input input::placeholder,
        .sl-hubspot-form .hs-form textarea::placeholder {
          color: rgb(107 114 128) !important;
        }
        .sl-hubspot-form .hs-form .hs-input:focus {
          border-color: color-mix(in srgb, var(--sl-saffron) 60%, transparent) !important;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--sl-saffron) 35%, transparent) !important;
        }
        .sl-hubspot-form .hs-form .hs-error-msgs {
          margin-top: 0.5rem;
          color: rgb(253 164 175);
          font-size: 0.875rem;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica,
            Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }
        .sl-hubspot-form .hs-form .hs-form-required,
        .sl-hubspot-form .hs-form .hs_required,
        .sl-hubspot-form .hs-form .hs-required {
          color: var(--sl-saffron) !important;
        }
        .sl-hubspot-form .hs-form .hs_submit {
          margin-top: 1.75rem;
          display: flex;
          justify-content: flex-end;
        }
        .sl-hubspot-form .hs-form input[type="submit"] {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          border-radius: 0.75rem;
          border: 1px solid var(--sl-saffron) !important;
          background: transparent !important;
          padding: 0.75rem 1.5rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
            "Courier New", monospace;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--sl-saffron) !important;
          cursor: pointer;
          transition: filter 150ms ease, transform 150ms ease;
        }
        .sl-hubspot-form .hs-form input[type="submit"]:hover {
          filter: brightness(1.1);
        }
        .sl-hubspot-form .hs-form input[type="submit"]:active {
          transform: translateY(1px);
        }

        /* Success message after submit (React-controlled) */
        .sl-hubspot-success {
          margin-top: 4px;
          border: 0.5px solid var(--sl-saffron);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          backdrop-filter: blur(24px);
          color: rgb(209 213 219);
        }
        .sl-hubspot-success__title {
          margin: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
            "Courier New", monospace;
          font-size: 0.875rem;
          font-weight: 700;
          color: #ffffff !important;
        }
        .sl-hubspot-success__body {
          margin: 0.5rem 0 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica,
            Arial, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 0.875rem;
          color: #ffffff !important;
          line-height: 1.5;
        }
        .sl-hubspot-success__link {
          color: var(--sl-saffron);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        /* Attempt a nicer 2-col layout on larger screens */
        @media (min-width: 640px) {
          .sl-hubspot-form .hs-form fieldset {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.25rem;
          }
          .sl-hubspot-form .hs-form .hs-form-field {
            margin-bottom: 0;
          }
          .sl-hubspot-form .hs-form .hs-form-field:has(textarea) {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      <div id={hostId} />

      {/* Thank-you message under the form */}
      {submitted ? (
        <div className="sl-hubspot-success" role="status" aria-live="polite">
          <p className="sl-hubspot-success__title">Thanks — message sent.</p>
          <p className="sl-hubspot-success__body">
            We’ve received your request and will get back to you shortly. If it’s urgent, email{" "}
            <a className="sl-hubspot-success__link" href="mailto:hi@shivlam.com">
              hi@shivlam.com
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-sl-saffron bg-transparent px-4 py-2 font-mono text-xs font-bold text-sl-saffron transition-[filter,transform] hover:brightness-110 active:translate-y-px"
              onClick={() => {
                setSubmitted(false);
                setRenderSeq((v) => v + 1);
              }}
            >
              Send another message
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs font-bold text-gray-200 transition-[filter,transform] hover:brightness-110 active:translate-y-px"
              onClick={() => setSubmitted(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ContactFormField({
  label,
  required,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  title,
  name,
}: ContactFormFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-sm font-medium text-gray-300">
        {label}
        {required ? <span className="text-sl-saffron">*</span> : null}
      </label>
      <input
        id={id}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        title={title}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/3 px-4 font-sans text-sm text-white outline-hidden backdrop-blur-2xl transition-[border-color,box-shadow] placeholder:text-gray-500 focus:border-sl-saffron/60 focus:ring-2 focus:ring-sl-saffron/35 focus:ring-offset-0"
      />
    </div>
  );
}

export default function ContactFormSection() {
  // HubSpot embed renders its own form controls; we keep the section design.

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 pb-12 sm:pb-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="font-mono mb-4 text-xs font-medium uppercase text-sl-saffron">
              Let’s Construct!
            </p>
            <h2
              id="contact-heading"
              className="mb-4 font-sans text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              Write Your Dream on
              <br />
              <span className="font-normal text-gray-200">
                Top of our code, Take Now!
              </span>
            </h2>

            <p className="max-w-prose font-sans text-base font-light leading-relaxed text-gray-400">
              Are you in need of a serious partner in order to maximise the potential of your business? Whether it is high-performance mobile applications, web and web-to-brand build!, we can assist you to ship faster and grow sustainably.
            </p>

            {/* <p className="mt-5 max-w-prose font-sans text-base font-light leading-relaxed text-gray-400">
            Tell us a bit about what you’re building and we’ll get back with next
            steps.
          </p>

          <p className="mt-6 font-sans text-sm font-medium text-gray-300">
            Contact us today.
          </p> */}
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-70"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--sl-saffron) 35%, transparent), 0 0 80px color-mix(in srgb, var(--sl-saffron) 18%, transparent)",
              }}
              aria-hidden
            />

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // HubSpot handles submission + captcha itself.
              }}
              className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-2xl sm:p-8"
            >
              <HubSpotFormStyled />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
