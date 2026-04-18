import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";
import TocAside from "../toc-aside";
import type { TocGroup } from "../toc-aside";

export const metadata: Metadata = createPageMetadata({
  title: "@mycrm-ui/react - mycrm UI",
  description:
    "@mycrm-ui/react 문서입니다. 공통 React 컴포넌트, 컨텍스트, 훅을 통해 mycrm UI 기능을 앱에 안정적으로 연결할 수 있습니다.",
  pathname: "/document/react",
});

const TOC_GROUPS: TocGroup[] = [
  {
    title: "@mycrm-ui/react",
    items: [
      { id: "react-components", label: "컴포넌트" },
      { id: "react-contexts", label: "컨텍스트" },
      { id: "react-hooks", label: "훅" },
    ],
  },
];

export default function ReactPage() {
  return (
    <>
      <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
        <div className="max-w-3xl">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
                Package
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
              @mycrm-ui/react
            </h1>
            <p className="text-xl font-light leading-relaxed text-on-surface-variant">
              mycrm UI를 React 앱에 연결하기 위한 공통 React 컴포넌트, 컨텍스트,
              훅 모음입니다. Portal, ErrorBoundary, Provider 계층을 통해 CRM UI
              기능을 안정적으로 조립할 수 있습니다.
            </p>
          </header>

          <section className="mb-16" id="react-components">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined">widgets</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">컴포넌트</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              공통 React 컴포넌트 모음입니다. Portal과 ErrorBoundary를 제공합니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import { Portal, ErrorBoundary } from '@mycrm-ui/react'

// Portal: 특정 DOM 노드에 자식을 렌더링
<Portal container={document.body}>
  <Modal />
</Portal>

// ErrorBoundary: 컴포넌트 에러 경계
<ErrorBoundary
  fallback={(error) => <div>오류 발생: {error.message}</div>}
  onError={(error, info) => console.error(error, info)}
>
  <App />
</ErrorBoundary>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-contexts">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined">share</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">컨텍스트</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              테마와 로케일을 관리하는 Provider/Hook 쌍을 제공합니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import { ThemeProvider, useTheme, LocaleProvider, useLocale } from '@mycrm-ui/react'

// 테마
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>

function MyComponent() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme('dark')}>다크 모드</button>
}

// 로케일
<LocaleProvider defaultLocale="ko-KR">
  <App />
</LocaleProvider>

function MyComponent() {
  const { locale, setLocale } = useLocale()
}`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-hooks">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined">link</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">훅</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              디바운스, 외부 클릭 감지, 크기 관찰 등 재사용 가능한 커스텀 훅입니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import { useDebounce, useClickOutside, useResizeObserver, useId } from '@mycrm-ui/react'

// 값 디바운스
const debouncedSearch = useDebounce(searchTerm, 300)

// 외부 클릭 감지
const ref = useRef<HTMLDivElement>(null)
useClickOutside(ref, () => setOpen(false))

// 엘리먼트 크기 감지
const size = useResizeObserver(ref)  // { width, height } | null

// 고유 ID 생성
const id = useId('input')  // 'input-abc123'`}</code>
            </pre>
            <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">훅</th>
                    <th className="px-4 py-3 text-left font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">useDebounce</td>
                    <td className="px-4 py-3 text-on-surface-variant">값 변경을 지연 (ms 단위)</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">useClickOutside</td>
                    <td className="px-4 py-3 text-on-surface-variant">ref 외부 클릭 시 콜백 실행</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">useResizeObserver</td>
                    <td className="px-4 py-3 text-on-surface-variant">엘리먼트 크기 변화 감지</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">useId</td>
                    <td className="px-4 py-3 text-on-surface-variant">접두사 기반 고유 ID 생성</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <TocAside groups={TOC_GROUPS} />
    </>
  );
}
