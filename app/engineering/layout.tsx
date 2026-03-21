import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Deep Dive | ekkOS — Cognitive Memory Architecture",
  description:
    "Technical walkthrough of ekkOS: an 11-layer cognitive architecture with 372 tables, 185 API functions, and 77% token cost reduction. Built by Seann MacDougall.",
};

export default function EngineeringLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {children}
    </div>
  );
}
