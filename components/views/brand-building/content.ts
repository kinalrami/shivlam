export type BrandBuildingContent = {
  hero: {
    tagline: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    meta: readonly string[];
  };
  marquee: readonly string[];
  statsStrip: readonly { value: string; label: string }[];
  seoDeepDive: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    features: readonly { tone: "orange" | "cyan" | "green"; title: string; desc: string }[];
    pills: readonly string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    visualPosition: "start" | "end";
  };
  asoDeepDive: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    features: readonly { tone: "orange" | "cyan" | "green"; title: string; desc: string }[];
    pills: readonly string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    visualPosition: "start" | "end";
  };
  latestChannels: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    cards: readonly { badge?: "new"; tag: string; title: string; desc: string }[];
  };
  socialPaidMedia: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    features: readonly {
      tag: string;
      tagTone: string;
      title: string;
      desc: string;
    }[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  strategyFunnel: {
    sectionId: string;
    leftLabel: string;
    rightLabel: string;
    titleBefore: string;
    titleEmphasis: string;
    lead: string;
    rows: readonly { tone: "info" | "comm" | "trans"; intent: string; example: string; stage: string }[];
    howWeUseThis: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  specialisedMarketing: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    cards: readonly { tag: string; title: string; desc: string; href: string; linkLabel: string }[];
  };
  portfolioCta: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    stats: readonly { value: string; label: string }[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  process: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    steps: readonly { num: string; tag: string; title: string; desc: string }[];
  };
  clients: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    line: string;
  };
  more: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    items: readonly { tag: string; title: string; desc: string; href: string }[];
  };
  finalCta: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    contactEmail: string;
    website: string;
    portfolioHref: string;
  };
};

import { WEB_DEVELOPMENT_CONTENT } from "@/components/views/web-development/content";

