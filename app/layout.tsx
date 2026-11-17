import type { Metadata } from "next";
import { Figtree, Outfit } from "next/font/google";
import { Footer } from "./_components/Sections";
import { Header } from "./_components/Header";
import { QualifyProvider } from "./_components/Qualify";
import "./globals.css";
import "./site.css";

const display = Outfit({
  variable: "--s2-display",
  subsets: ["latin"],
});

const body = Figtree({
  variable: "--s2-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sora Care — Family & Friend Caregivers Who Want Clarity, Structure, and Stability",
    template: "%s — Sora Care",
  },
  description:
    "We help family and friend caregivers navigate programs that may pay them for caregiving with support from our dedicated specialists.",
  icons: { icon: "/brand/logo-small.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} data-scroll-behavior="smooth">
      <body>
        <noscript>
          <style>{`.s2 .reveal,.s2 .s2-rise,.s2 .s2-chip,.s2 .s2-pop{opacity:1!important;transform:none!important;animation:none!important}.s2 [data-w]{opacity:1!important}.s2 .s2-a{opacity:1!important;transform:none!important}.s2 .reveal img{transform:none!important}`}</style>
        </noscript>
        <div className="s2">
          <QualifyProvider image="/site/popup-see-if-you-qualify.jpg">
            <Header />
            {children}
            <Footer />
          </QualifyProvider>
        </div>
      </body>
    </html>
  );
}
