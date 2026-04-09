"use client";

import { Fragment, useState } from "react";

type Mode = "css" | "tw";

// [slot, 적용 요소, 관련 기능, CSS 예시, Tailwind 예시]
type Row = [string, string, string, string, string];

const SECTIONS: { label: string; rows: Row[] }[] = [
  {
    label: "기본 레이아웃",
    rows: [
      ["wrap",   "테이블 최외곽 div",  "스크롤 컨테이너 (height + overflow-y 설정)", "height: 400px; overflow-y: auto",                         "h-96 overflow-y-auto"],
      ["table",  "<table>",            "기본",                                          "border-collapse: collapse; width: 100%",                   "border-collapse w-full"],
      ["thead",  "<thead>",            "기본",                                          "position: sticky; top: 0; background: #fff; z-index: 10", "sticky top-0 bg-white z-10"],
      ["th",     "<th> (헤더 셀)",     "기본",                                          "padding: 8px 16px; text-align: left; font-weight: 600",    "px-4 py-2 text-left font-semibold"],
      ["tbody",  "<tbody>",            "기본",                                          "border-top: 1px solid #eee",                               "border-t border-gray-200"],
      ["tr",     "<tr> (데이터 행)",   "기본",                                          "border-bottom: 1px solid #eee",                            "border-b border-gray-200"],
      ["td",     "<td> (데이터 셀)",   "기본",                                          "padding: 8px 16px; font-size: 14px",                       "px-4 py-2 text-sm"],
    ],
  },
  {
    label: "정렬",
    rows: [
      ["sortPriority", "다중 정렬 우선순위 숫자", "정렬", "color: #3b82f6; font-size: 11px; margin-left: 4px", "text-blue-500 text-[11px] ml-1"],
    ],
  },
  {
    label: "체크박스 선택",
    rows: [
      ["checkbox",        "<input type='checkbox'>",  "선택", "accent-color: #3b82f6; cursor: pointer", "accent-blue-500 cursor-pointer"],
      ["checkboxChecked", "체크된 상태의 체크박스",   "선택", "outline: 2px solid #3b82f6",             "outline outline-2 outline-blue-500"],
    ],
  },
  {
    label: "필터",
    rows: [
      ["filterRow",    "필터 입력 행 <tr>",              "필터", "background: #f5f5f5",                                                    "bg-gray-100"],
      ["filterCell",   "필터 행의 <th>",                 "필터", "padding: 6px",                                                           "p-1.5"],
      ["filterInput",  "텍스트 / 날짜 / 숫자 범위 <input>", "필터", "border: 1px solid #ccc; border-radius: 4px; padding: 4px 8px; width: 100%", "border border-gray-300 rounded px-2 py-1 w-full"],
      ["filterSelect", "select 필터 <select>",           "필터", "border: 1px solid #ccc; border-radius: 4px; padding: 4px 8px",           "border border-gray-300 rounded px-2 py-1"],
    ],
  },
  {
    label: "인라인 편집",
    rows: [
      ["tdEditing", "편집 중인 <td>",         "인라인 편집",       "outline: 2px solid #3b82f6; background: #eff6ff",    "outline outline-2 outline-blue-500 bg-blue-50"],
      ["editError", "편집 에러 메시지",        "인라인 편집",       "color: #ef4444; font-size: 12px; margin-top: 4px",   "text-red-500 text-xs mt-1"],
      ["tdFocused", "키보드 포커스된 <td>",   "키보드 내비게이션", "background: rgba(99, 102, 241, 0.1)",                "bg-indigo-500/10"],
    ],
  },
  {
    label: "행 삭제 / 추가",
    rows: [
      ["addRow",        "새 행 추가 <tr>",     "행 추가", "background: #f0fdf4",                                                      "bg-green-50"],
      ["addInput",      "추가 행의 입력 필드", "행 추가", "border: 1px solid #ccc; border-radius: 4px; padding: 4px 8px; width: 100%", "border border-gray-300 rounded px-2 py-1 w-full"],
      ["addConfirmBtn", "추가 확인 버튼",      "행 추가", "color: #16a34a; cursor: pointer",                                           "text-green-600 cursor-pointer"],
      ["addCancelBtn",  "추가 취소 버튼",      "행 추가", "color: #9ca3af; cursor: pointer",                                           "text-gray-400 cursor-pointer"],
    ],
  },
  {
    label: "헤더 메뉴",
    rows: [
      ["headerMenuBtn",      "⋯ 버튼",                    "헤더 메뉴", "opacity: 0; transition: opacity 0.2s",                                     "opacity-0 transition-opacity duration-200"],
      ["headerMenuDropdown", "드롭다운 컨테이너",          "헤더 메뉴", "box-shadow: 0 4px 12px rgba(0,0,0,.1); border-radius: 8px; background: #fff", "shadow-md rounded-lg bg-white"],
      ["headerMenuItem",     "드롭다운 각 항목 <button>", "헤더 메뉴", "padding: 8px 16px; font-size: 14px; text-align: left; width: 100%",          "px-4 py-2 text-sm text-left w-full"],
    ],
  },
  {
    label: "컬럼 관리",
    rows: [
      ["columnManagerBackdrop",    "모달 배경 오버레이",          "컬럼 관리", "background: rgba(0,0,0,.4); backdrop-filter: blur(4px)",                                                               "bg-black/40 backdrop-blur-sm"],
      ["columnManager",            "모달 컨테이너",               "컬럼 관리", "border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,.2); background: #fff; width: 320px",                          "rounded-xl shadow-2xl bg-white w-80"],
      ["columnManagerHeader",      "모달 헤더",                   "컬럼 관리", "display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding: 16px",    "flex items-center justify-between border-b border-gray-200 p-4"],
      ["columnManagerTitle",       "모달 제목",                   "컬럼 관리", "font-weight: 700; font-size: 15px",                                                                                     "font-bold text-[15px]"],
      ["columnManagerSelectAllBtn","전체 선택 버튼",              "컬럼 관리", "color: #3b82f6; font-size: 12px",                                                                                       "text-blue-500 text-xs"],
      ["columnManagerDeselectAllBtn","전체 해제 버튼",            "컬럼 관리", "color: #9ca3af; font-size: 12px",                                                                                       "text-gray-400 text-xs"],
      ["columnManagerCloseBtn",    "닫기 버튼",                   "컬럼 관리", "color: #9ca3af; cursor: pointer",                                                                                       "text-gray-400 cursor-pointer"],
      ["columnManagerBody",        "모달 본문 (토글 목록 영역)",  "컬럼 관리", "padding: 12px; max-height: 240px; overflow-y: auto",                                                                     "p-3 max-h-60 overflow-y-auto"],
      ["columnToggle",             "컬럼 토글 항목",              "컬럼 관리", "display: flex; align-items: center; gap: 8px; padding: 6px 0",                                                          "flex items-center gap-2 py-1.5"],
      ["columnToggleActive",       "표시 중인 컬럼 토글",         "컬럼 관리", "color: #3b82f6; font-weight: 500",                                                                                      "text-blue-500 font-medium"],
      ["columnToggleCheckbox",     "토글 체크박스",               "컬럼 관리", "accent-color: #3b82f6",                                                                                                 "accent-blue-500"],
    ],
  },
  {
    label: "컬럼 리사이즈 / 드래그 / 핀",
    rows: [
      ["resizeHandle",  "리사이즈 핸들 div",         "컬럼 리사이즈",        "width: 4px; height: 100%; cursor: col-resize; background: #e5e7eb",                          "w-1 h-full cursor-col-resize bg-gray-200"],
      ["thDragging",    "드래그 중인 <th>",           "컬럼 드래그 순서 변경","opacity: 0.4",                                                                                "opacity-40"],
      ["thDragOver",    "드래그 오버된 <th>",         "컬럼 드래그 순서 변경","border-left: 2px solid #6366f1",                                                              "border-l-2 border-indigo-500"],
      ["thPinnedLeft",  "좌측 고정 <th>",             "컬럼 핀",              "position: sticky; left: 0; background: #fff; box-shadow: 2px 0 4px rgba(0,0,0,.08)",         "sticky left-0 bg-white shadow-[2px_0_4px_rgba(0,0,0,.08)]"],
      ["thPinnedRight", "우측 고정 <th>",             "컬럼 핀",              "position: sticky; right: 0; background: #fff; box-shadow: -2px 0 4px rgba(0,0,0,.08)",       "sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,.08)]"],
      ["tdPinnedLeft",  "좌측 고정 <td>",             "컬럼 핀",              "position: sticky; left: 0; background: #fff",                                                 "sticky left-0 bg-white"],
      ["tdPinnedRight", "우측 고정 <td>",             "컬럼 핀",              "position: sticky; right: 0; background: #fff",                                                "sticky right-0 bg-white"],
    ],
  },
  {
    label: "컨텍스트 메뉴 / 툴팁 / 복사",
    rows: [
      ["contextMenu",     "헤더 우클릭 컨텍스트 메뉴", "컬럼 핀 컨텍스트 메뉴", "border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.1); background: #fff; padding: 4px 0", "rounded-lg shadow-md bg-white py-1"],
      ["contextMenuItem", "컨텍스트 메뉴 항목",        "컬럼 핀 컨텍스트 메뉴", "padding: 8px 16px; font-size: 14px; cursor: pointer; width: 100%",                            "px-4 py-2 text-sm cursor-pointer w-full"],
      ["tooltip",         "셀 호버 툴팁",              "툴팁",                   "background: #1f2937; color: #fff; font-size: 12px; border-radius: 4px; padding: 4px 8px",    "bg-gray-800 text-white text-xs rounded px-2 py-1"],
      ["cellCopyMenu",    "셀 우클릭 복사 메뉴",       "복사",                   "border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.1); background: #fff",                "rounded-lg shadow-md bg-white"],
      ["cellCopyMenuItem","복사 메뉴 항목",             "복사",                   "padding: 8px 16px; font-size: 14px; width: 100%",                                             "px-4 py-2 text-sm w-full"],
    ],
  },
  {
    label: "확장 행",
    rows: [
      ["groupRow",    "그룹(부모) 행 <tr>",      "확장 행", "background: #f5f5f5; font-weight: 600",                            "bg-gray-100 font-semibold"],
      ["groupCell",   "그룹 행 <td>",            "확장 행", "cursor: pointer; user-select: none",                               "cursor-pointer select-none"],
      ["expandIcon",  "펼치기 / 접기 아이콘",    "확장 행", "transition: transform 0.2s",                                        "transition-transform duration-200"],
      ["childRow",    "자식 행 <tr>",            "확장 행", "background: rgba(255,255,255,.5)",                                  "bg-white/50"],
      ["childTd",     "자식 행 <td>",            "확장 행", "padding: 8px 0",                                                    "py-2"],
      ["childIndent", "자식 행 들여쓰기 div",    "확장 행", "width: 20px; flex-shrink: 0; border-left: 1px solid #e5e7eb",      "w-5 shrink-0 border-l border-gray-200"],
    ],
  },
  {
    label: "로딩 / 빈 상태 / 가상 스크롤",
    rows: [
      ["skeletonRow",    "스켈레톤 행 <tr>",                  "로딩",       "animation: pulse 1.5s ease-in-out infinite",       "animate-pulse"],
      ["skeletonCell",   "스켈레톤 <td>",                     "로딩",       "padding: 12px 16px",                               "px-4 py-3"],
      ["skeletonBar",    "스켈레톤 바 (shimmer 애니메이션)",  "로딩",       "height: 16px; background: #e5e7eb; border-radius: 9999px", "h-4 bg-gray-200 rounded-full"],
      ["emptyRow",       "빈 상태 행 <tr>",                   "빈 상태",    "text-align: center",                               "text-center"],
      ["emptyCell",      "빈 상태 <td>",                      "빈 상태",    "padding: 80px 0; color: #9ca3af",                  "py-20 text-gray-400"],
      ["loadMoreRow",    "더 불러오기 행 <tr>",               "가상 스크롤","text-align: center",                               "text-center"],
      ["loadMoreCell",   "더 불러오기 <td>",                  "가상 스크롤","padding: 16px",                                    "p-4"],
      ["sentinelRow",    "무한 스크롤 감지 행",               "가상 스크롤","height: 1px; visibility: hidden",                  "h-px invisible"],
      ["virtualPadding", "가상 스크롤 상·하단 패딩 행",       "가상 스크롤","background: transparent",                          "bg-transparent"],
    ],
  },
];

