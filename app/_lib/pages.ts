/**
 * Copy for the inner pages, taken from https://soracare.io/
 * (about-us, partnership, states, contact-us, terms-conditions, privacy-policy).
 * Team portraits come straight from the live site (public/team/*).
 */

export const EMAIL = "daniel@caringpays.io";

/* ───────────── about us ───────────── */

export const ABOUT = {
  eyebrow: "About Sora Care",
  title: "Support for family and friend caregivers—so care at home doesn’t stall.",
  body: [
    "Sora Care helps families navigate Medicaid long-term care programs when a loved one needs help at home and a family member or trusted friend is already providing care. When eligible, these programs may allow that caregiver to be paid for the care they provide.",
    "We provide clear steps, accurate documentation support, and one dedicated specialist from start to finish—so families feel confident and supported.",
  ],
  friction: {
    title: "Built to Reduce Friction in the Care System",
    body: [
      "Care teams are managing growing caseloads, and families are often left to navigate complex Medicaid processes with limited guidance. Many eligible families face delays—not because support doesn’t exist, but because the path to access it is fragmented and easy to get wrong.",
      "Sora Care was created to close that gap. We help families understand their options, complete required steps accurately, and coordinate with partners and public programs—so care doesn’t fall apart due to confusion or missed details.",
    ],
  },
  operate: {
    title: "Where We Operate",
    intro: "We currently support family and friend caregiver pathways in:",
    items: [
      { state: "Arizona", program: "ALTCS" },
      { state: "Indiana", program: "Family & friend caregiver support" },
      { state: "Missouri", program: "Consumer Directed Services (CDS)" },
      { state: "South Dakota", program: "In Home Care / Structured Family Caregiving" },
      { state: "Michigan", program: "Home Help" },
    ],
  },
  team: {
    title: "We support caregivers with clarity and guidance through challenges.",
    body: "Whether you’re just starting to explore your options or are deep into the caregiving journey, our team is committed to simplifying the process. We aim to alleviate your stress and create a sense of order in what can often feel like a chaotic system.",
    // Roles are the ones shown on the Sora Care LinkedIn page.
    // `photo` is optional: members without one get a profile icon until a picture is supplied.
    // `pos` is the object-position used when cropping the portrait to a circle.
    members: [
      { name: "Daniel Morris", role: "Founder", photo: "/team/daniel.jpg" },
      { name: "Hilary Dionne", role: "COO", photo: "/team/hilary.jpg" },
      { name: "Kelsey Ryan", role: "Head of Activation", photo: "/team/kelsey.jpg" },
      { name: "Dan Nguyen", role: "Senior Director of Operations", photo: "/team/dan.jpg" },
      { name: "Dylan Ashby", role: "Engineering Leader", photo: "/team/dylan.jpeg" },
      { name: "Jonathan Fenske", role: "Senior Software Engineer", photo: "/team/jonathan.jpg", pos: "50% 40%" },
      { name: "Morgan Morreale", role: "Customer Success", photo: "/team/morgan.jpg" },
      { name: "Ja’Raya Houston", role: "Customer Success", photo: "/team/jaraya.jpg", pos: "50% 36%" },
      { name: "Hayley Grice", role: "Operations Associate", photo: "/team/hayley.jpg", pos: "50% 30%" },
      { name: "Farah Hirth", role: "Head of Growth Engineering, AI, and Automation", photo: "/team/farah.jpg" },
    ] as { name: string; role?: string; photo?: string; pos?: string }[],
  },
  closing: {
    title: "If you’re providing care for someone you love — or supporting a client — Sora Care can help.",
    disclaimerLead: "We provide guidance and administrative support.",
    disclaimer: "We are not a government agency and do not make eligibility determinations.",
  },
};

/* ───────────── partnership ───────────── */

