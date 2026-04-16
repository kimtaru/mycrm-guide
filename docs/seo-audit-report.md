# mycrm-guide SEO 점검 보고서

## 요약

- 점검일: 2026-04-16
- 대상 프로젝트: `mycrm-guide`
- 현재 추정 SEO 점수: `62 / 100`
- 종합 평가:
  - 주요 페이지가 서버 렌더링 또는 정적 생성되고 있어 크롤링 기반은 괜찮은 편입니다.
  - 핵심 페이지에 기본적인 `title`, `description`, `h1`은 들어가 있습니다.
  - 다만 검색엔진이 사이트를 더 잘 발견하고, URL을 올바르게 정규화하고, 공유 미리보기를 풍부하게 생성하는 데 필요한 기술 SEO 신호가 많이 비어 있습니다.

## 현재 잘 되어 있는 부분

1. 주요 라우트가 첫 응답부터 HTML을 정상적으로 반환합니다.
2. 문서 루트에 `lang="ko"`가 설정되어 있습니다.
3. 메인 페이지와 주요 문서 페이지에 `title`, `description`, `h1`이 존재합니다.
4. `main`, `header`, `section`, `nav`, `aside` 같은 시맨틱 태그 사용이 전반적으로 괜찮습니다.
5. 문서 페이지에 TOC와 내부 앵커 구조가 있어 정보 구조가 비교적 명확합니다.
6. `next build`가 정상 통과하여 배포 시 인덱싱 실패 위험이 낮습니다.

## 주요 SEO 리스크

### 1. 크롤링 및 탐색용 파일 부재

- `/robots.txt`가 `404`를 반환합니다.
- `/sitemap.xml`이 `404`를 반환합니다.
- 영향:
  - 검색엔진이 사이트를 탐색할 때 참고할 기본 안내가 없습니다.
  - 검색엔진에 제출 가능한 URL 목록이 자동으로 제공되지 않습니다.

### 2. canonical 및 사이트 전역 메타 기준 부재

- `metadataBase`가 없습니다.
- canonical URL 설정이 없습니다.
- `alternates` 설정이 없습니다.
- 영향:
  - 동일 페이지의 중복 URL 정리가 약합니다.
  - 쿼리스트링 또는 다른 진입 URL이 서로 경쟁할 가능성이 있습니다.

### 3. 소셜 미리보기 메타 부재

- `openGraph` 메타가 없습니다.
- `twitter` 메타가 없습니다.
- 영향:
  - 링크 공유 시 미리보기가 약하거나 일관되지 않을 수 있습니다.
  - 검색 외 채널에서 브랜드 노출 품질이 떨어집니다.

### 4. 구조화 데이터 부재

- 다음 유형의 JSON-LD가 없습니다.
  - organization
  - product
  - software application
  - tech article
  - documentation
- 영향:
  - 검색엔진이 이 사이트와 문서의 성격을 더 명확히 이해하기 어렵습니다.

### 5. 문서 메타 설명이 지나치게 일반적임

- 현재 메타 설명 예시:
  - `@mycrm-ui/core 패키지 문서입니다.`
  - `@mycrm-ui/react-table 패키지 문서입니다.`
- 영향:
  - 키워드 커버리지가 낮습니다.
  - 검색 의도와의 연결이 약합니다.
  - 검색 결과 클릭률 개선 여지가 큽니다.

### 6. 세부 기능 키워드 대응이 약함

- `react-table`의 중요한 주제들이 하나의 긴 페이지 안 섹션으로만 묶여 있습니다.
- 영향:
  - 아래와 같은 기능 검색어에 개별적으로 대응하기 어렵습니다.
    - React table sorting
    - React inline editing table
    - React virtual scroll table
    - CRM data table component

### 7. 국제화 SEO 신호가 약함

- 일부 LLM 페이지는 `ko/en` 전환을 지원합니다.
- 하지만 언어 대체 관계를 나타내는 명시적 메타는 없습니다.
- 영향:
  - 검색엔진이 언어별 페이지 관계를 명확히 파악하기 어렵습니다.

### 8. manifest 부재

