import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-white/10 text-white/90": variant === "default",
          "bg-primary/20 text-primary": variant === "primary",
          "bg-secondary/20 text-secondary": variant === "secondary",
        },
        className
      )}
    >
      {children}
    </span>
  );
}




















































































































































































































