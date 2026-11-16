import type { Metadata } from "next";
import { LegalPage } from "../_components/Legal";
import { PRIVACY } from "../_lib/pages";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <LegalPage title={PRIVACY.title} sections={PRIVACY.sections} />;
}
