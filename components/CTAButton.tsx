import Link from "next/link";
import { clsx } from "clsx";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all",
        {
          "bg-primary text-black hover:bg-primary-dark": variant === "primary",
          "bg-secondary text-white hover:bg-secondary-dark":
            variant === "secondary",
          "border border-white/20 bg-white/5 text-white hover:bg-white/10":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </Link>
  );
}




















































































































































































































