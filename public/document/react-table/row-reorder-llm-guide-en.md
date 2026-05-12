# @mycrm-ui/react-table LLM Guide

## Row Reorder

Use this guide when an AI agent needs to create or modify drag-and-drop row reordering for a flat `@mycrm-ui/react-table` table.

Use this section when the user asks to reorder rows, drag a reorder column, or change list priority through drag and drop.

## Purpose

Row reordering uses the `rowReorder` option to choose a drag handle column and report the next row key order to external state.

Rules for v1:

- Use row reordering with flat tables.
- `rowKey` must return stable strings.
- The table does not mutate `data` internally. Consumers must reorder the `data` array in `onOrderChange`.
- Use `isRowReorderable` when some rows must stay locked at their original indexes.
- Do not combine this with `expand` or `rowPinning`.

## Required Inputs

### `handleColumnKey`

The column key used as the row drag handle.

```tsx
const columns: ColumnDef<Row>[] = [
  { key: "reorder", label: "Order", render: () => "⋮⋮" },
  { key: "name", label: "Name", render: (row) => row.name },
];
```

```tsx
rowReorder={{
  enabled: true,
  handleColumnKey: "reorder",
  onOrderChange: handleOrderChange,
}}
```

### `onOrderChange`

Receives the reordered row key array after drop.

Rules:

- The argument is an array of strings returned by `rowKey`.
- Reorder existing `data` from this key array.
- Defensively ignore missing keys.

## Minimal Pattern

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Task {
  id: number;
  title: string;
  owner: string;
  locked: boolean;
}

const columns: ColumnDef<Task>[] = [
  {
    key: "reorder",
    label: "Order",
    width: "64px",
    align: "center",
    render: (row) => (row.locked ? "Locked" : "⋮⋮"),
  },
  { key: "title", label: "Task", render: (row) => row.title },
  { key: "owner", label: "Owner", render: (row) => row.owner },
];

const initialRows: Task[] = [
  { id: 2, title: "Send quote", owner: "Jun", locked: true },
  { id: 1, title: "Review contract", owner: "Hannah", locked: false },
  { id: 3, title: "Follow-up meeting", owner: "Yujin", locked: false },
];

export default function TaskTable() {
  const [rows, setRows] = useState(initialRows);

  const handleOrderChange = (order: string[]) => {
    setRows((prev) => {
      const rowMap = new Map(prev.map((row) => [String(row.id), row]));
      return order
        .map((key) => rowMap.get(key))
        .filter((row): row is Task => row !== undefined);
    });
  };

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      rowReorder={{
        enabled: true,
        handleColumnKey: "reorder",
        onOrderChange: handleOrderChange,
        isRowReorderable: (row) => !row.locked,
      }}
    />
  );
}
```

## Optional Inputs

### `dragOverColor`

Use this to customize the insertion marker color.

```tsx
rowReorder={{
  enabled: true,
  handleColumnKey: "reorder",
  onOrderChange: handleOrderChange,
  dragOverColor: "rgba(79, 70, 229, 0.8)",
}}
```

### `isRowReorderable`

Use this when some rows must be excluded from drag reordering and keep their original array indexes.

```tsx
rowReorder={{
  enabled: true,
  handleColumnKey: "reorder",
  onOrderChange: handleOrderChange,
  isRowReorderable: (row) => !row.locked,
}}
```

Rules:

- Rows returning `false` cannot start dragging.
- Locked rows keep their original positions in the final order calculation.
- Even if the relative order between locked rows does not matter to the product, it is safest to think of them as being reinserted into their original slots.

### `classNames`

Use class name slots to style drag states.

```tsx
classNames={{
  trDragging: "opacity-50",
  trDragOver: "bg-primary/5",
  tdRowDragHandle: "cursor-grab active:cursor-grabbing",
}}
```

## LLM Decision Rules

Use this guide when the user asks for:

- Dragging rows to change order
- A reorder column that acts as a row handle
- Priority lists that can be sorted by drag and drop

Implementation order:

1. Confirm the target is a flat table.
2. Use a stable `rowKey`.
3. Add a dedicated drag handle column.
4. Add `isRowReorderable` if some rows must stay locked.
5. Wire `rowReorder.enabled`, `handleColumnKey`, and `onOrderChange`.
6. Reorder `data` state in `onOrderChange`.
7. Add `tdRowDragHandle`, `trDragging`, or `trDragOver` styles if needed.

## Allowed Combinations

- `selection`
- `editing`
- `rowActions`
- `tooltip`
- `copyable`
- basic `classNames`

When multiple interactions are present, keep dragging limited to the handle column.

## Avoid

- Do not use with `expand`.
- Do not use with `rowPinning`.
- Be careful with sorting or filtering because visible order and source data order can have different meanings.
- For persistence, call a save API after `onOrderChange`.

## Common Mistakes

### Mistake 1. Not updating state in `onOrderChange`

The drop fires, but the row order snaps back.

Reorder the `data` state immediately from the key array.

### Mistake 2. Using array index as `rowKey`

The key changes when the row order changes, making rendering and DnD unstable.

Use a real domain ID converted to a string.

### Mistake 3. Making every cell draggable

This conflicts with click, edit, selection, and context menu interactions.

Use only the dedicated `handleColumnKey` column as the drag handle.

### Mistake 4. Treating locked rows like normal reorder targets

This can move rows the product expected to keep fixed.

Use `isRowReorderable` to declare the lock rule and trust the returned order to preserve those original positions.
