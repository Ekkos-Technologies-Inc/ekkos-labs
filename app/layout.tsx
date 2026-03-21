import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ekkOS_Labs | Researching the Cognitive Substrate for Intelligent Agents",
  description:
    "ekkOS_Labs drives the underlying cognitive research for ekkOS—a production-grade memory substrate evolving into a complete cognitive core for AGI-level agents. Born from LLMs. Built for the future of intelligence.",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    "AI research",
    "cognitive infrastructure",
    "AGI substrate",
    "memory systems",
    "pattern evolution",
    "meta-learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
