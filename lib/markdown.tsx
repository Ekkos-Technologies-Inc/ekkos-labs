// Simple markdown renderer for research articles
import React, { type ReactNode, type JSX } from "react";

export function renderMarkdown(content: string): JSX.Element {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeLanguage = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre
            key={elements.length}
            className="my-4 overflow-x-auto rounded-lg bg-black/40 p-4"
          >
            <code className={`language-${codeLanguage}`}>
              {codeBlockContent.join("\n")}
            </code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
        codeLanguage = "";
      } else {
        // Start code block
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={elements.length} className="mb-4 leading-relaxed text-white/80">
              {renderInlineMarkdown(currentParagraph.join("\n"))}
            </p>
          );
          currentParagraph = [];
        }
        codeLanguage = line.replace("```", "").trim();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Headers
    if (line.startsWith("##")) {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="mb-4 leading-relaxed text-white/80">
            {renderInlineMarkdown(currentParagraph.join("\n"))}
          </p>
        );
        currentParagraph = [];
      }
      const headerText = line.replace(/^##+\s*/, "");
      const level = line.match(/^##+/)?.[0].length || 2;
      const HeaderTag = `h${Math.min(level, 6)}` as keyof React.JSX.IntrinsicElements;
      elements.push(
        <HeaderTag
          key={elements.length}
          className={`mb-4 font-bold text-white ${
            level === 2 ? "text-2xl" : level === 3 ? "text-xl" : "text-lg"
          }`}
        >
          {headerText}
        </HeaderTag>
      );
      continue;
    }

    // Empty line - end paragraph
    if (line.trim() === "") {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="mb-4 leading-relaxed text-white/80">
            {renderInlineMarkdown(currentParagraph.join("\n"))}
          </p>
        );
        currentParagraph = [];
      }
      continue;
    }

    // Lists
    if (line.match(/^[-*]\s/)) {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="mb-4 leading-relaxed text-white/80">
            {renderInlineMarkdown(currentParagraph.join("\n"))}
          </p>
        );
        currentParagraph = [];
      }
      const listItem = line.replace(/^[-*]\s+/, "");
      elements.push(
        <li key={elements.length} className="mb-2 ml-6 list-disc text-white/80">
          {renderInlineMarkdown(listItem)}
        </li>
      );
      continue;
    }

    currentParagraph.push(line);
  }

  // Flush remaining paragraph
  if (currentParagraph.length > 0) {
    elements.push(
      <p key={elements.length} className="mb-4 leading-relaxed text-white/80">
        {renderInlineMarkdown(currentParagraph.join("\n"))}
      </p>
    );
  }

  return <div className="space-y-4">{elements}</div>;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Simple inline markdown: **bold**, `code`
  const parts: (string | React.ReactNode)[] = [];
  let key = 0;

  // Bold
  const boldRegex = /\*\*(.+?)\*\*/g;
  let match;
  let lastIndex = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-semibold text-white">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  if (parts.length === 0) {
    return text;
  }

  return <>{parts}</>;
}
