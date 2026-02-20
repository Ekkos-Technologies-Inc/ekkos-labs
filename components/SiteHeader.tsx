"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/ekk0", label: "ekk0" },
  { href: "/sdk", label: "SDK" },
  { href: "/research", label: "Research" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">ekkOS_Labs</span>
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-white/70"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://ekkos.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/70 transition-colors hover:text-primary"
            >
              ekkOS Platform →
            </Link>
          </nav>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <button className="text-white/70">Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
}