export default function CssClassnamesTable() {
  const [mode, setMode] = useState<Mode>("css");

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
      <table className="w-full text-sm">
        <thead className="bg-surface-container-low text-on-surface-variant">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">슬롯</th>
            <th className="px-4 py-3 text-left font-semibold">적용 요소</th>
            <th className="px-4 py-3 text-left font-semibold">관련 기능</th>
            <th className="px-4 py-3 text-left font-semibold">
              <span className="flex items-center gap-2">
                사용 예시
                <span className="flex overflow-hidden rounded-md border border-outline-variant/40 text-xs font-normal">
                  <button
                    onClick={() => setMode("css")}
                    className={[
                      "px-2 py-0.5 transition-colors",
                      mode === "css"
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
                    ].join(" ")}
                  >
                    CSS
                  </button>
                  <button
                    onClick={() => setMode("tw")}
                    className={[
                      "px-2 py-0.5 transition-colors",
                      mode === "tw"
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
                    ].join(" ")}
                  >
                    Tailwind
                  </button>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {SECTIONS.map(({ label, rows }) => (
            <Fragment key={label}>
              <tr className="border-t border-outline-variant/20 bg-surface-container-low/50">
                <td colSpan={4} className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/60">
                  {label}
                </td>
              </tr>
              {rows.map(([slot, el, desc, cssEx, twEx]) => (
                <tr key={slot} className="border-t border-outline-variant/20 transition-colors hover:bg-surface-container-lowest">
                  <td className="px-4 py-2.5 font-mono text-xs">{slot}</td>
                  <td className="px-4 py-2.5 text-on-surface-variant">{el}</td>
                  <td className="px-4 py-2.5 text-on-surface-variant">{desc}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{mode === "css" ? cssEx : twEx}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
