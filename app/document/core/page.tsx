import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";
import TocAside from "../toc-aside";
import type { TocGroup } from "../toc-aside";

export const metadata: Metadata = createPageMetadata({
  title: "@mycrm-ui/core - mycrm UI",
  description:
    "@mycrm-ui/core 문서입니다. 공통 타입, 유틸리티 함수, 포맷터, 에러 클래스로 mycrm UI의 핵심 로직 기반을 제공합니다.",
  pathname: "/document/core",
});

const TOC_GROUPS: TocGroup[] = [
  {
    title: "@mycrm-ui/core",
    items: [
      { id: "core-types", label: "타입" },
      { id: "core-utilities", label: "유틸리티 함수" },
      { id: "core-formatters", label: "포맷터" },
      { id: "core-errors", label: "에러 클래스" },
    ],
  },
];

export default function CorePage() {
  return (
    <>
      <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
        <div className="max-w-3xl">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-tertiary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tertiary">
                Package
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
              @mycrm-ui/core
            </h1>
            <p className="text-xl font-light leading-relaxed text-on-surface-variant">
              유틸리티 타입, 헬퍼 함수, 포맷터, 에러 클래스 등 프레임워크에 독립적인 핵심 유틸리티 패키지입니다.
            </p>
          </header>

          <section className="mb-16" id="core-types">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                <span className="material-symbols-outlined">data_object</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">타입</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              프로젝트 전반에서 사용할 수 있는 공통 타입 유틸리티입니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import type { ID, Key, Nullable, DeepPartial, DeepReadonly, CSSProps } from '@mycrm-ui/core'

type UserId = ID               // string | number
type Config = DeepPartial<{ a: { b: string } }>  // 중첩 옵셔널
type Readonly = DeepReadonly<{ a: { b: string } }>`}</code>
            </pre>
            <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">타입</th>
                    <th className="px-4 py-3 text-left font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">ID</td>
                    <td className="px-4 py-3 text-on-surface-variant">string | number 유니온</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">Key</td>
                    <td className="px-4 py-3 text-on-surface-variant">string | number | symbol</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">Nullable&lt;T&gt;</td>
                    <td className="px-4 py-3 text-on-surface-variant">T | null | undefined</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">DeepPartial&lt;T&gt;</td>
                    <td className="px-4 py-3 text-on-surface-variant">중첩된 모든 프로퍼티를 옵셔널로 변환</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">DeepReadonly&lt;T&gt;</td>
                    <td className="px-4 py-3 text-on-surface-variant">중첩된 모든 프로퍼티를 readonly로 변환</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">CSSProps</td>
                    <td className="px-4 py-3 text-on-surface-variant">React.CSSProperties 호환 스타일 객체</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16" id="core-utilities">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                <span className="material-symbols-outlined">handyman</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">유틸리티 함수</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              객체 조작, 배열 처리 등 자주 사용하는 범용 유틸리티 모음입니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import { deepClone, deepMerge, flatten, groupBy, pick, omit } from '@mycrm-ui/core'

// 깊은 복사
const copy = deepClone(obj)

// 깊은 병합 (target에 source를 덮어씀)
const merged = deepMerge(defaults, overrides)

// 2차원 배열 평탄화
const flat = flatten([[1, 2], [3, 4]])  // [1, 2, 3, 4]

// 배열을 키 기준으로 그룹화
const grouped = groupBy(users, 'role')
const grouped2 = groupBy(users, (u) => u.name[0])

// 객체에서 특정 키만 추출/제외
const picked = pick(obj, ['id', 'name'])
const omitted = omit(obj, ['password'])`}</code>
            </pre>
          </section>

          <section className="mb-16" id="core-formatters">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                <span className="material-symbols-outlined">text_format</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">포맷터</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              날짜, 숫자, 통화, 전화번호 등을 한국 로케일에 맞게 포맷팅합니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import { formatDate, formatNumber, formatCurrency, formatPhoneNumber } from '@mycrm-ui/core'

// 날짜 포맷
formatDate(new Date(), 'YYYY-MM-DD')          // '2026-03-24'
formatDate('2026-03-24', 'YYYY년 MM월 DD일')  // '2026년 03월 24일'
formatDate(new Date(), undefined, 'en-US')    // Intl 기본 포맷

// 숫자 포맷
formatNumber(1234567)                          // '1,234,567'
formatNumber(0.1234, { style: 'percent' })     // '12%'

// 통화 포맷
formatCurrency(50000)                          // '₩50,000'
formatCurrency(100, 'USD', 'en-US')            // '\$100.00'

// 전화번호 포맷 (KR)
formatPhoneNumber('01012345678')               // '010-1234-5678'
formatPhoneNumber('0212345678')                // '02-1234-5678'`}</code>
            </pre>
            <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">함수</th>
                    <th className="px-4 py-3 text-left font-semibold">매개변수</th>
                    <th className="px-4 py-3 text-left font-semibold">반환</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">formatDate</td>
                    <td className="px-4 py-3 text-on-surface-variant">value, pattern?, locale?</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">formatNumber</td>
                    <td className="px-4 py-3 text-on-surface-variant">value, options?</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">formatCurrency</td>
                    <td className="px-4 py-3 text-on-surface-variant">value, currency?, locale?</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">formatPhoneNumber</td>
                    <td className="px-4 py-3 text-on-surface-variant">value</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16" id="core-errors">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                <span className="material-symbols-outlined">error</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">에러 클래스</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              구조화된 에러 처리를 위한 커스텀 에러 클래스와 팩토리 함수입니다.
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import { MycrmError, ValidationError, NotFoundError, createError } from '@mycrm-ui/core'

throw new ValidationError('이메일 형식이 올바르지 않습니다.', { field: 'email' })
throw new NotFoundError('사용자를 찾을 수 없습니다.')

// 팩토리 함수
const err = createError('PERMISSION_DENIED', '권한이 없습니다.')

// 에러 판별
if (err instanceof MycrmError) {
  console.log(err.code, err.message, err.details)
}`}</code>
            </pre>
            <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">클래스</th>
                    <th className="px-4 py-3 text-left font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">MycrmError</td>
                    <td className="px-4 py-3 text-on-surface-variant">기본 에러 클래스 (code, message, details)</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">ValidationError</td>
                    <td className="px-4 py-3 text-on-surface-variant">입력 검증 실패</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">NotFoundError</td>
                    <td className="px-4 py-3 text-on-surface-variant">리소스 미발견</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">createError()</td>
                    <td className="px-4 py-3 text-on-surface-variant">코드 기반 에러 생성 팩토리</td>
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
