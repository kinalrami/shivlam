import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatAssistant } from "@/components/layout/ChatAssistant";
import { GlobalCursor } from "@/components/layout/GlobalCursor";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shivlam",
  description: "Scalable tech services for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body
        className={`${dmSans.className} min-h-full flex flex-col font-sans font-normal`}
      >
        <GlobalCursor />
        <Header />
        {children}
        <Footer />
        <ChatAssistant />
      </body>
    </html>
  );
}
