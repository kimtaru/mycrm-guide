import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import TocAside from "./toc-aside";

export const metadata: Metadata = {
  title: "Getting Started - mycrm UI",
  description: "mycrm 문서 시작 가이드 페이지입니다.",
};

function TopNav() {
  return (
    <nav className="fixed top-0 z-50 h-16 w-full bg-surface-container-lowest/80 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-8xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-on-surface">
            mycrm
          </Link>
          <div className="hidden gap-6 md:flex">
            <Link
              href="/document"
              className="border-b-2 border-primary py-5 font-semibold text-primary"
            >
              문서
            </Link>
            <Link
              href="/"
              className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
            >
              컴포넌트
            </Link>
            <Link
              href="/"
              className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
            >
              예시
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              className="w-64 rounded-lg border-none bg-surface-container-low py-1.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="문서 검색..."
              type="search"
              aria-label="문서 검색"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
              search
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
        <div className="absolute bottom-0 left-0 h-px w-full bg-outline-variant/30" />
      </div>
    </nav>
  );
}

function SideNav() {
  return (
    <aside className="sticky left-0 top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-surface-container-low py-8">
      <div className="mb-6 px-6">
        <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Documentation
        </h3>
        <p className="text-[10px] font-medium text-primary">v0.0.1</p>
      </div>
      <div className="mx-2 my-1 flex items-center gap-2 px-4 py-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-sm font-semibold text-on-surface">간단하게 시작하기</span>
      </div>
      <a
        href="#installation"
        className="mx-2 my-1 flex items-center gap-3 rounded-lg bg-surface-container-lowest px-4 py-2 text-primary shadow-sm transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">download</span>
        <span className="text-sm font-medium">설치</span>
      </a>
    </aside>
  );
}

