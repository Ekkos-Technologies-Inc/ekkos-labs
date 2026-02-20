import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white">ekkOS_Labs</h3>
            <p className="mt-2 text-sm text-white/60">
              Researching the cognitive substrate for intelligent agents.
            </p>
            <p className="mt-2 text-xs font-medium text-primary">
              Born from LLMs. Built for the future of intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Research</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/research"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  All Research
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">About</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  About Labs
                </Link>
              </li>
              <li>
                <Link
                  href="https://ekkos.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  ekkOS Platform
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Connect</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://github.com/ekkostech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/w2JGepq9qZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-sm text-white/60">
            © {currentYear} Ekkos Technologies Inc. · ekkOS_Labs
          </p>
        </div>
      </div>
    </footer>
  );
}