export const PARTNERSHIP = {
  eyebrow: "Partnership",
  title: "A reliable partner for family & friend caregiver pathways",
  body: [
    "When a client wants to remain at home—and a family member or trusted friend is already providing care—our team helps turn that situation into a structured, Medicaid-supported plan when eligible.",
    "We guide families through the enrollment, documentation, assessments, and ongoing requirements of state programs that may allow family/friend caregivers to be compensated for providing care at home.",
  ],
  partnersGet:
    "What partners get: a dependable “handoff” option that reduces administrative burden, supports safe transitions, and gives families a clear plan.",
  fit: {
    title: "When we’re a good fit",
    intro: "We work closely with professionals who support older adults and people with disabilities, including:",
    professionals: [
      "Elder law attorneys",
      "Medicaid planners and benefits advisors",
      "Hospital discharge planners and care transition teams",
      "Social workers and case managers",
      "Community organizations and advocacy groups",
    ],
    note: "If your client is overwhelmed by Medicaid long-term care pathways—or a discharge plan depends on stable caregiving at home—our model is designed to help.",
    referTitle: "Refer clients to us when:",
    referWhen: [
      "A family member or trusted friend is already providing most of the day-to-day care",
      "The family needs help understanding the right program pathway (state-specific)",
      "Paperwork, follow-ups, or assessments are likely to slow things down",
      "A safe discharge or long-term home plan depends on predictable support",
      "The caregiver needs clearer guidance, structure, and ongoing support—not just a phone number",
    ],
    notFit:
      "Not a fit: situations requiring 24/7 agency staffing, unsafe home environments without support, or clients who need legal advice (we don’t provide legal counsel).",
  },
  whatWeDo: {
    title: "What we do",
    lead: "Our support typically includes:",
    items: [
      "Intake and program alignment (state/program fit)",
      "Caregiver and care recipient onboarding support",
      "Step-by-step documentation guidance and checklisting",
      "Coordination through assessments, state requests, and follow-ups",
      "Education on ongoing requirements after approval",
      "Ongoing support to reduce disruptions when circumstances change",
    ],
    closing: "We provide a single point of contact who stays with the family from start to finish.",
    helpsTitle: "How this helps partners:",
    helps: [
      "fewer “where do I even start?” calls back to your office",
      "cleaner documentation and fewer missed steps",
      "more stable home-care plans that are easier to sustain",
    ],
  },
  referrals: {
    title: "How referrals work",
    lead: "We’ve built this to be simple for busy professionals.",
    updates:
      "Partner updates: With appropriate consent, we can provide milestone updates (intake complete, documents submitted, assessment scheduled, approval status, etc.).",
    steps: [
      {
        n: "01",
        title: "Quick referral",
        body: "Send us the client’s name + best contact info (and any timing needs, like “discharge in 5 days”).",
      },
      {
        n: "02",
        title: "Family-friendly intake",
        body: "We reach out, explain the pathway in plain language, and begin structured intake and program matching.",
      },
      {
        n: "03",
        title: "Documentation + follow-through",
        body: "We guide the family through what’s needed, stay engaged through assessments and requests, and keep the process moving.",
      },
      {
        n: "04",
        title: "Ongoing support (after approval)",
        body: "We help families understand requirements and respond to changes so support remains stable.",
      },
    ],
  },
  boundaries: {
    title: "Communication, privacy, and boundaries",
    lead: "We’re used to working alongside legal, clinical, and social service teams.",
    items: [
      "We obtain appropriate releases/consents when coordinating updates",
      "We communicate clearly and document next steps",
      "We stay in our lane: we provide program guidance and administrative support—not legal advice",
      "When legal strategy is needed (spend-down, trusts, appeals, planning), we encourage the client to work with an attorney/Medicaid planner",
    ],
  },
  paid: {
    title: "How we’re paid",
    lead: "In plain terms:",
    items: [
      "Medicaid (through the specific state program) issues payment based on approved services/structures",
      "Most of the funds go to the family/friend caregiver as compensation for providing care",
      "We retain a portion as an administrative/support margin to cover the work required to make the program run smoothly—intake, documentation guidance, compliance support, coordination, and ongoing requirements",
    ],
    body: "Our services are funded through Medicaid-supported programs (when the individual is eligible and approved). We’re compensated as part of the program’s allowed payments, and we use those funds to support the caregiving arrangement.",
    notesTitle: "Important notes (for partners):",
    notes: [
      "We do not pay for referrals",
      "Payment structure can vary by state/program, but our model is consistent: caregiver-first payout + program support and oversight",
    ],
  },
  why: {
    title: "Why partners choose us",
    items: [
      {
        title: "Caregiver-first focus",
        body: "built specifically for family & friend caregivers",
        icon: "/partnership/partnership-caregiver-icon.svg",
      },
      {
        title: "Reduced partner burden",
        body: "fewer back-and-forth questions and stalled cases",
        icon: "/partnership/partnership-reduced-icon.svg",
      },
      {
        title: "Process reliability",
        body: "organized, step-by-step guidance and follow-through",
        icon: "/partnership/partnership-reliability-icon.svg",
      },
      {
        title: "One point of contact",
        body: "easier coordination for professionals and families",
        icon: "/partnership/partnership-contact-icon.svg",
      },
      {
        title: "Stability after approval",
        body: "ongoing support to reduce benefit disruptions",
        icon: "/partnership/partnership-stability-icon.svg",
      },
    ],
  },
  refer: {
    title: "Refer a client",
    lead: "In plain terms:",
    items: [
      "Client name, phone/email, county/state",
      "Care setting (home, discharge pending, current supports)",
      "Who the caregiver is (family/friend) and the relationship",
      "Any deadlines (e.g., discharge date)",
    ],
    actions: [
      {
        label: "Refer a client",
        title: "Refer a client",
        image: "/partnership/popup-refer-a-client-image.jpg",
        channel: "email" as const,
      },
      {
        label: "Schedule a partner intro",
        title: "Schedule a partner intro",
        image: "/partnership/popup-schedule-a-partner-intro.jpg",
        channel: "email" as const,
      },
      {
        label: "Request partner packet",
        title: "Request partner packet",
        image: "/partnership/popup-request-partner-packet.jpg",
        channel: "email" as const,
      },
    ],
  },
};

