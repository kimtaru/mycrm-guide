import Image from "next/image";
import Link from "next/link";

const DASHBOARD_CHART =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDL5YofR9S8FJ1qXRvxo6Sf0wdRQjj7w5kndC2M1lRpnqcsI3_4O15QcQSIIlti0etA87dBWUJQBXph6RXOVA2_iWSYvz-3Nfz3UEOfoJ8EwkIYHDTQkxug2vtjnoEJQc_TPKtLH9v-RR7scm5vUUCejgX8Z4K0JsnHKJj3gn_RCU3e98Tj2ZaCBL6z53AGwng7CkXLQZeWkVGRz2BELlDdYWkPk9UU4exFrJDuR1_6Ddm6CJVrZIlWK0U_R_WnKlyumu4uEeNTrjYx";

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
      "데이터가 풍부한 CRM 인터페이스를 위해 특별히 제작된 고성능 컴포넌트입니다. 테이블, 칸반 보드, 타임라인 뷰를 즉시 사용할 수 있습니다.",
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
    title: "AI 우선 DX (바이브 코딩)",
    description:
      "LLM에 최적화된 .md 파일을 제공하여 원활한 '바이브 코딩'과 신속한 프로토타이핑을 가능하게 합니다. GPT-4가 레이아웃 전체를 구축하도록 해보세요.",
  },
];

const PARTNER_ITEMS = [
  {
    name: "에이비씨 주식회사",
    type: "엔터프라이즈 계정",
    amount: "₩16,500,000",
    growth: "+12.5%",
    iconStyle: "bg-primary/10 text-primary",
  },
  {
    name: "글로벌 테크",
    type: "전략적 파트너",
    amount: "₩10,800,000",
    growth: "+5.2%",
    iconStyle: "bg-secondary/10 text-secondary",
  },
];

