/**
 * All copy below is taken from https://soracare.io/ (home, about-us, partnership,
 * states, contact-us, terms-conditions and privacy-policy pages).
 * Only the presentation is new — keep wording in sync with the source site.
 */

export const PHONE_DISPLAY = "302-335-6779";
export const PHONE_HREF = "tel:3023356779";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Partnership", href: "/partnership" },
  { label: "States", href: "/states" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export const HERO = {
  title: "Family & Friend Caregivers Who Want",
  titleEmphasis: "Clarity, Structure, and Stability",
  body: "We help family and friend caregivers navigate programs that may pay them for caregiving with support from our dedicated specialists.",
  cta: "See if you qualify",
  chips: ["Clear steps", "Accurate documents", "Ongoing support"],
};

export const WHAT_WE_DO = {
  eyebrow: "What we do",
  lead: "If you’re caring for a parent, spouse, child, or friend, you’re doing meaningful work often without pay and without a clear roadmap.",
  before: "Some Medicaid long-term care programs may allow ",
  highlight: "family members or trusted friends",
  after:
    " to be compensated for providing daily care at home. We help you navigate those programs with a structured, supportive process that makes things easier to understand and easier to complete.",
  closing: "You focus on care. We help you move the process forward accurately and confidently.",
};

export const WHY = {
  eyebrow: "Why families choose us",
  title: "Built for family & friend caregivers, not bureaucracy",
  items: [
    {
      key: "specialist",
      lead: "One dedicated",
      strong: "specialist",
      tail: "who stays with you (no call center, no repeating your story)",
    },
    {
      key: "steps",
      lead: "Step-by-step",
      strong: "guidance",
      tail: "so you always know what’s next",
    },
    {
      key: "paperwork",
      lead: "Paperwork support",
      strong: "focused on accuracy",
      tail: "to reduce avoidable delays",
    },
    {
      key: "assessment",
      lead: "Assessment & follow-up",
      strong: "support",
      tail: "so you don’t feel alone during reviews",
    },
    {
      key: "approval",
      lead: "Ongoing support after",
      strong: "approval",
      tail: "to help prevent disruptions when things change",
    },
  ],
};

export const WHO = {
  eyebrow: "Who we support",
  title: "Caring is Personal",
  subtitle: "The process Should not be Confusing",
  body: "Whether you’re just exploring options or already in the middle of the process, we help reduce overwhelm and bring order to a complex system.",
  closing: "Start to finish. One specialist. No guesswork",
  items: [
    {
      tab: "Guidance",
      title: "Clear guidance + emotional support",
      body: "Compassionate, structured guidance through long-term care and Medicaid requirements, so you feel informed and supported, not stressed and unsure.",
    },
    {
      tab: "Consistency",
      title: "Consistent, dedicated support",
      body: "A single specialist learns your situation and stays engaged throughout the journey, so you don’t have to repeat yourself or navigate alone.",
    },
    {
      tab: "Paid pathways",
      title: "Help accessing paid caregiver pathways",
      body: "We guide you through state programs that may allow a family member or friend to be paid for providing care, based on your state’s rules and eligibility.",
    },
    {
      tab: "Less stress",
      title: "Reduced stress & fewer avoidable mistakes",
      body: "Better preparation helps prevent common problems like incomplete forms, missing documents, and missed follow-ups.",
    },
    {
      tab: "After approval",
      title: "End-to-end support, even after approval",
      body: "After enrollment, we help you understand ongoing requirements and respond to changes, so benefits are less likely to be interrupted.",
    },
  ],
};

export const STEPS = {
  eyebrow: "How it works",
  items: [
    {
      n: "01",
      title: "Tell us your situation",
      body: "We learn who needs care, where you live, and your support needs, then match you to the right program.",
    },
    {
      n: "02",
      title: "We prepare everything together",
      body: "We give you a checklist and help you gather the right documents so nothing gets delayed.",
    },
    {
      n: "03",
      title: "We handle the back-and-forth",
      body: "We stay with you through calls, reviews, and requests so you always know what’s next.",
    },
    {
      n: "04",
      title: "We support you after approval",
      body: "We help you stay compliant and respond to changes so benefits don’t get interrupted.",
    },
  ],
};

export const STATES = {
  eyebrow: "Programs & states we support",
  intro: "We help family & friend caregivers navigate programs in:",
  helpTitle: "Not sure which applies?",
  helpBody: "We’ll help you find the right path.",
  items: [
    { state: "Michigan", abbr: "MI", program: "Home Help" },
    { state: "Missouri", abbr: "MO", program: "Consumer Directed Services (CDS)" },
    { state: "Arizona", abbr: "AZ", program: "ALTCS" },
    { state: "South Dakota", abbr: "SD", program: "In Home Care / Structured Family Caregiving" },
  ],
  cardLine: "We’ll help you find the right path.",
  cardCta: "Read More",
};

export const FAQ = {
  eyebrow: "FAQ",
  items: [
    {
      q: "Can a family member or friend really get paid for caregiving?",
      a: "Yes. Many state programs allow caregiver compensation, but rules vary by state, program type, relationship, living arrangement, and eligibility. We help you understand what’s possible in your state and how to pursue the right pathway.",
    },
    {
      q: "Do you guarantee approval or payment?",
      a: "No. Eligibility, approval, and caregiver compensation are determined by the state. Our role is to support you with accurate preparation, clear steps, and follow-through—so the process is less stressful and less error-prone.",
    },
    {
      q: "We’ve already started. can you still help?",
      a: "Yes. We can step in mid-process to help organize documentation, address gaps, and support assessments and follow-ups.",
    },
  ],
};

export const FINAL_CTA = {
  title: "Get Enrolled Today",
  cta: "See if you qualify",
  disclaimerLead: "We provide guidance and administrative support.",
  disclaimer: "We are not a government agency and do not make eligibility determinations.",
};

export const FOOTER = {
  copyright: `${new Date().getFullYear()} © Sora Care. All Rights Reserved.`,
  legal: [
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Linkedin", href: "#" },
  ],
};

export const FORM = {
  title: "See if you qualify",
  fields: {
    first: "First name",
    last: "Last name",
    phone: "Phone number",
    email: "Email",
    message: "Message",
  },
  submit: "Submit",
};