/* ───────────── states ───────────── */

export const STATES_PAGE = {
  eyebrow: "States",
  title: "We are currently operating in Michigan, Missouri, South Dakota, and Arizona",
  images: {
    Michigan: "/site/program-state-michigan.jpg",
    Missouri: "/site/program-state-missouri.jpg",
    Arizona: "/site/program-state-arizona.jpg",
    "South Dakota": "/site/program-state-south-dakota.jpg",
  } as Record<string, string>,
};

/* ───────────── contact ───────────── */

export const CONTACT = {
  eyebrow: "Contact Us",
  title: "Contact Us",
  lede: "We would love to speak with you. Feel free to reach out using the below details.",
  call: "Call Us",
  email: "Email Us",
};

/* ───────────── legal ─────────────
 * The live site publishes WordPress’ default privacy template for both pages.
 * It is reproduced here without the “Suggested text:” labels — replace with the
 * real policy copy before launch.
 */

export type LegalSection = { heading: string; paragraphs: string[] };

const LEGAL_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: ["Our website address is: https://soracare.io."],
  },
  {
    heading: "Comments",
    paragraphs: [
      "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.",
      "An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.",
    ],
  },
  {
    heading: "Media",
    paragraphs: [
      "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.",
      "If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.",
      "When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.",
      "If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.",
    ],
  },
  {
    heading: "Embedded content from other websites",
    paragraphs: [
      "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.",
      "These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
    ],
  },
  {
    heading: "Who we share your data with",
    paragraphs: ["If you request a password reset, your IP address will be included in the reset email."],
  },
  {
    heading: "How long we retain your data",
    paragraphs: [
      "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.",
      "For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.",
    ],
  },
  {
    heading: "What rights you have over your data",
    paragraphs: [
      "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
    ],
  },
  {
    heading: "Where your data is sent",
    paragraphs: ["Visitor comments may be checked through an automated spam detection service."],
  },
];

export const TERMS = { title: "Terms & Conditions", sections: LEGAL_SECTIONS };
export const PRIVACY = { title: "Privacy Policy", sections: LEGAL_SECTIONS };
