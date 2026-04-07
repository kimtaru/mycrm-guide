@AGENTS.md

# @mycrm-ui/react-table 가이드 페이지 작성 규칙

## 참조 파일

- **가이드 데모 페이지**: `app/document/react-table/page.tsx` — 각 기능별 섹션, 코드 하이라이팅, 데모 컴포넌트 구성
- **데모 컴포넌트**: `app/document/react-table/*-demo.tsx` — 각 기능별 인터랙티브 데모
- **실제 구현 예시**: `/Users/jinsol/Desktop/crm/my-crm/src/pages/CustomersPage.tsx` — @mycrm-ui/react-table의 모든 기능(정렬, 필터, 선택, 편집, 행 추가/삭제, 컬럼 관리, 가상 스크롤, 확장 행 등)이 적용된 실무 페이지

## 가이드 페이지 구성 패턴

1. **page.tsx (서버 컴포넌트)**: 코드 문자열(`*_CODE`) 정의 → `shiki`로 하이라이팅 → 데모 컴포넌트에 `codeHtml` props 전달
2. **\*-demo.tsx (클라이언트 컴포넌트)**: `"use client"`, Table 컴포넌트 + 상태 관리 + 이벤트 로그 + `<CodeToggle>` 코드 토글
3. **섹션 구조**: 아이콘 + 제목 → 설명 텍스트 → 데모 컴포넌트 (라이브 미리보기 + 코드 토글)

## Table API 주의사항

- `ColumnDef.insertable: true` 필요 — `rowActions.adding` 시 input이 렌더링되려면 컬럼에 `insertable` 설정 필수
- `editing.onValidationError` 설정 시 `renderCell`의 `error` props가 null이 됨 — 에러 메시지를 UI에 표시하려면 `onValidationError`를 설정하지 않아야 내부 에러 상태가 세팅됨
- `ColumnDef.renderEditCell`이 `editing.renderCell`보다 우선 — 특정 컬럼만 다른 편집 UI(select 등)를 쓸 때 `renderEditCell` 사용
