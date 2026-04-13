"use client";

import { useState } from "react";
import { REACT_TABLE_LLM_GUIDE_PARTS } from "./guide-parts";

type LlmGuideLang = "ko" | "en";

function buildSampleText(lang: LlmGuideLang) {
  if (lang === "en") {
    const endpointLines = REACT_TABLE_LLM_GUIDE_PARTS
      .map(
        (part) =>
          `- ${part.titleEn}: ${part.hintEn}\ncurl https://www.mycrm-ui.com/document/react-table/${part.partSlug}-llm-guide-en.md`,
      )
      .join("\n");

    return `Treat the user's text that follows the skill invocation as the actual react-table request.
Before writing code, inspect the appropriate guides by calling the relevant curl endpoints from the provided list.

Guide endpoints
${endpointLines}`;
  }

  const endpointLines = REACT_TABLE_LLM_GUIDE_PARTS
    .map(
      (part) =>
        `- ${part.titleKo}: ${part.hintKo}\ncurl https://www.mycrm-ui.com/document/react-table/${part.partSlug}-llm-guide.md`,
    )
    .join("\n");

  return `스킬 호출 뒤에 이어지는 사용자 문장을 실제 react-table 요청으로 간주하라.
코드를 작성하기 전에 필요한 가이드는 제공된 엔드포인트 리스트 중 적절한 것을 호출(curl)해서 먼저 열람하라.

가이드 엔드포인트
${endpointLines}`;
}

export default function ReactTableLlmSkillSample({
  lang,
}: {
  lang: LlmGuideLang;
}) {
  const [copied, setCopied] = useState(false);
  const sampleText = buildSampleText(lang);

  async function handleCopy() {
    await navigator.clipboard.writeText(sampleText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container-lowest shadow-sm">
      <div className="border-b border-outline-variant/15 bg-surface-container-low px-6 py-4">
        <span className="rounded-full bg-tertiary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
          Skill Sample
        </span>
      </div>

      <div className="space-y-5 px-6 py-6">
        <p className="leading-7 text-on-surface-variant">
          {lang === "en"
            ? "You can register the sample below as a Skill, Command, or reusable instruction block. The exact invocation syntax depends on the agent, but the core idea is the same: pass the user's real react-table request together with this prompt so the agent reads the relevant guides first."
            : "아래 샘플은 Skill, Command, 또는 재사용 가능한 지침 블록으로 등록해 사용할 수 있습니다. 정확한 호출 문법은 에이전트마다 다르지만, 핵심은 동일합니다. 실제 react-table 요청을 이 프롬프트와 함께 전달해 에이전트가 필요한 가이드를 먼저 읽도록 하면 됩니다."}
        </p>

        <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-5 py-4">
          <p className="text-sm font-semibold text-on-surface">
            {lang === "en" ? "Usage idea" : "사용 개념"}
          </p>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            {lang === "en"
              ? "Register this prompt in the way your agent supports, then provide the user's request together with it. Some tools may support a command-style invocation, while others may use saved prompts or instruction files."
              : "사용 중인 에이전트가 지원하는 방식으로 이 프롬프트를 등록한 뒤, 실제 사용자 요청을 함께 전달하세요. 어떤 도구는 커맨드 형태 호출을 지원하고, 어떤 도구는 저장된 프롬프트나 지침 파일 형태를 사용합니다."}
          </p>
          <p className="mt-3 text-xs leading-5 text-on-surface-variant/80">
            {lang === "en"
              ? "One possible command-style example:"
              : "가능한 커맨드형 호출 예시:"}
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-outline-variant/15 bg-[#111827] shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
            <div className="flex items-center justify-between border-b border-white/8 bg-white/5 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[11px] text-slate-300">
                {lang === "en" ? "example" : "example"}
              </span>
            </div>
            <div className="overflow-x-auto px-4 py-4 font-mono text-sm leading-7 text-slate-100">
              <div className="flex min-w-max items-start gap-3">
                <span className="select-none text-emerald-400">workspace</span>
                <span className="select-none text-slate-500">%</span>
                <code className="whitespace-pre-wrap break-keep text-slate-50">
                  {lang === "en"
                    ? "$make-table Add checkbox selection and multi-sort to the customer table"
                    : "$make-table 고객 테이블에 체크박스 선택과 멀티 정렬을 추가해줘"}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={lang === "en" ? "Copy skill sample" : "스킬 샘플 복사"}
            title={copied ? (lang === "en" ? "Copied" : "복사됨") : (lang === "en" ? "Copy" : "복사")}
            className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-sm text-inverse-on-surface/70 transition-colors hover:text-inverse-on-surface"
          >
            <span className="material-symbols-outlined text-[13px]">
              {copied ? "check" : "content_copy"}
            </span>
          </button>
          <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-5 pr-16 font-mono text-sm text-inverse-on-surface shadow-sm">
            <code>{sampleText}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
