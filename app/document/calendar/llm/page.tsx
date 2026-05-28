import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "../../../lib/metadata";
import CalendarLlmSkillSample from "./skill-sample";

export const metadata: Metadata = createPageMetadata({
  title: "@mycrm-ui/components Calendar 스킬 샘플 - mycrm UI",
  description:
    "Calendar와 DatePicker LLM 가이드 엔드포인트를 먼저 읽도록 유도하는 스킬 샘플 페이지입니다.",
  pathname: "/document/calendar/llm",
});

export default function CalendarLlmSkillSamplePage() {
  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-5xl">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              Skill Sample
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            Calendar 스킬 샘플
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            공개된 LLM Guide 엔드포인트를 먼저 읽고 Calendar 또는 DatePicker를
            만들도록 유도하는 에이전트용 재사용 프롬프트 템플릿입니다.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/document/calendar"
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              Calendar 문서로 돌아가기
            </Link>
          </div>
        </header>

        <CalendarLlmSkillSample />
      </div>
    </main>
  );
}
