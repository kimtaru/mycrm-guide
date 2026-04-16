import type { Metadata } from "next";
import Link from "next/link";

import { ArchGridFilterDemo } from "./components/ArchGridFilterDemo";
import SiteFooter from "./components/SiteFooter";
import { createPageMetadata } from "./lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "mycrm | 빛의 속도로 구축하는 CRM",
  description:
    "React를 위한 헤드리스 UI 라이브러리. 데이터 중심 CRM 인터페이스와 AI 네이티브 DX를 위해 설계되었습니다.",
  pathname: "/",
});

type FeatureItem = {
  icon: string;
  iconStyle: string;
  title: string;
  description: string;
};

const FEATURE_ITEMS: FeatureItem[] = [
  {
    icon: "bolt",
    iconStyle: "bg-primary/10 text-primary",
    title: "빠른 CRM 빌드",
    description:
      "데이터가 풍부한 CRM 인터페이스를 위해 특별히 제작된 고성능 컴포넌트입니다. 테이블 컴포넌트를 바로 사용할 수 있습니다.",
  },
  {
    icon: "architecture",
    iconStyle: "bg-secondary/10 text-secondary",
    title: "헤드리스 & 무한한 확장성",
    description:
      "스타일에 대한 제약이 없습니다. 어떤 도메인이나 브랜드 아이덴티티에도 맞게 완벽한 커스텀이 가능합니다. 로직은 저희가, 픽셀은 여러분이 결정하세요.",
  },
  {
    icon: "auto_awesome",
    iconStyle: "bg-tertiary/10 text-tertiary",
    title: "AI 우선 DX (AI 협업)",
    description:
      "LLM에 최적화된 .md 파일을 제공하여 AI와의 원활한 협업과 신속한 프로토타이핑을 가능하게 합니다. 레이아웃 전체를 한 번에 짜 보도록 시도해 보세요.",
  },
];

const AI_POINTS = [
  "높은 LLM 정확도를 위한 시맨틱 HTML 구조",
  "프롬프트 엔지니어링에 최적화된 .md 참조 파일",
  "상용구 코드를 제거하는 Prop 기반 로직",
];

const HEADLESS_DOMAIN_POINTS = [
  "동작·상태는 라이브러리가, 색·간격·타이포는 프로젝트의 CSS·테마가 담당합니다.",
  "TableClassNames로 헤더·셀·행 등 슬롯별 클래스를 넘겨 브랜드 가이드에 맞게 조립할 수 있습니다.",
  "CRM·백오피스·SaaS 등 성격이 다른 서비스에도 같은 API로 테이블 뼈대를 재사용합니다.",
];

