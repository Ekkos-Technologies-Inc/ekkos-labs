// Research articles data layer
// Research publications are available to partners and collaborators only

export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: "Published" | "In Progress" | "Draft" | "Partner Access";
  abstract: string;
  content: string;
  authors?: string[];
  tags?: string[];
}

// Research publications are no longer publicly available
// Contact research@ekkos.dev for collaboration opportunities
export const researchArticles: ResearchArticle[] = [];

export function getResearchArticle(slug: string): ResearchArticle | undefined {
  return researchArticles.find((article) => article.slug === slug);
}

export function getAllResearchArticles(): ResearchArticle[] {
  return researchArticles;
}






























































