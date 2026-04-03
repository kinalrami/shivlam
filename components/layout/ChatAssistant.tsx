"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MessageSquareText, Send, X } from "lucide-react";

type ChatRole = "user" | "assistant";

type ChatLine = { role: ChatRole; content: string; localOnly?: boolean };

const WELCOME: ChatLine = {
  role: "assistant",
  content:
    "Hi — I’m Shivlam’s assistant. Ask about web, mobile, games, SEO, or marketing. For detailed quotes, use the contact form or email hi@shivlam.com.",
  localOnly: true,
};

export function ChatAssistant() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ChatLine[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToEnd();
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [open, lines, scrollToEnd]);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }

    function onToggle() {
      setOpen((v) => !v);
    }

    window.addEventListener("shivlam:open-chat", onOpen);
    window.addEventListener("shivlam:toggle-chat", onToggle);
    return () => {
      window.removeEventListener("shivlam:open-chat", onOpen);
      window.removeEventListener("shivlam:toggle-chat", onToggle);
    };
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || pending) return;

    setError(null);
    setInput("");
    const nextUser: ChatLine = { role: "user", content: text };
    const apiMessages = [...lines, nextUser]
      .filter((m) => !m.localOnly)
      .map(({ role, content }) => ({ role, content }));

    setLines((prev) => [...prev, nextUser]);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Request failed.");
      }
      if (!data.message) {
        throw new Error("No reply from assistant.");
      }

      setLines((prev) => [...prev, { role: "assistant", content: data.message! }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setLines((prev) => prev.slice(0, -1));
      setInput(text);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-200 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Shivlam chat assistant"
          className="pointer-events-auto flex max-h-96 w-100 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-sl-saffron">
                Live assistant
              </p>
              <p className="font-sans text-sm font-semibold text-white">Ask Shivlam</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
            {lines.map((line, i) => (
              <div
                key={`${i}-${line.role}-${line.content.slice(0, 12)}`}
                className={`max-w-[95%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  line.role === "user"
                    ? "ml-auto bg-sl-saffron/20 text-gray-100"
                    : "mr-auto border border-white/10 bg-white/5 text-gray-200"
                }`}
              >
                {line.content}
              </div>
            ))}
            {pending ? (
              <p className="font-mono text-xs text-sl-muted" aria-live="polite">
                Thinking…
              </p>
            ) : null}
            {error ? (
              <p className="rounded-lg border border-red-400/30 bg-red-950/40 px-3 py-2 font-sans text-xs text-red-200">
                {error}
              </p>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Message…"
                rows={1.5}
                disabled={pending}
                className="min-h-5 flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-sm text-white outline-hidden placeholder:text-gray-500 focus:border-sl-cyan/50"
                aria-label="Message"
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={pending || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sl-saffron text-gray-950 transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="size-5" strokeWidth={2} />
              </button>
            </div>
            <p className="mt-2 font-mono text-[11px] text-sl-muted">
              Powered by OpenAI · Not legal or financial advice
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`chat-fab pointer-events-auto flex size-14 items-center justify-center rounded-full bg-sl-saffron text-gray-950 shadow-lg shadow-black/30 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sl-cyan ${!open ? "chat-fab--idle" : ""}`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        <span className="chat-fab-morph" aria-hidden>
          <MessageSquareText
            className="size-7"
            strokeWidth={2}
            data-morph-hidden={open}
            style={
              open
                ? { opacity: 0, transform: "scale(0.5) rotate(90deg)" }
                : { opacity: 1, transform: "scale(1) rotate(0deg)" }
            }
          />
          <X
            className="size-7"
            strokeWidth={2}
            data-morph-hidden={!open}
            style={
              open
                ? { opacity: 1, transform: "scale(1) rotate(0deg)" }
                : { opacity: 0, transform: "scale(0.5) rotate(-90deg)" }
            }
          />
        </span>
      </button>
    </div>
  );
}