const AI_POINTS = [
  "높은 LLM 정확도를 위한 시맨틱 HTML 구조",
  "프롬프트 엔지니어링에 최적화된 .md 참조 파일",
  "상용구 코드를 제거하는 Prop 기반 로직",
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
                href="/"
              >
                컴포넌트
              </Link>
              <Link
                className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
                href="/"
              >
                예시
              </Link>
            </div>
          </div>
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
            <button
              type="button"
              className="rounded-md p-2 text-on-surface-variant transition-all hover:bg-surface-container-low active:scale-95"
              aria-label="코드"
            >
              <span className="material-symbols-outlined">code</span>
            </button>
          </div>
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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container/30 px-3 py-1 text-xs font-semibold text-on-secondary-container">
            <span className="flex h-2 w-2 rounded-full bg-primary" aria-hidden />
            v2.0 AI 네이티브 엔진 정식 출시
          </div>
          <h1 className="mb-8 text-6xl font-extrabold leading-[1.1] tracking-tighter text-on-surface md:text-7xl">
            <span className="text-primary">빛의 속도로 구축하는</span> CRM
          </h1>
          <p className="mb-10 max-w-2xl text-xl leading-relaxed text-on-surface-variant">
            React를 위한 헤드리스 UI 라이브러리. 데이터 중심의 CRM 인터페이스
            개발과 AI 네이티브 DX를 위해 설계되었습니다. CSS와 씨름하지 말고
            바로 기능을 구현하세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-8 py-4 font-semibold text-on-primary shadow-lg transition-all hover:shadow-primary/20 active:scale-95"
            >
              시작하기
            </button>
            <Link
              href="/document"
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
            비즈니스 툴을 위해 고안된 가장 유연한 아키텍처입니다.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-inverse-surface shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <span className="ml-4 font-mono text-xs text-inverse-on-surface/50">
                Dashboard.tsx
              </span>
            </div>
            <div className="overflow-x-auto p-8 font-mono text-sm leading-relaxed text-inverse-on-surface">
              <div>
                <span className="text-sky-400">import</span>{" "}
                <span className="text-white">{"{ CRMProvider, DataTable }"}</span>{" "}
                <span className="text-sky-400">from</span>{" "}
                <span className="text-emerald-400">&apos;@mycrm/core&apos;</span>;
              </div>
              <div className="mt-4 text-slate-500">// 헤드리스 엔진 초기화</div>
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-white">App = () =&gt; (</span>
              </div>
              <div className="pl-4 text-purple-400">
                &lt;CRMProvider <span className="text-sky-300">apiKey</span>=
                <span className="text-emerald-400">&quot;...&quot;</span>&gt;
              </div>
              <div className="pl-8 text-purple-400">&lt;DataTable</div>
              <div className="pl-12 text-sky-300">
                source=<span className="text-white">{"{customers}"}</span>
              </div>
              <div className="pl-12 text-sky-300">
                renderRow=
                <span className="text-white">{"{(row) => ("}</span>
              </div>
              <div className="pl-16 text-white">
                &lt;<span className="text-primary-fixed-dim">CustomCard</span>{" "}
                <span className="text-sky-300">data</span>={"{"}row{"}"} /&gt;
              </div>
              <div className="pl-12 text-white">{")}"}</div>
              <div className="pl-8 text-purple-400">/&gt;</div>
              <div className="pl-4 text-purple-400">&lt;/CRMProvider&gt;</div>
              <div className="text-white">);</div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/10" />
            <div className="relative rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <h4 className="text-lg font-bold text-on-surface">수익 분석</h4>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-surface-container-low px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                    월간
                  </span>
                  <span className="material-symbols-outlined text-outline">
                    more_vert
                  </span>
                </div>
              </div>
              <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg shadow-inner">
                <Image
                  src={DASHBOARD_CHART}
                  alt="수익 분석 차트와 성장 지표가 표시된 대시보드"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                {PARTNER_ITEMS.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-between rounded-lg bg-surface-container-low p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${partner.iconStyle}`}
                      >
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{partner.name}</p>
                        <p className="text-xs text-on-surface-variant">{partner.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{partner.amount}</p>
                      <p className="text-[10px] font-bold text-green-600">
                        {partner.growth}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
            <strong className="text-inverse-on-surface">&quot;바이브 코딩&quot;</strong>을
            염두에 두고 구축되었습니다. GPT-4와 Claude 3.5 Sonnet이 네이티브하게
            이해할 수 있는 구조화된 스키마 정의와 시맨틱 컴포넌트 마커를
            제공합니다.
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
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-outline-variant/30 px-6 py-3 transition-colors hover:bg-white/5"
          >
            AI 최적화에 대해 더 알아보기
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
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
              &quot;mycrm 로직을 사용하여 지역 및 거래 규모별 필터링 기능이 있는 리드
              추적 테이블을 만들어줘...&quot;
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg border border-primary/30 bg-primary/20 p-4 text-sm text-inverse-on-surface/90">
                &quot;알겠습니다.{" "}
                <code className="text-primary-fixed">&lt;DataTable /&gt;</code> 엔진과{" "}
                <code className="text-primary-fixed">region</code>,{" "}
                <code className="text-primary-fixed">amount</code> 패싯을
                사용하겠습니다. 구현 코드는 다음과 같습니다...&quot;
              </div>
            </div>
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
          업계에서 가장 유연한 CRM 엔진으로 엔터프라이즈급 툴을 구축하고 있는
          5,000명 이상의 개발자와 함께하세요.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="w-full rounded-xl bg-primary px-10 py-5 font-bold text-on-primary shadow-xl transition-all hover:-translate-y-1 hover:bg-primary-container sm:w-auto"
          >
            무료로 시작하기
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-surface-container px-10 py-5 font-bold text-on-surface transition-all hover:bg-surface-container-high sm:w-auto"
          >
            전문가와 상담하기
          </button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-outline opacity-60 grayscale transition-all hover:grayscale-0">
          <span>MIT 라이선스</span>
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
      <FinalCtaSection />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-20 w-full border-t border-outline-variant/15 bg-surface-container-lowest text-sm text-on-surface-variant">
      <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-lg font-bold text-on-surface">mycrm</span>
          <p>© 2024 mycrm UI. 건축적인 웹을 위해 설계되었습니다.</p>
        </div>
        <div className="flex gap-8">
          <a
            className="transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            href="#"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            href="#"
          >
            NPM
          </a>
          <a
            className="transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            href="#"
          >
            Discord
          </a>
          <a
            className="transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            href="#"
          >
            Twitter
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-surface-container-low opacity-80 transition-opacity hover:opacity-100"
            aria-label="라이트 모드"
          >
            <span className="material-symbols-outlined text-sm">light_mode</span>
          </button>
          <span className="rounded bg-surface-container-low px-2 py-1 font-mono text-xs">
            v2.0.4-beta
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PageContent />
      <SiteFooter />
    </>
  );
}
