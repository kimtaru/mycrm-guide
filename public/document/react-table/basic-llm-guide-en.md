# @mycrm-ui/react-table LLM Guide

## 1. Basic Usage

This guide is for AI agents that need to generate or modify code using `@mycrm-ui/react-table`.

Use this part when the user wants a plain read-only table without advanced features such as sorting, selection, filtering, editing, row actions, virtual scroll, or column management.

## Purpose

The basic pattern is the minimum table setup.

Prepare these three things first:

- `columns`
- `data`
- `rowKey`

If the user did not explicitly ask for more, do not add extra feature props.

## Required Inputs

### `columns`

Define the column structure.

Typical fields:

- `key`
- `label`
- `render`

```tsx
const columns: ColumnDef<User>[] = [
  { key: "name", label: "Name", render: (row) => row.name },
  { key: "email", label: "Email", render: (row) => row.email },
  { key: "role", label: "Role", render: (row) => row.role },
];
```

### `data`

An array of rows.

```tsx
const data: User[] = [
  { id: 1, name: "Hong", email: "hong@example.com", role: "Admin" },
  { id: 2, name: "Kim", email: "kim@example.com", role: "User" },
];
```

### `rowKey`

Return a stable unique key for each row.

Rules:

- Use a stable unique value.
- Prefer a real domain ID.
- Return a string.

```tsx
rowKey={(row) => String(row.id)}
```

Do not use:

- array index
- unstable computed values

## Minimal Pattern

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "Name", render: (row) => row.name },
  { key: "email", label: "Email", render: (row) => row.email },
  { key: "role", label: "Role", render: (row) => row.role },
];

export default function UserTable({ rows }: { rows: User[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
    />
  );
}
```

## LLM Decision Rules

Use this guide when the request means:

- "Show a basic table"
- "Render a list as a table"
- "Start with a simple read-only table"

Then:

1. Define the row type.
2. Create `ColumnDef<T>[]`.
3. Pass `columns`, `data`, and `rowKey`.
4. Stop there unless more features were explicitly requested.

## Allowed Additions

- `classNames` if styling is requested
- custom `render`
- minimal types needed to complete the example

## Do Not Add By Default

- `sorting`
- `selection`
- `filter`
- `editing`
- `rowActions`
- `loading`
- `scroll`
- `columnManager`
- `expand`
- `tooltip`
- `copyable`

## Common Mistakes

### Unstable `rowKey`

Bad:

```tsx
rowKey={(_, index) => String(index)}
```

Good:

```tsx
rowKey={(row) => String(row.id)}
```

### Adding advanced features too early

Do not add sorting, filtering, selection, and editing all at once without a clear request.

## Safe Output Template

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Row {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<Row>[] = [
  { key: "name", label: "Name", render: (row) => row.name },
  { key: "email", label: "Email", render: (row) => row.email },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
    />
  );
}
```

## Move To The Next Guide When

- sorting is required
- checkbox selection is required
- filtering is required
- inline editing is required