function SiteHeader() {
  return (
    <header>
      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/15 bg-surface-container-lowest/80 text-sm font-medium tracking-tight shadow-sm backdrop-blur-md">
        <div className="relative mx-auto flex h-16 max-w-8xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-on-surface">mycrm</span>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
                href="/document"
              >
                문서
              </Link>
              <Link
                className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
                href="/document/react-table#react-table-basic"
              >
                컴포넌트
              </Link>
              {/*
              <Link
                className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
                href="/"
              >
                예시
              </Link>
              */}
            </div>
          </div>
          {/*
          빠른 검색(⌘K) — 추후 복구 시 아래 주석 해제
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-lg border border-outline-variant/20 bg-surface-container-low px-3 py-1.5 md:flex">
              <span className="material-symbols-outlined text-sm text-outline">
                search
              </span>
              <input
                className="w-32 border-none bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-0"
                placeholder="빠른 검색..."
                type="search"
                aria-label="빠른 검색"
              />
              <span className="ml-2 rounded border border-outline-variant/30 bg-surface-container-high px-1.5 py-0.5 font-mono text-[10px] text-outline">
                ⌘K
              </span>
            </div>
          </div>
          */}
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="mb-8 text-6xl font-extrabold leading-[1.1] tracking-tighter text-on-surface md:text-7xl">
            <span className="text-primary">빛의 속도로 구축하는</span> CRM
          </h1>
          <p className="mb-10 max-w-2xl text-xl leading-relaxed text-on-surface-variant">
            React를 위한 헤드리스 UI 라이브러리. 데이터 중심의 CRM 인터페이스
            개발과 AI 네이티브 DX를 위해 설계되었습니다. CSS와 씨름하지 말고
            바로 기능을 구현하세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/document"
              className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-8 py-4 font-semibold text-on-primary shadow-lg transition-all hover:shadow-primary/20 active:scale-95"
            >
              시작하기
            </Link>
            <Link
              href="/document/core#core-types"
              className="rounded-lg bg-surface-container-high px-8 py-4 font-semibold text-on-secondary-container transition-all hover:bg-surface-container-highest active:scale-95"
            >
              문서 보기
            </Link>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-1/2 opacity-10"
        aria-hidden
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURE_ITEMS.map((item) => (
            <article
              key={item.title}
              className="group rounded-xl bg-surface-container-lowest p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${item.iconStyle}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
              <p className="leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-on-surface">
            아키텍처의 힘
          </h2>
          <p className="mx-auto max-w-2xl text-on-surface-variant">
            뼈대 로직에서 프리미엄 인터페이스까지 단 몇 분 만에 완성됩니다.
            비즈니스 툴을 위해 고안된 유연한 아키텍처입니다.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch">
          <div className="flex h-full min-h-[31rem] flex-col overflow-hidden rounded-xl bg-inverse-surface shadow-2xl lg:min-h-[32rem]">
            <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <span className="ml-4 font-mono text-xs text-inverse-on-surface/50">
                App.tsx
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-x-auto p-8 font-mono text-sm leading-relaxed text-inverse-on-surface">
              <div>
                <span className="text-sky-400">import</span>{" "}
                <span className="text-white">{"{ Table }"}</span>{" "}
                <span className="text-sky-400">from</span>{" "}
                <span className="text-emerald-400">
                  &apos;@mycrm-ui/react-table&apos;
                </span>
                ;
              </div>
              <div>
                <span className="text-sky-400">import type</span>{" "}
                <span className="text-white">{"{ ColumnDef }"}</span>{" "}
                <span className="text-sky-400">from</span>{" "}
                <span className="text-emerald-400">
                  &apos;@mycrm-ui/react-table&apos;
                </span>
                ;
              </div>
              <div className="mt-4 text-slate-500">
                // Row 타입 · columns · rows — 도메인에 맞게 정의
              </div>
              <div className="text-slate-500">
                // TableProps: sort / filter / selection … 기능별 객체
              </div>
              <div className="mt-4 text-slate-500">
                {"// const columns: ColumnDef<Row>[] = ["}
              </div>
              <div className="pl-4 text-slate-500">
                {"//   { key: 'name', label: '이름', render: … },"}
              </div>
              <div className="text-slate-500">{"// ];"}</div>
              <div className="mt-4">
                <span className="text-purple-400">export const</span>{" "}
                <span className="text-white">App = () =&gt; (</span>
              </div>
              <div className="pl-4 text-purple-400">&lt;Table</div>
              <div className="pl-8 text-sky-300">
                columns=<span className="text-white">{"{columns}"}</span>
              </div>
              <div className="pl-8 text-sky-300">
                data=<span className="text-white">{"{rows}"}</span>
              </div>
              <div className="pl-8 text-sky-300">
                rowKey=
                <span className="text-white">{"{(r) => r.id}"}</span>
              </div>
              <div className="pl-8 text-sky-300">
                sorting=
                <span className="text-white">{"{ sorting }"}</span>
              </div>
              <div className="pl-8 text-sky-300">
                filter=
                <span className="text-white">{"{ filter }"}</span>
              </div>
              <div className="pl-8 text-sky-300">
                classNames=
                <span className="text-white">{"{ classNames }"}</span>
              </div>
              <div className="pl-4 text-purple-400">/&gt;</div>
              <div className="text-white">);</div>
              <div className="mt-4 text-slate-500">
                // 스크롤·편집·행 동작 등도 같은 패턴으로 props에 연결
              </div>
            </div>
          </div>

          <div className="group relative flex h-full min-h-[31rem] flex-col lg:min-h-[32rem]">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/10" />
            <div className="relative flex min-h-0 flex-1 flex-col rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-2xl">
              <ArchGridFilterDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiDxSection() {
  return (
    <section className="bg-inverse-surface px-6 py-24 text-inverse-on-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="flex-1">
          <div className="mb-8 h-1 w-16 bg-primary" aria-hidden />
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl">
            AI 네이티브 DX
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-inverse-on-surface/70">
            기존의 UI 라이브러리는 중첩된 복잡성 때문에 LLM이 사용하기
            어렵습니다. mycrm은{" "}
            <strong className="text-inverse-on-surface">AI와의 협업</strong>을
            염두에 두고 구축되었습니다. 구조화된 스키마 정의와 시맨틱
            컴포넌트 마커로, LLM·코딩 에이전트가 읽고 확장하기 쉬운 형태를
            지향합니다.
          </p>
          <ul className="mb-10 space-y-4">
            {AI_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/document/react-table/llm"
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 px-6 py-3 transition-colors hover:bg-white/5"
          >
            AI 최적화에 대해 더 알아보기
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="w-full max-w-lg flex-1">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                <span className="material-symbols-outlined text-purple-400">
                  psychology
                </span>
              </div>
              <span className="font-medium text-white/80">AI 어시스턴트</span>
            </div>
            <div className="mb-4 rounded-lg border-l-4 border-primary bg-white/5 p-4 text-sm text-inverse-on-surface/90">
              &quot;@mycrm-ui/react-table의{" "}
              <code className="text-primary-fixed">&lt;Table /&gt;</code>로 리드 목록을
              만들고, 지역·거래 규모 컬럼에 필터를 붙여줘...&quot;
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg border border-primary/30 bg-primary/20 p-4 text-sm text-inverse-on-surface/90">
                &quot;알겠습니다.{" "}
                <code className="text-primary-fixed">ColumnDef</code>로{" "}
                <code className="text-primary-fixed">region</code>,{" "}
                <code className="text-primary-fixed">dealSize</code> 컬럼을 두고{" "}
                <code className="text-primary-fixed">filter</code>와{" "}
                <code className="text-primary-fixed">filterType</code>으로 조건을
                연결하겠습니다. 구현 코드는 다음과 같습니다...&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeadlessDomainSection() {
  return (
    <section className="border-y border-outline-variant/15 bg-surface px-6 py-24 text-on-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="flex-1">
          <div className="mb-8 h-1 w-16 bg-secondary" aria-hidden />
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl">
            헤드리스로, 도메인을 가리지 않습니다
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">
            mycrm-ui는 <strong className="text-on-surface">헤드리스 컴포넌트</strong>
            라이브러리입니다. 화면의 룩앤필을 강제하지 않고 정렬·필터·선택 같은{" "}
            <strong className="text-on-surface">테이블 로직</strong>만 제공하므로,
            영업·운영·내부 툴처럼 성격이 다른 서비스에도 그대로 녹여 넣을 수
            있습니다. 브랜드·레이아웃·디자인 시스템은 전부 앱 쪽에서 입맛대로
            얹으면 됩니다.
          </p>
          <ul className="mb-10 space-y-4">
            {HEADLESS_DOMAIN_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/document/react-table"
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 px-6 py-3 font-medium transition-colors hover:bg-surface-container-high"
          >
            TableClassNames · 테마 맞추기
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="w-full max-w-lg flex-1">
          <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              같은 Table · 다른 서비스
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border-l-4 border-primary bg-surface-container-low px-4 py-3">
                <p className="text-sm font-bold text-on-surface">영업 CRM</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  고객·파이프라인 컬럼, 브랜드 색상의 헤더
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-secondary bg-surface-container-low px-4 py-3">
                <p className="text-sm font-bold text-on-surface">재고·물류 콘솔</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  LOT·창고 컬럼, 밀도 높은 밀집 레이아웃
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-tertiary bg-surface-container-low px-4 py-3">
                <p className="text-sm font-bold text-on-surface">CS·티켓 백오피스</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  상태·담당자 컬럼, 라이트 톤 UI
                </p>
              </div>
            </div>
            <p className="mt-6 text-center font-mono text-[11px] text-on-surface-variant/80">
              @mycrm-ui/react-table — 로직 공유, 스타일은 프로젝트마다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="px-6 py-32 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-5xl font-extrabold tracking-tighter text-on-surface md:text-6xl">
          지금 바로 <span className="text-primary">mycrm</span>으로 시작하세요
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl text-on-surface-variant">
          헤드리스 테이블 로직으로 CRM·운영 화면을 직접 설계해 보세요.
          <br />
          문서와 예제를 따라 설치부터 첫 화면까지 바로 시작할 수 있습니다.
        </p>
        <div className="flex justify-center">
          <Link
            href="/document"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-10 py-5 font-bold text-on-primary shadow-xl transition-all hover:-translate-y-1 hover:bg-primary-container sm:w-auto"
          >
            문서로 시작하기
          </Link>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-outline opacity-60 grayscale transition-all hover:grayscale-0">
          <span>NEXT.JS 지원</span>
          <span>TYPESCRIPT 준비 완료</span>
        </div>
      </div>
    </section>
  );
}

function PageContent() {
  return (
    <main className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <AiDxSection />
      <HeadlessDomainSection />
      <FinalCtaSection />
    </main>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PageContent />
      <SiteFooter className="mt-20" />
    </>
  );
}
