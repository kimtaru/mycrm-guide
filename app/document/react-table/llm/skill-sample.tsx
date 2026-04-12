"use client";

import { useState } from "react";
import { REACT_TABLE_LLM_GUIDE_PARTS } from "./guide-parts";

type LlmGuideLang = "ko" | "en";

function buildSampleText(lang: LlmGuideLang) {
  if (lang === "en") {
    const endpointLines = REACT_TABLE_LLM_GUIDE_PARTS
      .map(
        (part) =>
          `- ${part.titleEn}: ${part.hintEn}\ncurl https://mycrm.co.kr/document/react-table/${part.partSlug}-llm-guide-en.md`,
      )
      .join("\n");

    return `Handle the user's react-table request below.
Before writing code, inspect the appropriate guides by calling the relevant curl endpoints from the provided list.

{request_text}

Guide endpoints
${endpointLines}`;
  }

  const endpointLines = REACT_TABLE_LLM_GUIDE_PARTS
    .map(
      (part) =>
        `- ${part.titleKo}: ${part.hintKo}\ncurl https://mycrm.co.kr/document/react-table/${part.partSlug}-llm-guide.md`,
    )
    .join("\n");

  return `아래의 react-table 관련 사용자 요청을 수행하라.
코드를 작성하기 전에 필요한 가이드는 제공된 엔드포인트 리스트 중 적절한 것을 호출(curl)해서 먼저 열람하라.

{request_text}

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
            ? "You can assign the sample below as a Skill or Command and reuse it directly. The agent should read the relevant guides from the endpoint list before writing code."
            : "아래 샘플을 Skill / Command로 지정해 바로 재사용할 수 있습니다. 에이전트는 코드를 작성하기 전에 엔드포인트 목록 중 필요한 가이드를 먼저 읽고 작업합니다."}
        </p>

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
