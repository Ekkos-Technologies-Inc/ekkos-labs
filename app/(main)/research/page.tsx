import { PageContainer } from "@/components/PageContainer";
import { ResearchCard } from "@/components/ResearchCard";
import { Section } from "@/components/Section";
import { getAllResearchArticles } from "@/lib/research";

export default function ResearchPage() {
  const articles = getAllResearchArticles();

  return (
    <Section>
      <PageContainer>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white">Research</h1>
          <p className="mb-2 text-lg text-white/70">
            ekkOS Labs explores the future of AI memory and cognition.
            Research publications are available to partners and collaborators.
          </p>
          <p className="text-base font-medium text-primary">
            Born from LLMs. Built for the future of intelligence.
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <ResearchCard
              key={article.slug}
              title={article.title}
              date={article.date}
              category={article.category}
              status={article.status}
              abstract={article.abstract}
              slug={article.slug}
            />
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}

