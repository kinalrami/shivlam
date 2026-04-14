export type WebHeroContent = {
  tagline: string;
  titleLines: {
    line1: string;
    highlight: string;
    line3: string;
  };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tags: readonly string[];
  rightBadges: {
    topRight: string;
    bottomLeft: string;
  };
};

export type WebDevServiceCard = {
  tag: string;
  title: string;
  desc: string;
  pills: readonly string[];
};

export type WebDevStatsItem = {
  value: string;
  label: string;
};

export type WebDevSectionIntro = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  title: { before: string; highlight: string; after?: string };
  lead: string;
};

export type WebDevPortfolioItem = {
  tag: string;
  name: string;
  desc: string;
  href: string;
  linkLabel: string;
};

export type WebDevContent = {
  hero: WebHeroContent;
  marquee: readonly string[];
  stats: readonly WebDevStatsItem[];
  services: WebDevSectionIntro & { cards: readonly WebDevServiceCard[] };
  midCta: {
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    microcopy: string;
  };
  tech: WebDevSectionIntro & {
    groups: readonly { label: string; variant: "back" | "ecom" | "front" | "cms"; items: readonly string[] }[];
  };
  design: WebDevSectionIntro & {
    primaryCta: { label: string; href: string };
    grid: readonly { icon: string; name: string; desc: string }[];
  };
  why: WebDevSectionIntro & {
    cards: readonly { title: string; desc: string; accent: "orange" | "cyan" }[];
    stats: readonly WebDevStatsItem[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  portfolio: WebDevSectionIntro & { items: readonly WebDevPortfolioItem[]; sideNote: string };
  portfolioCta: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    stats: readonly WebDevStatsItem[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  process: WebDevSectionIntro & {
    steps: readonly { num: string; tag: string; title: string; desc: string }[];
  };
  clients: WebDevSectionIntro & {
    line: string;
  };
  ethos: WebDevSectionIntro & {
    quote: string;
    stats: readonly WebDevStatsItem[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  more: WebDevSectionIntro & {
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

export const WEB_DEVELOPMENT_CONTENT: WebDevContent = {
  hero: {
    tagline: "LARAVEL · WORDPRESS · SHOPIFY · REACT · NEXT.JS",
    titleLines: {
      line1: "Custom Web",
      highlight: "Development",
      line3: "Services That Actually Scale.",
    },
    description:
      "From Laravel backends to Shopify storefronts, WordPress ecosystems to React frontends — we build web products that are fast, scalable, and built to grow your business.",
    primaryCta: { label: "Get a Free Quote →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: { label: "View Our Work", href: "#portfolio" },
    tags: [
      "Custom Web Development",
      "eCommerce Solutions",
      "CMS Development",
      "Web Design",
      "On-Time Delivery",
    ],
    rightBadges: {
      topRight: "● LIVE DEPLOY",
      bottomLeft: "✓ BUILD SUCCESS",
    },
  },
  marquee: [
    "LARAVEL",
    "SHOPIFY",
    "WORDPRESS",
    "WOOCOMMERCE",
    "MAGENTO",
    "REACT",
    "NEXT.JS",
    "VUE.JS",
    "TAILWIND CSS",
    "PHP 8",
    "MYSQL",
    "REST API",
    "FIGMA",
    "WEB DESIGN",
    "SEO READY",
  ],
  stats: [
    { value: "20+", label: "Web Projects Completed" },
    { value: "95%", label: "On-Time Delivery Rate" },
    { value: "5+", label: "Countries Served" },
    { value: "99%", label: "Client Satisfaction" },
  ],
  services: {
    sectionId: "services",
    headingId: "web-services-heading",
    eyebrow: "WEB SERVICES",
    title: { before: "Web Development ", highlight: "Specialisations", after: " We Deliver End-to-End." },
    lead: "From backend APIs to pixel-perfect storefronts — every stack, every platform, one dedicated team.",
    cards: [
      {
        tag: "BACKEND",
        title: "Laravel Development",
        desc: "Enterprise-grade PHP applications with Laravel. RESTful APIs, complex business logic, multi-tenant SaaS, and scalable backend systems built with clean architecture.",
        pills: ["Laravel 11", "PHP 8", "MySQL", "REST API"],
      },
      {
        tag: "CMS",
        title: "WordPress Development",
        desc: "Custom themes, bespoke plugins, and high-performance WordPress sites. Headless WordPress with REST API for decoupled frontends. SEO-optimised from the ground up.",
        pills: ["Custom Theme", "Plugin Dev", "Headless WP", "ACF"],
      },
      {
        tag: "ECOMMERCE",
        title: "eCommerce Development",
        desc: "Full-stack eCommerce solutions. Shopify custom themes & apps, WooCommerce with custom plugins, Magento for enterprise retail — built for conversion, speed, and scale.",
        pills: ["Shopify", "WooCommerce", "Magento", "Liquid"],
      },
      {
        tag: "FRONTEND",
        title: "JS Frontend Development",
        desc: "Modern, performant frontends with React, Next.js, Vue.js, and Nuxt. SSR, SSG, ISR patterns for SEO. Tailwind CSS and component-driven architecture.",
        pills: ["React", "Next.js", "Vue.js", "Tailwind", "TypeScript"],
      },
      {
        tag: "DESIGN",
        title: "Web Design & UI/UX",
        desc: "Conversion-focused web design from wireframe to pixel-perfect prototype. Responsive design systems, brand-aligned interfaces, and Figma handoff.",
        pills: ["Figma", "UI System", "Responsive", "Prototyping"],
      },
      {
        tag: "SUPPORT",
        title: "Web Maintenance & SEO",
        desc: "Ongoing performance monitoring, security updates, Core Web Vitals optimisation, and technical SEO — we keep your site fast, secure, and ranking after launch.",
        pills: ["Core Web Vitals", "Security", "Tech SEO", "CI/CD"],
      },
    ],
  },
  midCta: {
    titleBefore: "Got a Web Project in Mind?",
    titleHighlight: "Let's Scope It Together.",
    lead: "Tell us what you're building — we'll recommend the right stack, give you a transparent quote, and start within 7 days.",
    primaryCta: { label: "Get a Free Quote →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: { label: "Email hi@shivlam.com", href: "mailto:hi@shivlam.com" },
    microcopy: "hi@shivlam.com · Fast Response · No Middlemen",
  },
  tech: {
    sectionId: "tech",
    headingId: "tech-stack-heading",
    eyebrow: "TECH STACK",
    title: { before: "The Technologies Behind Every ", highlight: "Web Product", after: " We Ship." },
    lead: "Battle-tested tooling across backend, eCommerce, frontend, and CMS — chosen to match your scale and goals.",
    groups: [
      { label: "Backend & PHP", variant: "back", items: ["Laravel 11", "PHP 8.3", "MySQL", "PostgreSQL", "REST API", "GraphQL"] },
      { label: "eCommerce", variant: "ecom", items: ["Shopify", "WooCommerce", "Magento", "Liquid", "Stripe", "Razorpay"] },
      { label: "Frontend JS", variant: "front", items: ["React 18", "Next.js 14", "Vue.js 3", "Nuxt", "TypeScript", "GSAP", "Framer Motion"] },
      { label: "CMS & Tooling", variant: "cms", items: ["WordPress", "Webflow", "Sanity", "Strapi", "Vercel", "AWS"] },
    ],
  },
  design: {
    sectionId: "design",
    headingId: "web-design-heading",
    eyebrow: "WEB DESIGN",
    title: { before: "Websites That ", highlight: "Look As Good", after: " As They Perform." },
    lead: "We design before we develop. Every project starts with a wireframe, evolves into a design system, and ends with a pixel-perfect, conversion-optimised interface — not a template.",
    primaryCta: { label: "Discuss Your Design Project →", href: "https://shivlam.com/contact-us/" },
    grid: [
      { icon: "● FIGMA", name: "Figma Design Systems", desc: "Component libraries, auto-layout grids, and developer handoff specs built in Figma." },
      { icon: "◎ FRAMER", name: "Framer Prototyping", desc: "High-fidelity interactive prototypes that become production-ready experiences." },
      { icon: "⬡ MOTION", name: "Motion & Animation", desc: "Micro-interactions and scroll motion that elevate your brand without slowing pages down." },
      { icon: "▣ TAILWIND", name: "Utility-First CSS", desc: "Tailwind with design tokens for consistent, maintainable UI styling." },
      { icon: "✦ WEBGL", name: "3D & WebGL", desc: "Three.js and WebGL for immersive product showcases and hero experiences." },
      { icon: "⊕ CWV", name: "Core Web Vitals", desc: "Design decisions made with performance and SEO scores in mind." },
    ],
  },
  why: {
    sectionId: "why",
    headingId: "why-us-heading",
    eyebrow: "WHY HIRE US",
    title: { before: "The Web Development Partner ", highlight: "That Delivers", after: ", Not Just Promises." },
    lead: "Clean builds, strong communication, and a focus on outcomes — not just pixels.",
    cards: [
      { title: "On-Time Delivery", desc: "We set realistic milestones and hit them. Every project has a timeline and release plan.", accent: "orange" },
      { title: "SEO-First Build", desc: "Semantic structure, schema, and performance scores — from day one.", accent: "cyan" },
      { title: "Scalable Codebase", desc: "Clean architecture from day one. No spaghetti. No hidden debt.", accent: "orange" },
      { title: "No Middlemen", desc: "Direct access to your developer. Transparent progress, clear communication.", accent: "cyan" },
    ],
    stats: [
      { value: "20+", label: "Web Projects" },
      { value: "99%", label: "Satisfaction" },
      { value: "5+", label: "Countries" },
    ],
    primaryCta: { label: "Start Your Project →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: { label: "View Portfolio", href: "#portfolio" },
  },
  portfolio: {
    sectionId: "portfolio",
    headingId: "web-portfolio-heading",
    eyebrow: "WEB PORTFOLIO",
    title: { before: "Web Projects We've ", highlight: "Shipped & Scaled", after: "." },
    lead: "Real projects, real results — live websites built and delivered for clients across 5+ countries.",
    sideNote: "Real projects, real results — live websites built and delivered for clients across 5+ countries.",
    items: [
      {
        tag: "WordPress · SEO",
        name: "Plinth",
        desc: "Corporate website for Plinth — property consultancy platform with custom WordPress theme, optimised for lead generation.",
        href: "https://plinth.it/",
        linkLabel: "Visit Live Site",
      },
      {
        tag: "WordPress · Custom Theme",
        name: "Soma NPT",
        desc: "Swiss wellness brand website. Bilingual WordPress with custom theme, product catalogue, and high-performance optimisation.",
        href: "https://soma-npt.ch/",
        linkLabel: "Visit Live Site",
      },
      {
        tag: "Laravel · PHP",
        name: "SMPG Services",
        desc: "Service management portal with Laravel backend. Custom booking, admin dashboard, and client communication system.",
        href: "https://smpgservice.com/",
        linkLabel: "Visit Live Site",
      },
      {
        tag: "React · SEO · Fintech",
        name: "GiftCityAdvisor",
        desc: "Fintech advisory platform for GIFT City, India. React frontend with SEO optimisation — ranking for key investment terms.",
        href: "https://giftcityadvisor.com/",
        linkLabel: "Visit Live Site",
      },
      {
        tag: "WordPress · eCommerce",
        name: "EcoVance",
        desc: "Sustainability-focused eCommerce platform. WooCommerce with custom product configurator, sustainability metrics dashboard.",
        href: "https://ecovancedef.com/",
        linkLabel: "Visit Live Site",
      },
      {
        tag: "WordPress · US Education",
        name: "Polaris Academy US",
        desc: "US-based education academy website. Course catalogue, student portal integration, and full SEO strategy for US market.",
        href: "https://polarisacademyus.com/",
        linkLabel: "Visit Live Site",
      },
    ],
  },
  portfolioCta: {
    eyebrow: "WORK PORTFOLIO",
    titleBefore: "Every Website Has a",
    titleHighlight: "Story Behind It.",
    lead: "Explore full case studies, screenshots, and results from our most impactful web projects — across eCommerce, SaaS, fintech, and education.",
    stats: [
      { value: "20+", label: "Web Projects" },
      { value: "7+", label: "Live Sites" },
      { value: "5+", label: "Countries" },
    ],
    primaryCta: {
      label: "View Full Portfolio →",
      href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
    },
    secondaryCta: { label: "Start a Project", href: "https://shivlam.com/contact-us/" },
  },
  process: {
    sectionId: "process",
    headingId: "process-heading",
    eyebrow: "HOW WE WORK",
    title: { before: "From Idea to ", highlight: "Live Website", after: " in 4 Steps." },
    lead: "A transparent process that keeps you in the loop and delivers on schedule.",
    steps: [
      {
        num: "01",
        tag: "DISCOVERY",
        title: "Discussion & Scoping",
        desc: "We listen to your goals, analyse your market, and define the right stack and architecture before writing a single line of code.",
      },
      {
        num: "02",
        tag: "PLANNING",
        title: "Wireframe & Proposal",
        desc: "Design wireframes, development structure, timeline, and transparent quote. You approve before we build — no surprises.",
      },
      {
        num: "03",
        tag: "DEVELOPMENT",
        title: "Design → Build → QA",
        desc: "Pixel-perfect design handoff, clean code development, and cross-browser testing. You get weekly progress updates.",
      },
      {
        num: "04",
        tag: "LAUNCH",
        title: "Deploy & Grow",
        desc: "Launch with CI/CD, SSL, performance setup, and SEO foundation. Then we support growth post-launch.",
      },
    ],
  },
  clients: {
    sectionId: "clients-strip",
    headingId: "clients-strip-heading",
    eyebrow: "CLIENTS",
    title: { before: "Clients Who ", highlight: "Trust Us", after: "" },
    lead: "Powering Global Innovation across Web, Mobile, Gaming, and Digital Growth.",
    line:
      "DELIVEREND · PLINTH · SOMA NPT · SWADESHOTSAV · URBAN RURAL · SM-PG · BHARESHWAR · ECOVANCE · WINGTRACK · QUIZBUZZ · GIFTA · PURE EARTH · EPITAILO · PLASTOWARE · GIFTCITYADVISOR · POLARIS ACADEMY",
  },
  ethos: {
    sectionId: "ethos",
    headingId: "ethos-heading",
    eyebrow: "OUR ETHOS",
    title: { before: "Infusing Every Website with Genuine ", highlight: "Care & Craft", after: "." },
    lead: "A small, accountable team focused on quality, performance, and long-term maintainability.",
    quote:
      '"We take immense pride in our ability to consistently deliver innovative web solutions, tailored to meet the unique needs of our clients — whether it\'s a startup\'s first site or an enterprise\'s eCommerce platform."',
    stats: [
      { value: "20+", label: "Web Projects Delivered" },
      { value: "5+", label: "Countries Served" },
      { value: "99%", label: "Client Satisfaction" },
      { value: "3+", label: "Years of Focused Innovation" },
    ],
    primaryCta: { label: "Believe in Us →", href: "https://shivlam.com/contact-us/" },
    secondaryCta: { label: "About Shivlam", href: "https://shivlam.com/about-us/" },
  },
  more: {
    sectionId: "more",
    headingId: "more-heading",
    eyebrow: "EXPLORE MORE SERVICES",
    title: { before: "Need More Than a ", highlight: "Website?", after: "" },
    lead: "",
    items: [
      {
        tag: "MOBILE",
        title: "iPhone App Development",
        desc: "Native iOS apps in Swift and SwiftUI — from concept to App Store launch.",
        href: "/services/iphone-app-development",
      },
      {
        tag: "MOBILE",
        title: "Android App Development",
        desc: "Kotlin-first Android apps with Material Design and Play Store release pipelines.",
        href: "/services/android-app-development",
      },
      {
        tag: "CROSS-PLATFORM",
        title: "Flutter App Development",
        desc: "One Dart codebase delivering native apps on iOS, Android, and web.",
        href: "/services/flutter-app-development",
      },
      {
        tag: "MARKETING",
        title: "Digital Marketing & SEO",
        desc: "Organic growth, technical SEO, and content strategy to rank your web presence.",
        href: "https://shivlam.com/digital-marketing-solutions/",
      },
    ],
  },
  finalCta: {
    eyebrow: "GET IN TOUCH TODAY",
    titleBefore: "Ready to Build Your",
    titleHighlight: "Web Product?",
    lead: "Let's chat about your project — Laravel API, Shopify store, WordPress site, or a full custom web app. Drop us a line and we'll respond within hours.",
    primaryCta: { label: "Email Us →", href: "mailto:hi@shivlam.com" },
    secondaryCta: { label: "Contact Form", href: "https://shivlam.com/contact-us/" },
    contactEmail: "hi@shivlam.com",
    website: "shivlam.com",
    portfolioHref: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
  },
};

