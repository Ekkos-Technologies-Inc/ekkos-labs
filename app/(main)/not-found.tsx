import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
          <p className="mb-8 text-lg text-white/70">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-primary-dark"
          >
            Return Home
          </Link>
        </div>
      </PageContainer>
    </Section>
  );
}

