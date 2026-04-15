# @mycrm-ui/react-table LLM Guide

## 10. Row Pinning

This guide is for AI agents that need to add or modify flat-table row pinning in `@mycrm-ui/react-table`.

Use this part when the user wants to right-click a row, pin it to the top area, and keep that row visible while scrolling.

## Purpose

The goal of row pinning is to keep `rowPinning` state controlled outside the table and wire the pin/unpin flow through the built-in context menu.

v1 rules:

- Row pinning is supported only for flat tables.
- Do not use it with tree tables that enable `expand`.
- Pinned rows move into the top pinned area and should not stay duplicated in the body.

## Required input

### `enabled`

Turns the feature on.

```tsx
rowPinning={{
  enabled: true,
}}
```

### `keys`

The current pinned row keys.

```tsx
const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

rowPinning={{
  enabled: true,
  keys: pinnedKeys,
  onKeysChange: setPinnedKeys,
}}
```

### `onKeysChange`

The controlled update handler for pin/unpin actions.

Important rules:

- Do not rely on hidden internal state.
- Keep the `rowKey` return value and `keys` values in the same string format.

## Minimum working pattern

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Ticket {
  id: number;
  customer: string;
  owner: string;
}

const columns: ColumnDef<Ticket>[] = [
  { key: "customer", label: "Customer", render: (row) => row.customer },
  { key: "owner", label: "Owner", render: (row) => row.owner },
];

export default function TicketTable({ rows }: { rows: Ticket[] }) {
  const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      rowPinning={{
        enabled: true,
        keys: pinnedKeys,
        onKeysChange: setPinnedKeys,
      }}
    />
  );
}
```

## Optional input

### `menuLabels`

Use this when the context menu labels must be customized.

```tsx
rowPinning={{
  enabled: true,
  keys: pinnedKeys,
  onKeysChange: setPinnedKeys,
  menuLabels: {
    pin: "Pin row",
    unpin: "Unpin row",
  },
}}
```

### `pinnedClassName`

Use this when pinned rows need a distinct style.

```tsx
rowPinning={{
  enabled: true,
  keys: pinnedKeys,
  onKeysChange: setPinnedKeys,
  pinnedClassName: "bg-yellow-50",
}}
```

## LLM decision rules

Use this guide when the request means:

- "Keep important rows visible at the top"
- "Add a right-click row pin action"
- "Pin selected customer rows while the table scrolls"

In that case:

1. Confirm the target is a flat table.
2. Confirm `rowKey` returns a stable string.
3. Add a dedicated `pinnedKeys` state.
4. Connect `rowPinning.enabled`, `keys`, and `onKeysChange`.
5. Add `menuLabels` or `pinnedClassName` only when needed.

## Safe combinations

Row pinning can be combined with:

- `selection`
- `sorting`
- `filter`
- `columnManager`
- `tooltip`
- `copyable`

## Do not add in this part

Unless explicitly requested, do not mix in:

- `expand`
- tree-table row pinning
- group-row pinning
- persisted server storage
- drag-and-drop pin reordering

## Common mistakes

### Mistake 1. Passing `keys` without `onKeysChange`

Problem:

- The menu appears, but pin/unpin actions do not update.

### Mistake 2. Using a different value format in `rowKey` and `keys`

Problem:

- Pinned rows cannot be matched reliably.

Best practice:

- Use string keys consistently.

### Mistake 3. Applying v1 row pinning to tree tables

Problem:

- This breaks the intended v1 scope and introduces undefined UX rules.

Best practice:

- Treat tree-table support as a separate feature.

## Safe output template

```tsx
const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  rowPinning={{
    enabled: true,
    keys: pinnedKeys,
    onKeysChange: setPinnedKeys,
  }}
/>
```

## When to move to another guide

If the request also needs:

- column visibility, order, resize, or column pinning
  - read `column-manager-llm-guide-en.md`
- virtual scrolling or infinite loading
  - read `virtual-scroll-llm-guide-en.md`
- tooltip or right-click copy behavior
  - read `tooltip-copy-llm-guide-en.md`
