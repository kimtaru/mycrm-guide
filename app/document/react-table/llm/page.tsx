import type { Metadata } from "next";
import Link from "next/link";
import ReactTableLlmSkillSample from "./skill-sample";

type SearchParamsLike =
  | { lang?: string }
  | Promise<{ lang?: string }>
  | undefined;

type LlmGuideLang = "ko" | "en";

function normalizeLang(lang?: string): LlmGuideLang {
  return lang?.toLowerCase() === "en" ? "en" : "ko";
}

async function resolveLang(searchParams?: SearchParamsLike): Promise<LlmGuideLang> {
  if (!searchParams) return "ko";
  const resolved = searchParams instanceof Promise ? await searchParams : searchParams;
  return normalizeLang(resolved.lang);
}

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table Skill Sample",
  description: "@mycrm-ui/react-table LLM skill sample page.",
};

export default async function ReactTableLlmSkillSamplePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(searchParams);

  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-5xl">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              Skill Sample
            </span>
            <div className="flex items-center gap-1">
              <Link
                href="/document/react-table/llm?lang=ko"
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                  lang === "ko"
                    ? "bg-secondary text-white"
                    : "bg-secondary/8 text-secondary hover:bg-secondary/14"
                }`}
              >
                Korean
              </Link>
              <Link
                href="/document/react-table/llm?lang=en"
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-secondary text-white"
                    : "bg-secondary/8 text-secondary hover:bg-secondary/14"
                }`}
              >
                English
              </Link>
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            {lang === "en" ? "React Table Skill Sample" : "React Table 스킬 샘플"}
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            {lang === "en"
              ? "A reusable prompt template for agents that should read the published LLM guide endpoints before building a table."
              : "공개된 LLM Guide 엔드포인트를 먼저 읽고 테이블을 만들도록 유도하는 에이전트용 재사용 프롬프트 템플릿입니다."}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/document/react-table"
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              {lang === "en" ? "Back to react-table docs" : "react-table 문서로 돌아가기"}
            </Link>
          </div>
        </header>

        <ReactTableLlmSkillSample lang={lang} />
      </div>
    </main>
  );
}
