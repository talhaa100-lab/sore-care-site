import type { Metadata } from "next";
import { LegalPage } from "../_components/Legal";
import { TERMS } from "../_lib/pages";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return <LegalPage title={TERMS.title} sections={TERMS.sections} />;
}
