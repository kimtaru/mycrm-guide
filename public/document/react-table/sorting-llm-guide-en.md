# @mycrm-ui/react-table LLM Guide

## 2. Sorting

This guide is for AI agents that need to add sorting to `@mycrm-ui/react-table`.

Use this part when the user wants sortable headers, an initial sort state, or multi-column sorting.

## Purpose

You must distinguish these two patterns:

- single sort: `sorting.sort`
- multi sort: `sorting.sorts`

## Required Inputs

### `sortable: true`

Every sortable column must declare `sortable: true`.

```tsx
{ key: "age", label: "Age", sortable: true, render: (row) => row.age }
```

### Single Sort State

```tsx
const [sort, setSort] = useState<SortState | null>({
  key: "age",
  direction: "asc",
});

sorting={{ sort, onSortChange: setSort }}
```

### Multi Sort State

```tsx
const [sorts, setSorts] = useState<SortState[]>([
  { key: "category", direction: "asc" },
  { key: "price", direction: "desc" },
]);

sorting={{ sorts, onSortsChange: setSorts }}
```

## Minimal Pattern

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "Name", sortable: true, render: (row) => row.name },
  { key: "age", label: "Age", sortable: true, render: (row) => row.age },
];

export default function UserTable({ rows }: { rows: User[] }) {
  const [sort, setSort] = useState<SortState | null>({
    key: "age",
    direction: "asc",
  });

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      sorting={{ sort, onSortChange: setSort }}
    />
  );
}
```

## LLM Decision Rules

Use this guide when the request means:

- "Make headers sortable"
- "Start with age ascending"
- "Sort by category, then price"

Then:

1. Mark sortable columns.
2. Decide between `sort` and `sorts`.
3. Create the correct state shape.
4. Wire the `sorting` prop.

## Common Mistakes

- Adding `sorting` without `sortable: true`
- Using `sorts` for a single-sort requirement
- Using `sort` for a multi-priority sort requirement

## Safe Output Template

```tsx
const [sort, setSort] = useState<SortState | null>({
  key: "age",
  direction: "asc",
});

<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  sorting={{ sort, onSortChange: setSort }}
/>
```

## Move To The Next Guide When

- checkbox selection is needed
- filtering is needed
- editing is needed