export const BRAND_BUILDING_CONTENT: BrandBuildingContent = {
  hero: {
    tagline: "SEO · ASO · SOCIAL MEDIA · GOOGLE ADS · BRAND STRATEGY",
    titleBefore: "Turn Your Business into a",
    titleHighlight: "Brand",
    titleAfter: "the Market Trusts.",
    description:
      "Brand building is the ongoing, active daily work of promoting your identity to earn long-term trust and recognition. We do it across every channel — search, stores, social, and paid media.",
    primaryCta: { label: "Start Building Your Brand →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: {
      label: "Explore Services",
      href: "#services",
    },
    meta: ["Brand Positioning","SEO & ASO","Social Media Marketing","Google Ads / PPC","Content Marketing","Saas Marketing"],
  },
  marquee: [
    "BRAND BUILDING",
    "SEO",
    "ASO",
    "SOCIAL MEDIA",
    "GOOGLE ADS",
    "BRAND POSITIONING",
    "CONTENT MARKETING",
    "INFLUENCER MARKETING",
    "SAAS MARKETING",
    "GEO · AI SEO",
    "BRAND IDENTITY",
    "CORE WEB VITALS",
    "PERFORMANCE MARKETING",
    "GAME MARKETING",
    "SHIVLAM.COM",
  ],
  statsStrip: [
    { value: "25+", label: "BRANDS BUILT" },
    { value: "15+", label: "HAPPY CLIENTS" },
    { value: "5+", label: "COUNTRIES SERVED" },
    { value: "99%", label: "SATISFACTION RATE" },
  ],
  seoDeepDive: {
    sectionId: "seo",
    headingId: "seo-heading",
    eyebrow: "SEO — PRIORITY #1",
    title: { before: "Organic Search Is Your Brand's ", highlight: "Biggest Asset.", after: "" },
    lead: "We practice structured, ethical SEO that builds authority over time. Keyword research, technical fixes, on-page optimisation, and a link strategy that doesn't risk your rankings.",
    features: [
      {
        tone: "orange",
        title: "Structured SEO Architecture",
        desc: "Site structure designed around your business and location — how Google categorises and trusts your domain.",
      },
      {
        tone: "cyan",
        title: "Technical SEO & Core Web Vitals",
        desc: "Indexing, crawlability, LCP, CLS, FID — following Google's latest guidelines for fast, mobile-first, indexable sites.",
      },
      {
        tone: "green",
        title: "Transparent Reporting",
        desc: "Monthly keyword ranking reports, traffic growth, and conversion data. SEO is a long-term process — we show you every step.",
      },
    ],
    pills: [
      "IT Services SEO",
      "eCommerce SEO",
      "Shopify SEO",
      "Amazon SEO",
      "Local SEO",
      "Squarespace SEO",
      "HubSpot SEO",
    ],
    primaryCta: { label: "SEO Services →", href: "https://shivlam.com/affordable-seo-service/" },
    secondaryCta: { label: "Get SEO Audit", href: "https://shivlam.com/contact-us/" },
    visualPosition: "start",
  },
  asoDeepDive: {
    sectionId: "aso",
    headingId: "aso-heading",
    eyebrow: "ASO — APP STORE GROWTH",
    title: { before: "Your App Needs to Be", highlight: "Found Organically.", after: "" },
    lead: "Over 65% of app downloads come from direct search in the App Store and Play Store. ASO is SEO for your app — and most developers ignore it. We don't.",
    features: [
      {
        tone: "orange",
        title: "Keyword Research & Title Optimisation",
        desc: "Finding high-volume, low-competition keywords and weaving them into your title, subtitle, and keyword field for maximum visibility.",
      },
      {
        tone: "cyan",
        title: "Screenshot & Preview A/B Testing",
        desc: "Your store visuals are your first impression. We test screenshot styles, captions, and preview videos to maximise install conversion rate.",
      },
      {
        tone: "green",
        title: "Rating & Review Strategy",
        desc: "A systematic in-app rating prompt strategy, response templates for reviews, and recovery plans for negative rating clusters.",
      },
    ],
    pills: ["App Store (iOS)", "Play Store (Android)", "Game ASO", "App Retargeting"],
    primaryCta: { label: "Get ASO Audit →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: {
      label: "Game Marketing",
      href: "https://shivlam.com/top-mobile-game-marketing-services-for-boosting-downloads/",
    },
    visualPosition: "end",
  },
  latestChannels: {
    sectionId: "latest-channels",
    headingId: "latest-channels-heading",
    eyebrow: "NEW IN 2025-26",
    title: { before: "The Latest Brand Building", highlight: "Services & Channels.", after: "" },
    lead: "The brand building landscape evolves fast. We stay ahead of every emerging channel and algorithm change so your brand does too.",
    cards: [
      {
        badge: "new",
        tag: "AI SEARCH",
        title: "GEO — Generative Engine Optimisation",
        desc: "Optimising your brand to appear in AI-generated answers from ChatGPT, Gemini, and Google SGE (Search Generative Experience). The next frontier of search visibility.",
      },
      {
        badge: "new",
        tag: "AI SEO",
        title: "AI‑Powered SEO & Content",
        desc: "Using AI tools like Surfer SEO, Clearscope, and custom LLM workflows to produce high-quality, topical-authority content at scale — while maintaining E‑E‑A‑T standards.",
      },
      {
        tag: "ZERO-CLICK",
        title: "Zero‑Click Search Strategy",
        desc: "Optimising for featured snippets, People Also Ask, and knowledge panels so your brand gets visibility even when users don't click — building brand recall in the SERP itself.",
      },
      {
        tag: "SOCIAL COMMERCE",
        title: "Social Commerce & Shop Integration",
        desc: "Instagram Shops, TikTok Shop, and WhatsApp Commerce — turning social followers directly into buyers without leaving the platform. Full setup and catalogue management.",
      },
      {
        tag: "UGC",
        title: "UGC & Creator Economy",
        desc: "Systematic User Generated Content programmes — briefs, creator contracts, usage rights, and performance tracking for authentic brand content that outperforms traditional ads.",
      },
      {
        tag: "MESSAGING",
        title: "WhatsApp & Conversational Marketing",
        desc: "WhatsApp Business API, broadcast lists, and chatbot sequences for D2C brands — conversational marketing that converts at 4–5× higher rates than email.",
      },
      {
        tag: "VIDEO FIRST",
        title: "Short‑Form Video Strategy",
        desc: "Instagram Reels, YouTube Shorts, and LinkedIn video — platform-specific scripting, editing briefs, and publishing cadence to build a brand presence in the attention economy.",
      },
      {
        tag: "ANALYTICS",
        title: "GA4 & Privacy‑First Analytics",
        desc: "Post-cookie tracking with GA4, first-party data collection, server-side tagging, and consent management — so you keep clear attribution data as privacy rules tighten.",
      },
    ],
  },
  socialPaidMedia: {
    sectionId: "social-paid",
    headingId: "social-paid-heading",
    eyebrow: "SOCIAL & PAID MEDIA",
    title: { before: "Amplify Your Brand Across", highlight: "Every Channel, Every Day.", after: "" },
    lead: "Social media builds daily trust. Google Ads drives immediate targeted reach. Together they compound your brand's authority — organic credibility backed by precision-paid amplification.",
    features: [
      {
        tag: "SOCIAL STRATEGY",
        tagTone: "text-orange-400/70",
        title: "Community Building",
        desc: "Platform-native content, engagement strategy, and community management across Instagram, LinkedIn, and YouTube.",
      },
      {
        tag: "PAID SOCIAL",
        tagTone: "text-[rgba(29,207,207,.70)]",
        title: "Social Advertising",
        desc: "Meta Ads, LinkedIn Ads, and YouTube pre-roll campaigns with precise audience targeting and creative A/B testing.",
      },
      {
        tag: "GOOGLE ADS",
        tagTone: "text-orange-400/70",
        title: "Performance Max",
        desc: "Search, Display, and Performance Max campaigns with budget planning, ad rank optimisation, and ROAS-first reporting.",
      },
      {
        tag: "RETARGETING",
        tagTone: "text-[rgba(34,197,94,.75)]",
        title: "Funnel Retargeting",
        desc: "Pixel-based retargeting sequences that bring back visitors who didn't convert — across Google, Meta, and YouTube.",
      },
    ],
    primaryCta: { label: "Digital Marketing Services →", href: "https://shivlam.com/digital-marketing-solutions/" },
    secondaryCta: { label: "Get a Campaign Quote", href: "https://shivlam.com/contact-us/" },
  },
  strategyFunnel: {
    sectionId: "strategy",
    leftLabel: "KEYWORD STRATEGY FUNNEL",
    rightLabel: "BRAND SEARCH INTENT",
    titleBefore: "Meet Your Audience",
    titleEmphasis: "at Every Stage.",
    lead: "Brand building through search means targeting all three intent stages — not just buyers, but learners and researchers too. We map content and ads to each stage.",
    rows: [
      {
        tone: "info",
        intent: "Informational",
        example: "\"What is brand positioning?\"",
        stage: "Learning stage — looking for an expert. Build trust with content.",
      },
      {
        tone: "comm",
        intent: "Commercial",
        example: "\"Best branding agency in Ahmedabad\"",
        stage: "Research stage — comparing providers. Win with credibility signals.",
      },
      {
        tone: "trans",
        intent: "Transactional",
        example: "\"Hire brand consultant\"",
        stage: "Decision stage — ready to purchase. Convert with clear CTAs.",
      },
    ],
    howWeUseThis:
      "We build content for informational intent, optimise your site for commercial searches, and run Google Ads for transactional terms — so your brand captures every stage of the buyer journey simultaneously.",
    primaryCta: { label: "Build My Brand Strategy →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: { label: "SEO Services", href: "https://shivlam.com/affordable-seo-service/" },
  },
  specialisedMarketing: {
    sectionId: "specialised-marketing",
    headingId: "specialised-marketing-heading",
    eyebrow: "SPECIALISED MARKETING",
    title: { before: "Marketing for Specific", highlight: "Products & Industries.", after: "" },
    lead: "Beyond general brand building — we offer specialist marketing programmes tailored to SaaS products, mobile games, and tech companies.",
    cards: [
      {
        tag: "SAAS MARKETING",
        title: "SaaS Product Marketing",
        desc: "Go-to-market strategy, positioning and messaging, customer persona development, demand generation, product launch campaigns, and customer retention programmes for cloud-based SaaS products.",
        href: "https://shivlam.com/saas-product-marketing-solutions-boost-your-growth/",
        linkLabel: "Learn More",
      },
      {
        tag: "GAME MARKETING",
        title: "Mobile Game Marketing",
        desc: "Strategic planning, innovative content and copywriting, paid media, social community engagement, ASO, and influencer partnerships to boost game downloads and grow an engaged player base.",
        href: "https://shivlam.com/top-mobile-game-marketing-services-for-boosting-downloads/",
        linkLabel: "Learn More",
      },
      {
        tag: "SEO SERVICES",
        title: "Affordable SEO Service",
        desc: "Structured, ethical SEO designed around your business and location. IT Services SEO, eCommerce SEO, Shopify SEO, Amazon SEO, and local SEO — with transparent monthly reporting.",
        href: "https://shivlam.com/affordable-seo-service/",
        linkLabel: "Learn More",
      },
    ],
  },
  portfolioCta: {
    eyebrow: "WORK PORTFOLIO",
    titleBefore: "Real Brands We've",
    titleHighlight: "Built & Grown.",
    lead: "From organic traffic tripling in 6 months to app store rankings climbing from page 3 to position 1 — explore the results behind our brand-building work.",
    stats: [
      { value: "25+", label: "Brands Built" },
      { value: "15+", label: "Happy Clients" },
      { value: "99%", label: "Satisfaction" },
    ],
    primaryCta: {
      label: "View Full Portfolio →",
      href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
    },
    secondaryCta: { label: "Start Your Brand", href: "https://shivlam.com/contact-us/" },
  },
  process: {
    sectionId: "process",
    headingId: "brand-process-heading",
    eyebrow: "HOW WE BUILD BRANDS",
    title: { before: "From Audit to", highlight: "Brand Authority", after: " in 4 Phases." },
    lead: "",
    steps: [
      {
        num: "01",
        tag: "DISCOVER",
        title: "Brand Audit",
        desc: "We audit your current digital presence — SEO, social, paid, and brand perception — to find gaps, opportunities, and your competitive positioning.",
      },
      {
        num: "02",
        tag: "PLAN",
        title: "Brand Strategy",
        desc: "We define your positioning, messaging framework, channel mix, keyword strategy, and content calendar. A documented brand strategy you actually own.",
      },
      {
        num: "03",
        tag: "EXECUTE",
        title: "Build & Amplify",
        desc: "Content creation, SEO implementation, ASO, social media management, Google Ads campaigns, and influencer activations — all running in coordinated cycles.",
      },
      {
        num: "04",
        tag: "GROW",
        title: "Measure & Compound",
        desc: "Monthly performance reporting, A/B test results, ranking updates, and strategy refinements. Brand building compounds — every month builds on the last.",
      },
    ],
  },
  clients: WEB_DEVELOPMENT_CONTENT.clients,
  more: {
    sectionId: "more",
    headingId: "more-heading",
    lead: "",
    eyebrow: "EXPLORE MORE",
    title: { before: "Need More Than", highlight: "Brand Building?", after: "" },
    items: [
      {
        tag: "MOBILE",
        title: "iPhone App Development",
        desc: "Build the product your brand markets. Native iOS apps in Swift — concept to App Store.",
        href: "/services/iphone-app-development",
      },
      {
        tag: "WEB",
        title: "Web Development",
        desc: "Your brand's home on the web. Laravel, WordPress, Shopify — built for conversion and SEO.",
        href: "/services/web-development",
      },
      {
        tag: "GAMING",
        title: "Game Development",
        desc: "Unity mobile games, AR experiences, and Vision Pro spatial games for game brands.",
        href: "/services/game-development",
      },
      {
        tag: "SPECIALISATION",
        title: "DeltaBIMAR / AR BIM",
        desc: "Our flagship product — LiDAR-powered AR construction tool with BIM overlay and clash detection.",
        href: "/services/ar-bim",
      },
    ]
  },
  finalCta: {
    eyebrow: "GET IN TOUCH",
    titleBefore: "Ready to Build a Brand",
    titleHighlight: "the Market Remembers?",
    lead: "Tell us about your business. We'll recommend the right brand-building channels and give you a clear plan — SEO, ASO, social, paid, or all of them together.",
    primaryCta: { label: "Email Us →", href: "mailto:hi@shivlam.com" },
    secondaryCta: { label: "Contact Form", href: "https://shivlam.com/contact-us/" },
    contactEmail: "hi@shivlam.com",
    website: "shivlam.com",
    portfolioHref: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
  },
};