function MainDoc() {
  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-3xl">
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-secondary-container/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">
              Guide
            </span>
            <span className="text-xs text-outline-variant">•</span>
            <span className="text-xs text-on-surface-variant">2일 전 업데이트</span>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            시작하기
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            고성능과 구조적 안정성을 갖춘 mycrm UI 문서입니다. 데이터 중심
            애플리케이션에 맞는 컴포넌트 사용법을 빠르게 시작할 수 있습니다.
          </p>
        </header>

        <section className="mb-16" id="installation">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined">download</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface">설치</h2>
          </div>
          <div className="space-y-12">
            <section id="requirements">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">요구사항</h3>
              <div className="overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
                <table className="w-full text-sm">
                  <thead className="bg-surface-container-low text-on-surface-variant">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">항목</th>
                      <th className="px-4 py-3 text-left font-semibold">버전</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-outline-variant/20">
                      <td className="px-4 py-3">Node.js</td>
                      <td className="px-4 py-3">&gt;= 17</td>
                    </tr>
                    <tr className="border-t border-outline-variant/20">
                      <td className="px-4 py-3">React</td>
                      <td className="px-4 py-3">
                        &gt;= 18 (react-table, react 패키지 사용 시)
                      </td>
                    </tr>
                    <tr className="border-t border-outline-variant/20">
                      <td className="px-4 py-3">TypeScript</td>
                      <td className="px-4 py-3">&gt;= 5.0 (선택, 권장)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="package-guide">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">
                패키지 선택 가이드
              </h3>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                사용 목적에 따라 필요한 패키지만 설치합니다.
              </p>
              <p className="mb-3 font-medium text-on-surface">
                React 테이블 컴포넌트를 사용하는 경우 (가장 일반적)
              </p>
              <div className="overflow-hidden rounded-xl bg-inverse-surface shadow-lg">
                <pre className="overflow-x-auto p-6 font-mono text-sm text-inverse-on-surface">
                  <code>{`# npm
npm install @mycrm-ui/react-table

# yarn
yarn add @mycrm-ui/react-table

# pnpm
pnpm add @mycrm-ui/react-table`}</code>
                </pre>
              </div>
              <p className="mt-3 rounded-lg bg-surface-container-low p-3 text-sm text-on-surface-variant">
                <code>@mycrm-ui/react-table</code>은 내부적으로{" "}
                <code>@mycrm-ui/table</code>에 의존하므로 별도 설치가 필요 없습니다.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="mb-2 font-medium text-on-surface">
                    유틸리티 / 타입 / 포맷터만 사용하는 경우
                  </p>
                  <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-4 font-mono text-sm text-inverse-on-surface shadow-lg">
                    <code>npm install @mycrm-ui/core</code>
                  </pre>
                </div>
                <div>
                  <p className="mb-2 font-medium text-on-surface">
                    테이블 로직을 직접 사용하는 경우 (프레임워크 독립적)
                  </p>
                  <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-4 font-mono text-sm text-inverse-on-surface shadow-lg">
                    <code>npm install @mycrm-ui/table</code>
                  </pre>
                </div>
                <div>
                  <p className="mb-2 font-medium text-on-surface">모든 패키지 설치</p>
                  <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-4 font-mono text-sm text-inverse-on-surface shadow-lg">
                    <code>{`npm install @mycrm-ui/core @mycrm-ui/table @mycrm-ui/react @mycrm-ui/react-table`}</code>
                  </pre>
                </div>
              </div>
            </section>

            <section id="peer-dependencies">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">
                Peer Dependencies
              </h3>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                <code>@mycrm-ui/react-table</code>과 <code>@mycrm-ui/react</code>는
                React를 peer dependency로 요구합니다. 프로젝트에 React가 없다면 함께
                설치해야 합니다.
              </p>
              <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
                <code>{`npm install react react-dom
npm install @mycrm-ui/react-table`}</code>
              </pre>
            </section>

            <section id="dependency-graph">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">
                패키지 간 의존성
              </h3>
              <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
                <code>{`@mycrm-ui/react-table
  └── @mycrm-ui/table       (자동 설치)
  └── react, react-dom      (peer, 직접 설치 필요)

@mycrm-ui/react
  └── react, react-dom      (peer, 직접 설치 필요)

@mycrm-ui/table             (의존성 없음)
@mycrm-ui/core              (의존성 없음)`}</code>
              </pre>
            </section>

            <section id="typescript-config">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">
                TypeScript 설정
              </h3>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                별도의 타입 패키지 없이 각 패키지에 타입 선언이 포함되어 있습니다.
                <code className="ml-1">tsconfig.json</code>의 모듈 해석 방식을 확인하세요.
              </p>
              <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
                <code>{`{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "module": "ESNext",
    "strict": true
  }
}`}</code>
              </pre>
              <p className="mt-3 rounded-lg bg-surface-container-low p-3 text-sm text-on-surface-variant">
                <code>moduleResolution: "node"</code>도 동작하지만{" "}
                <code>"bundler"</code> 또는 <code>"node16"</code> 이상을 권장합니다.
              </p>
            </section>

            <section id="esm-cjs">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">ESM / CJS 지원</h3>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                모든 패키지는 ESM과 CJS 형식을 모두 제공합니다. 번들러가 자동으로
                적절한 형식을 선택합니다.
              </p>
              <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
                <code>{`dist/index.js    — ESM (import)
dist/index.cjs   — CJS (require)
dist/index.d.ts  — TypeScript 타입 선언`}</code>
              </pre>
            </section>

            <section id="verification">
              <h3 className="mb-4 text-lg font-semibold text-on-surface">설치 확인</h3>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                설치 후 아래 코드로 정상 동작을 확인합니다.
              </p>
              <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
                <code>{`import { formatDate } from '@mycrm-ui/core'
import { Table } from '@mycrm-ui/react-table'

console.log(formatDate(new Date(), 'YYYY-MM-DD'))`}</code>
              </pre>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function PageFooter() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-on-surface">mycrm UI</span>
          <p className="text-sm text-on-surface-variant">
            © 2024 mycrm UI. Built for the architectural web.
          </p>
        </div>
        <div className="flex gap-8">
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            GitHub
          </a>
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            NPM
          </a>
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            Discord
          </a>
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function DocumentPage() {
  return (
    <>
      <Script id="scroll-top-on-mount" strategy="afterInteractive">
        {"window.scrollTo({ top: 0, behavior: 'smooth' });"}
      </Script>
      <TopNav />
      <div className="mx-auto flex max-w-8xl pt-16">
        <SideNav />
        <MainDoc />
        <TocAside />
      </div>
      <PageFooter />
    </>
  );
}
