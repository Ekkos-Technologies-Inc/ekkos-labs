import Link from "next/link";
import { Badge } from "./Badge";

interface ResearchCardProps {
  title: string;
  date: string;
  category: string;
  status: "Published" | "In Progress" | "Draft" | "Partner Access";
  abstract: string;
  slug: string;
}

export function ResearchCard({
  title,
  date,
  category,
  status,
  abstract,
  slug,
}: ResearchCardProps) {
  return (
    <Link
      href={`/research/${slug}`}
      className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-primary/50 hover:bg-white/10"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">{category}</Badge>
            <Badge variant={status === "Published" ? "secondary" : "default"}>
              {status}
            </Badge>
            <span className="text-sm text-white/60">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed">{abstract}</p>
      <div className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Read full paper →
      </div>
    </Link>
  );
}




















































































































































































































