export type LegalDocKey = "terms" | "privacy";

export type LegalBodyPart = string | { type: "mailto"; email: string };

export type LegalPoint = {
  num: string;
  title: string;
  body: readonly LegalBodyPart[];
};

export type LegalDoc = {
  key: LegalDocKey;
  tabLabel: string;
  label: string;
  title: { before: string; highlight: string; after?: string };
  meta: string;
  intro: string;
  points: readonly LegalPoint[];
  strip: { eyebrow: string; body: string; href: string; label: string };
};

export const LEGAL_DOCS: readonly LegalDoc[] = [
  {
    key: "terms",
    tabLabel: "Terms & Conditions",
    label: "Legal Document",
    title: { before: "Terms & ", highlight: "Conditions" },
    meta: "Effective Date: 01 January 2026 · Last Updated: 01 April 2026 · Shivlam IT Services",
    intro:
      "By accessing or using Shivlam's services — including our website, mobile apps, and any delivered software — you agree to the following terms. Please read them. They are written plainly and honestly.",
    points: [
      {
        num: "01",
        title: "Acceptance of Terms",
        body: [
          "By engaging Shivlam for any service — app development, web development, game development, brand building, or SEO — you confirm that you have read, understood, and agreed to these terms. If you do not agree, please do not use our services.",
        ],
      },
      {
        num: "02",
        title: "Services Provided",
        body: [
          "Shivlam provides iOS app development, Android app development, Flutter development, web design and development, Unity game development, AR/BIM solutions, SEO, and brand building services. The specific scope of work for each engagement is defined in a separate project agreement or proposal document.",
        ],
      },
      {
        num: "03",
        title: "Project Agreements & Scope",
        body: [
          "All projects are governed by a written scope of work agreed upon before work begins. Any changes to the project scope — including new features, design revisions beyond the agreed rounds, or platform additions — will be treated as change requests and may be subject to additional time and cost.",
        ],
      },
      {
        num: "04",
        title: "Payment Terms",
        body: [
          "Payment schedules are outlined in individual project proposals. Typically, projects require a deposit before work begins, with milestone-based payments throughout. Shivlam reserves the right to pause work on any project where payment milestones are overdue by more than 14 days.",
        ],
      },
      {
        num: "05",
        title: "Intellectual Property",
        body: [
          "Upon receipt of full payment, all custom-developed code, designs, and deliverables created specifically for your project become your property. Shivlam retains ownership of any pre-existing frameworks, tools, or reusable components used in the build. We may display completed projects in our portfolio unless otherwise agreed in writing.",
        ],
      },
      {
        num: "06",
        title: "Confidentiality",
        body: [
          "Shivlam treats all client information, business requirements, and project details as confidential. We do not share your project information, business data, or proprietary materials with any third party without your explicit written consent, except where required by law.",
        ],
      },
      {
        num: "07",
        title: "Warranties & Limitations",
        body: [
          "Shivlam warrants that work will be delivered with professional care and skill. However, we do not guarantee specific business outcomes — such as app store rankings, download numbers, or SEO positions. All software is delivered as-is after testing, and post-delivery bug fixes are covered for a period specified in the project agreement.",
        ],
      },
      {
        num: "08",
        title: "Third-Party Services",
        body: [
          "Some projects may involve third-party platforms, APIs, or services (e.g. Firebase, Apple App Store, Google Play, AWS). Shivlam is not responsible for changes, outages, or policy updates by these third parties. Costs related to third-party services — such as hosting or API fees — are the client's responsibility unless otherwise agreed.",
        ],
      },
      {
        num: "09",
        title: "Termination",
        body: [
          "Either party may terminate a project engagement with 14 days written notice. In the event of termination, the client is responsible for payment of all work completed up to the termination date. Deposits are non-refundable once work has commenced.",
        ],
      },
      {
        num: "10",
        title: "Governing Law",
        body: [
          "These terms are governed by the laws of India, with jurisdiction in Ahmedabad, Gujarat. Any disputes will first be attempted to be resolved through direct communication. If unresolved, disputes will be subject to arbitration under Indian law. For any questions regarding these terms, contact us at ",
          { type: "mailto", email: "hi@shivlam.com" },
          ".",
        ],
      },
    ],
    strip: {
      eyebrow: "Questions about these terms?",
      body: "We're happy to clarify anything before you engage with us.",
      href: "mailto:hi@shivlam.com",
      label: "hi@shivlam.com →",
    },
  },
  {
    key: "privacy",
    tabLabel: "Privacy Policy",
    label: "Legal Document",
    title: { before: "Privacy ", highlight: "Policy" },
    meta: "Effective Date: 01 January 2026 · Last Updated: 01 April 2026 · Shivlam IT Services",
    intro:
      "Shivlam respects your privacy. This policy explains what information we collect, why we collect it, and how we use it. We keep it short because we believe privacy policies should be readable.",
    points: [
      {
        num: "01",
        title: "Information We Collect",
        body: [
          "We collect information you provide directly — such as your name, email address, and project details when you contact us through our website or email. We do not collect information without your knowledge or consent.",
        ],
      },
      {
        num: "02",
        title: "How We Use Your Information",
        body: [
          "Information you provide is used solely to respond to your enquiries, deliver agreed services, send project updates, and improve how we communicate with you. We do not use your personal data for advertising or profiling.",
        ],
      },
      {
        num: "03",
        title: "Website Analytics",
        body: [
          "Our website may use basic analytics tools to understand how visitors interact with our pages — such as which pages are viewed most. This data is aggregated and anonymous. We do not track individual users across the web.",
        ],
      },
      {
        num: "04",
        title: "Cookies",
        body: [
          "Our website uses minimal cookies — only those necessary for the website to function correctly. We do not use advertising cookies or cross-site tracking cookies. You can disable cookies in your browser settings at any time without affecting your ability to view our content.",
        ],
      },
      {
        num: "05",
        title: "Data Sharing",
        body: [
          "We do not sell, rent, or trade your personal information to any third party. We may share information with trusted service providers who assist in operating our business (e.g. email hosting) — but only under strict confidentiality agreements. We will disclose data if required by law.",
        ],
      },
      {
        num: "06",
        title: "Data Storage & Security",
        body: [
          "Client data and project files are stored securely. We use industry-standard practices to protect information from unauthorised access. Project files are retained for the duration of the engagement and a reasonable period after, then securely deleted or archived.",
        ],
      },
      {
        num: "07",
        title: "Apps We Build — Your Users' Data",
        body: [
          "For apps we develop on your behalf, you — the client — are the data controller for your users' data. Shivlam implements privacy best practices during development, including minimal data collection, secure storage, and clear in-app disclosures. The final privacy obligations to your users are yours as the app owner.",
        ],
      },
      {
        num: "08",
        title: "Children's Privacy",
        body: [
          "Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at ",
          { type: "mailto", email: "hi@shivlam.com" },
          " and we will delete it promptly.",
        ],
      },
      {
        num: "09",
        title: "Your Rights",
        body: [
          "You have the right to request access to personal data we hold about you, ask us to correct any inaccuracies, or request deletion of your data. To make any such request, contact us at ",
          { type: "mailto", email: "hi@shivlam.com" },
          ". We will respond within 30 days.",
        ],
      },
      {
        num: "10",
        title: "Changes to This Policy",
        body: [
          'We may update this Privacy Policy from time to time. When we do, the "Last Updated" date at the top of this page will change. We encourage you to review this policy periodically. Continued use of our services after any change constitutes acceptance of the updated policy.',
        ],
      },
    ],
    strip: {
      eyebrow: "Privacy questions or data requests?",
      body: "We respond to all privacy enquiries within 30 days.",
      href: "mailto:hi@shivlam.com",
      label: "hi@shivlam.com →",
    },
  },
] as const;

