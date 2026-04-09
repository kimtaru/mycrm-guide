"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
}

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest transition-colors",
  td: "px-4 py-3 text-on-surface",
  tooltip: "rounded-md bg-inverse-surface px-2.5 py-1.5 text-xs text-inverse-on-surface shadow-md",
  cellCopyMenu: "rounded-lg border border-outline-variant/30 bg-surface shadow-lg py-1",
  cellCopyMenuItem: "px-3 py-1.5 text-sm text-on-surface hover:bg-surface-container cursor-pointer",
};

const INITIAL_DATA: Product[] = [
  { id: 1, name: "MacBook Pro 14인치 M3 Pro 칩 36GB RAM 512GB SSD", sku: "MBP-14-M3PRO-36-512", category: "노트북", price: "2,990,000원" },
  { id: 2, name: "iPhone 15 Pro Max 256GB 티타늄 내추럴", sku: "IPH-15PROMAX-256-NT", category: "스마트폰", price: "1,890,000원" },
  { id: 3, name: "iPad Air M2 256GB Wi-Fi + Cellular 스타라이트", sku: "IPA-M2-256-CELL-SL", category: "태블릿", price: "1,149,000원" },
  { id: 4, name: "AirPods Pro 2세대 USB-C MagSafe 충전 케이스", sku: "APP-2G-USBC-MAGSAFE", category: "이어폰", price: "359,000원" },
  { id: 5, name: "Apple Watch Ultra 2 49mm 티타늄 오션 밴드", sku: "AW-ULTRA2-49-OCEAN", category: "스마트워치", price: "1,249,000원" },
];

type CopyEntry = {
  rowKey: string;
  colKey: string;
  value: string;
};

export default function TooltipCopyDemo({ codeHtml }: { codeHtml: string }) {
  const [copyLog, setCopyLog] = useState<CopyEntry[]>([]);

  const columns: ColumnDef<Product>[] = [
    {
      key: "name",
      label: "상품명",
      width: "200px",
      copyable: true,
      render: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-on-surface">
          {row.name}
        </div>
      ),
    },
    {
      key: "sku",
      label: "SKU",
      width: "160px",
      copyable: true,
      render: (row) => (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-on-surface-variant">
          {row.sku}
        </div>
      ),
    },
    {
      key: "category",
      label: "카테고리",
      width: "110px",
      render: (row) => (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
          {row.category}
        </span>
      ),
    },
    {
      key: "price",
      label: "가격",
      width: "120px",
      copyable: true,
      render: (row) => row.price,
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <p className="mb-3 text-xs text-on-surface-variant">
          상품명·SKU 셀에 호버하면 툴팁이 표시됩니다. 우클릭하면 복사 메뉴가 열립니다.
        </p>

        <Table<Product>
          columns={columns}
          data={INITIAL_DATA}
          rowKey={(row) => String(row.id)}
          tooltip={true}
          copyable={true}
          onCellCopy={(rowKey, colKey, value) => {
            setCopyLog((prev) => [{ rowKey, colKey, value }, ...prev].slice(0, 5));
          }}
          classNames={TABLE_CLASS_NAMES}
        />

        <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
          <p className="mb-2 text-xs font-medium text-on-surface-variant">복사 로그</p>
          {copyLog.length === 0 ? (
            <p className="text-xs text-on-surface-variant/60">아직 복사된 값이 없습니다.</p>
          ) : (
            <ul className="space-y-1">
              {copyLog.map((entry, i) => (
                <li key={i} className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    row #{entry.rowKey}
                  </span>
                  <span className="text-on-surface-variant">{entry.colKey}</span>
                  <span className="font-mono text-on-surface">{entry.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
