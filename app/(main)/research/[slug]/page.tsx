import { notFound } from "next/navigation";
import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { getResearchArticle } from "@/lib/research";
import { renderMarkdown } from "@/lib/markdown";

interface ResearchDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResearchDetailPage({
  params,
}: ResearchDetailPageProps) {
  const { slug } = await params;
  const article = getResearchArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <Section>
      <PageContainer>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="primary">{article.category}</Badge>
              <Badge
                variant={article.status === "Published" ? "secondary" : "default"}
              >
                {article.status}
              </Badge>
              <span className="text-sm text-white/60">{article.date}</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white lg:text-5xl">
              {article.title}
            </h1>
            {article.authors && (
              <p className="text-white/70">
                <span className="font-medium">Authors:</span>{" "}
                {article.authors.join(", ")}
              </p>
            )}
          </div>

          {/* Abstract */}
          <div className="mb-12 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Abstract</h2>
            <p className="leading-relaxed text-white/80">{article.abstract}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {renderMarkdown(article.content)}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}




















































































































































































































