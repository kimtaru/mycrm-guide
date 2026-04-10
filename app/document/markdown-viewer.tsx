import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-[0.9em] text-on-surface"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function parseMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Array<
    | { type: "h1" | "h2" | "h3" | "p"; text: string }
    | { type: "ul" | "ol"; items: string[] }
    | { type: "code"; code: string; lang: string }
  > = [];

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i += 1;

      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }

      blocks.push({ type: "code", code: codeLines.join("\n"), lang });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2).trim() });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      i += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4).trim() });
      i += 1;
      continue;
    }

    if (/^- /.test(trimmed)) {
      const items: string[] = [];

      while (i < lines.length) {
        const next = lines[i].trim();
        if (!/^- /.test(next)) break;
        items.push(next.replace(/^- /, "").trim());
        i += 1;
      }

      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\. /.test(trimmed)) {
      const items: string[] = [];

      while (i < lines.length) {
        const next = lines[i].trim();
        if (!/^\d+\. /.test(next)) break;
        items.push(next.replace(/^\d+\. /, "").trim());
        i += 1;
      }

      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next) break;
      if (next.startsWith("#")) break;
      if (next.startsWith("```")) break;
      if (/^- /.test(next)) break;
      if (/^\d+\. /.test(next)) break;
      paragraphLines.push(next);
      i += 1;
    }

    blocks.push({ type: "p", text: paragraphLines.join(" ") });
  }

  return blocks;
}

export default function MarkdownViewer({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container-lowest shadow-sm">
      <div className="border-b border-outline-variant/15 bg-surface-container-low px-6 py-4">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          MD Viewer
        </span>
      </div>

      <article className="space-y-5 px-6 py-6">
        {blocks.map((block, index) => {
          if (block.type === "h1") {
            return (
              <h1 key={index} className="text-3xl font-extrabold tracking-tight text-on-surface">
                {renderInline(block.text)}
              </h1>
            );
          }

          if (block.type === "h2") {
            return (
              <h2 key={index} className="pt-4 text-2xl font-bold text-on-surface">
                {renderInline(block.text)}
              </h2>
            );
          }

          if (block.type === "h3") {
            return (
              <h3 key={index} className="pt-2 text-lg font-semibold text-on-surface">
                {renderInline(block.text)}
              </h3>
            );
          }

          if (block.type === "p") {
            return (
              <p key={index} className="leading-7 text-on-surface-variant">
                {renderInline(block.text)}
              </p>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 text-on-surface-variant">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "ol") {
            return (
              <ol key={index} className="list-decimal space-y-2 pl-5 text-on-surface-variant">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          }

          if (block.type === "code") {
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-xl bg-inverse-surface p-5 font-mono text-sm text-inverse-on-surface shadow-sm"
              >
                <code data-language={block.lang || undefined}>{block.code}</code>
              </pre>
            );
          }

          return (
            null
          );
        })}
      </article>
    </div>
  );
}
