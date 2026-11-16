"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, PHONE_DISPLAY, PHONE_HREF, WHY } from "../_lib/content";
import { S2Button } from "./Buttons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const first = WHY.items[0];
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div className="s2-strip">
        <span>
          {first.lead} {first.strong} {first.tail}
        </span>
      </div>

      <header className="s2-header" data-scrolled={scrolled || undefined} id="top">
        <div className="s2-wrap s2-header__in">
          <Link href="/" className="s2-logo" aria-label="SoraCare home">
            <Image src="/brand/logo-full.png" alt="SoraCare" width={300} height={44} priority />
          </Link>

          <nav className="s2-links" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.label}
                className="s2-link"
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="s2-header__right">
            <a className="s2-phone" href={PHONE_HREF}>
              <span className="s2-phone__dot" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <S2Button className="s2-header__cta">See if you qualify</S2Button>
            <button
              type="button"
              className="s2-burger"
              aria-expanded={menu}
              aria-controls="s2-sheet"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="s2-sheet" className="s2-sheet" data-open={menu || undefined} aria-hidden={!menu}>
          <div className="s2-wrap">
            {NAV.map((item) => (
              <Link
                key={item.label}
                className="s2-sheet__link"
                href={item.href}
                tabIndex={menu ? 0 : -1}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            <a className="s2-sheet__link s2-sheet__phone" href={PHONE_HREF} tabIndex={menu ? 0 : -1}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
