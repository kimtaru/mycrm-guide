# @mycrm-ui/react-table LLM Guide

## 3. Checkbox Selection

This guide is for AI agents that need to add checkbox-based row selection to `@mycrm-ui/react-table`.

Use this part when the user wants multi-row selection, selected row IDs, or header-level select-all behavior.

## Purpose

Keep these three things aligned:

- stable `rowKey`
- selected key array `keys`
- `selection` prop

## Required Inputs

### `rowKey`

Selection depends on a stable row key.

```tsx
rowKey={(row) => String(row.id)}
```

### `selection.enabled`

```tsx
selection={{ enabled: true }}
```

### `keys`

```tsx
const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
```

### `onChange`

```tsx
selection={{
  enabled: true,
  keys: selectedKeys,
  onChange: setSelectedKeys,
}}
```

## Minimal Pattern

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";

export default function UserTable({ rows }: { rows: User[] }) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      selection={{
        enabled: true,
        keys: selectedKeys,
        onChange: setSelectedKeys,
      }}
    />
  );
}
```

## LLM Decision Rules

Use this guide when the request means:

- "Add checkboxes in front of rows"
- "Let users select multiple rows"
- "I need selected IDs"

Then:

1. Define a stable row key.
2. Create `string[]` selection state.
3. Wire `enabled`, `keys`, and `onChange`.

## Common Mistakes

- Setting `keys` without `enabled: true`
- Using unstable row keys such as array index
- Using numeric keys while `rowKey` returns strings

## Safe Output Template

```tsx
const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  selection={{
    enabled: true,
    keys: selectedKeys,
    onChange: setSelectedKeys,
  }}
/>
```

## Move To The Next Guide When

- selection must be combined with filtering
- bulk actions are needed
