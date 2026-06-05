import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "../../../lib/metadata";
import MarkdownViewer from "../../markdown-viewer";

export const metadata: Metadata = createPageMetadata({
  title: "@mycrm-ui/core 제공 기능 전체보기 - mycrm UI",
  description:
    "@mycrm-ui/core가 제공하는 타입, 에러, 유틸리티 함수, 포맷터 전체 목록과 사용 예시입니다.",
  pathname: "/document/core/features",
});

export default async function CoreFeaturesPage() {
  const markdownPath = path.join(
    process.cwd(),
    "public",
    "document",
    "core",
    "features.md",
  );
  const markdown = await readFile(markdownPath, "utf8");

  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-4xl">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              MD Viewer
            </span>
            <span className="rounded-full bg-tertiary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tertiary">
              @mycrm-ui/core
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            제공 기능 전체보기
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            core 패키지에서 export하는 타입, 에러, 유틸리티 함수, 포맷터 전체를
            Markdown 원문 기준으로 정리한 문서입니다.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/document/core"
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              core 소개로 이동
            </Link>
            <a
              href="/document/core/features.md"
              className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
            >
              원본 MD 열기
            </a>
          </div>
        </header>

        <MarkdownViewer markdown={markdown} />
      </div>
    </main>
  );
}