- `/manifest.webmanifest`가 `404`를 반환합니다.
- 영향:
  - SEO 핵심 차단 요소는 아니지만, 사이트 완성도와 설치형 웹앱 관점에서 보완 여지가 있습니다.

## 우선순위별 조치 항목

## P0: 가장 먼저 보완할 항목

1. `app/robots.ts` 추가
2. `app/sitemap.ts` 추가
3. `app/layout.tsx`에 `metadataBase` 설정
4. 전역 및 주요 페이지 canonical 메타 추가
5. 기본 `robots` 메타 정책 추가

예상 효과:

- 기술 SEO 기반 강화
- 크롤링 및 탐색 품질 개선
- URL 정규화 신호 강화

## P1: 영향도가 큰 보완 항목

1. `app/layout.tsx`에 `openGraph` 메타 추가
2. `app/layout.tsx`에 `twitter` 메타 추가
3. 홈 메타 제목과 설명을 검색 의도 중심으로 개선
4. 패키지/문서 페이지 메타 설명을 기능 중심으로 개선
5. `opengraph-image` 등 공유 이미지 전략 추가

예상 효과:

- 링크 공유 미리보기 개선
- 키워드 관련성 강화
- 검색 결과 클릭률 개선 가능성 확대

## P2: 콘텐츠 SEO 강화 항목

1. 홈에 JSON-LD 추가
2. 주요 패키지 문서 페이지에 JSON-LD 추가
3. `react-table`의 고가치 기능을 별도 인덱싱 가능한 페이지로 분리하거나 랜딩 페이지 추가
4. 설치, 패키지, 예제, LLM 가이드 사이 내부 링크 강화

예상 효과:

- 검색엔진 이해도 향상
- 기능 단위 long-tail 유입 가능성 증가
- 문서 간 연결성 강화

## P3: 보조 개선 항목

1. `manifest.webmanifest` 추가
2. 이중 언어 페이지에 명시적 언어 대체 메타 추가
3. 제목과 본문 카피를 검색어 친화적으로 재검토
4. 공식 npm 또는 GitHub 등 외부 신뢰 링크 연결 검토

## 권장 메타 문구 방향

### 홈

- 권장 제목:
  - `mycrm UI | React Headless CRM UI Library & Data Table`
- 권장 설명:
  - `React와 TypeScript를 위한 헤드리스 CRM UI 라이브러리. 고성능 데이터 테이블, 정렬, 필터, 선택, 인라인 편집, 가상 스크롤을 지원합니다.`

### React Table 문서

- 권장 제목:
  - `@mycrm-ui/react-table | React Data Table Component for CRM`
- 권장 설명:
  - `React 18/19용 헤드리스 데이터 테이블 컴포넌트 문서입니다. 정렬, 필터, 체크박스 선택, 인라인 편집, 가상 스크롤, 컬럼 관리 예제를 제공합니다.`

### Core 패키지 문서

- 권장 제목:
  - `@mycrm-ui/core | TypeScript Utilities and Formatters`
- 권장 설명:
  - `ID, Nullable, DeepPartial, formatters, error classes 등 mycrm UI의 프레임워크 독립적 TypeScript 유틸리티 패키지 문서입니다.`

## 추천 구현 순서

1. `app/layout.tsx`에 사이트 전역 메타 기준 추가
2. `robots.ts`, `sitemap.ts` 추가
3. 홈 및 주요 문서 페이지 메타 문구 개선
4. Open Graph 이미지 지원 추가
5. 홈과 패키지 문서에 구조화 데이터 추가
6. `react-table` 기능별 랜딩 페이지 확장 계획 수립

## 이 브랜치에서 이어서 작업 가능한 범위

- 브랜치: `feature/seo-improvements-report`

후속 구현 범위 예시:

- 기술 SEO 기본 구성
- 메타데이터 품질 개선
- 소셜 공유 미리보기 보강
- 구조화 데이터 추가
- 기능별 랜딩 페이지 확장

## 참고

- 이번 점검은 저장소 코드 확인과 로컬 프로덕션 빌드, 실제 HTTP 응답 확인을 기반으로 진행했습니다.
- 점검 중 `next build`는 정상 통과했습니다.
- 현재 가장 큰 문제는 디자인이 아니라 기술 SEO 기본 구성이 비어 있다는 점입니다.
