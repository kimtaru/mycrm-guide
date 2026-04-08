"use client";

import { useMemo, useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ROLES = ["관리자", "편집자", "사용자"];

const INITIAL_DATA: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
  { id: 4, name: "박민수", email: "park@example.com", role: "편집자" },
  { id: 5, name: "최지은", email: "choi@example.com", role: "사용자" },
];

const INPUT_CLASS =
  "w-full rounded-lg border border-outline-variant/30 bg-surface px-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors";

const INPUT_ERROR_CLASS =
  "w-full rounded-lg border border-error/60 bg-surface px-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-error focus:ring-1 focus:ring-error/20 focus:outline-none transition-colors";

const SELECT_CLASS =
  "w-full rounded-lg border border-outline-variant/30 bg-surface px-3 py-1.5 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors";

const SELECT_ERROR_CLASS =
  "w-full rounded-lg border border-error/60 bg-surface px-3 py-1.5 text-xs text-on-surface focus:border-error focus:ring-1 focus:ring-error/20 focus:outline-none transition-colors";

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
  checkbox: "accent-primary",
  addRow: "border-t border-primary/30 bg-primary/5",
  addInput: INPUT_CLASS,
  addConfirmBtn:
    "rounded p-0.5 transition-colors hover:bg-primary/10 text-primary [&_svg]:w-4 [&_svg]:h-4",
  addCancelBtn:
    "rounded p-0.5 transition-colors hover:bg-error/10 text-on-surface-variant/60 [&_svg]:w-4 [&_svg]:h-4",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-[11px] text-error">{message}</p>
  );
}

export default function RowActionsDemo({ codeHtml }: { codeHtml: string }) {
  const [data, setData] = useState<User[]>(INITIAL_DATA);
  const [nextId, setNextId] = useState(6);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addErrors, setAddErrors] = useState<Record<string, string>>({});
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [...prev.slice(-4), msg]);

  const handleBulkDelete = () => {
    if (selectedKeys.length === 0) return;
    setData((prev) =>
      prev.filter((r) => !selectedKeys.includes(String(r.id))),
    );
    addLog(`일괄 삭제: [${selectedKeys.map((k) => `"${k}"`).join(", ")}]`);
    setSelectedKeys([]);
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        key: "id",
        label: "Key",
        width: "70px",
        render: (row) => (
          <span className="rounded bg-outline-variant/15 px-1.5 py-0.5 font-mono text-[11px] text-on-surface-variant">
            {row.id}
          </span>
        ),
      },
      {
        key: "name",
        label: "이름",
        insertable: true,
        render: (row) => row.name,
        renderInsertCell: ({ value, onChange, onConfirm }) => (
          <div>
            <input
              className={addErrors.name ? INPUT_ERROR_CLASS : INPUT_CLASS}
              placeholder="이름"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (addErrors.name)
                  setAddErrors((prev) => ({ ...prev, name: "" }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onConfirm();
              }}
            />
            <FieldError message={addErrors.name} />
          </div>
        ),
      },
      {
        key: "email",
        label: "이메일",
        insertable: true,
        render: (row) => row.email,
        renderInsertCell: ({ value, onChange, onConfirm }) => (
          <div>
            <input
              className={addErrors.email ? INPUT_ERROR_CLASS : INPUT_CLASS}
              placeholder="이메일"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (addErrors.email)
                  setAddErrors((prev) => ({ ...prev, email: "" }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onConfirm();
              }}
            />
            <FieldError message={addErrors.email} />
          </div>
        ),
      },
      {
        key: "role",
        label: "역할",
        insertable: true,
        render: (row) => row.role,
        renderInsertCell: ({ value, onChange }) => (
          <div>
            <select
              className={addErrors.role ? SELECT_ERROR_CLASS : SELECT_CLASS}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (addErrors.role)
                  setAddErrors((prev) => ({ ...prev, role: "" }));
              }}
            >
              <option value="" disabled>
                역할 선택
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <FieldError message={addErrors.role} />
          </div>
        ),
      },
    ],
    [addErrors],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        {/* 상단 액션 버튼 */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-on-primary transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              add
            </span>
            추가
          </button>
          <button
            type="button"
            onClick={handleBulkDelete}
            disabled={selectedKeys.length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-error/30 bg-error/10 px-3 py-1.5 text-xs font-medium text-error transition-colors hover:bg-error hover:text-on-error disabled:border-outline-variant/20 disabled:bg-transparent disabled:text-on-surface-variant/40"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              delete
            </span>
            삭제{selectedKeys.length > 0 && ` (${selectedKeys.length})`}
          </button>
        </div>

        <Table
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          selection={{
            enabled: true,
            keys: selectedKeys,
            onChange: setSelectedKeys,
          }}
          rowActions={{
            deletable: true,
            onDelete: (rowKey) => {
              setData((prev) => prev.filter((r) => String(r.id) !== rowKey));
              setSelectedKeys((prev) => prev.filter((k) => k !== rowKey));
              addLog(`삭제: rowKey="${rowKey}"`);
            },
            deleteIcon: (
              <span
                className="material-symbols-outlined text-[18px] text-error/70 transition-colors hover:text-error"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                delete
              </span>
            ),
            adding: isAdding,
            onAdd: (values) => {
              const errors: Record<string, string> = {};
              if (!values.name?.trim()) errors.name = "이름을 입력해주세요.";
              if (!values.email?.trim()) {
                errors.email = "이메일을 입력해주세요.";
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = "올바른 이메일 형식을 입력해주세요.";
              }
              if (!values.role) errors.role = "역할을 선택해주세요.";

              if (Object.keys(errors).length > 0) {
                setAddErrors(errors);
                return;
              }

              setAddErrors({});
              const newUser: User = {
                id: nextId,
                name: values.name,
                email: values.email,
                role: values.role,
              };
              setData((prev) => [...prev, newUser]);
              setNextId((n) => n + 1);
              setIsAdding(false);
              addLog(`추가: ${JSON.stringify(values)}`);
            },
            onAddCancel: () => {
              setAddErrors({});
              setIsAdding(false);
              addLog("추가 취소");
            },
          }}
          classNames={TABLE_CLASS_NAMES}
        />

        {log.length > 0 && (
          <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
            <p className="mb-1 text-xs font-medium text-on-surface-variant">
              이벤트 로그
            </p>
            <div className="space-y-0.5">
              {log.map((entry, i) => (
                <code key={i} className="block text-xs text-on-surface">
                  {entry}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
