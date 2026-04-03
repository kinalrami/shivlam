"use client";

import { useId } from "react";

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
  const detailsId = useId();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 pb-12 sm:pb-20 px-5 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col justify-center">
          <p className="font-mono mb-4 text-xs font-medium uppercase text-sl-saffron">
            Let’s talk
          </p>
          <h2
            id="contact-heading"
            className="mb-4 font-sans text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Accelerate Your Growth:
            <br />
            <span className="font-normal text-gray-200">
              Join Forces for Success, Now!
            </span>
          </h2>

          <p className="max-w-prose font-sans text-base font-light leading-relaxed text-gray-400">
            Are you seeking a reliable partner to unlock the full potential of your
            business? From modern websites and mobile apps to SEO and digital
            marketing, we can help you ship faster and grow sustainably.
          </p>

          <p className="mt-5 max-w-prose font-sans text-base font-light leading-relaxed text-gray-400">
            Tell us a bit about what you’re building and we’ll get back with next
            steps.
          </p>

          <p className="mt-6 font-sans text-sm font-medium text-gray-300">
            Contact us today.
          </p>
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
            onSubmit={(e) => e.preventDefault()}
            className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-2xl sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <ContactFormField
                label="First name"
                required
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
              />
              <ContactFormField
                label="Last name"
                required
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
              />
              <ContactFormField
                label="Email"
                required
                type="email"
                name="email"
                placeholder="jane@company.com"
                autoComplete="email"
              />
              <ContactFormField
                label="Phone number"
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                inputMode="tel"
                pattern="^(\\+91[\\s-]?)?[6-9]\\d{9}$"
                title="Enter an Indian mobile number (optional +91), e.g. +91 9876543210"
              />
            </div>

            <div className="mt-5">
              <ContactFormField
                label="Company Website"
                type="url"
                name="website"
                placeholder="https://company.com"
                autoComplete="url"
              />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <label
                htmlFor={detailsId}
                className="font-sans text-sm font-medium text-gray-300"
              >
                Details
              </label>
              <textarea
                id={detailsId}
                name="details"
                rows={5}
                placeholder="What are you looking to build?"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/3 px-4 py-3 font-sans text-sm text-white outline-hidden backdrop-blur-2xl transition-[border-color,box-shadow] placeholder:text-gray-500 focus:border-sl-saffron/60 focus:ring-2 focus:ring-sl-saffron/35 focus:ring-offset-0"
              />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-sm text-gray-500">
                By submitting, you agree to be contacted about your request.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl border border-sl-saffron bg-transparent px-6 py-3 font-mono text-sm font-bold text-sl-saffron transition-[filter,transform] hover:brightness-110 active:translate-y-px"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
