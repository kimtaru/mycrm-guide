# @mycrm-ui/react-table LLM Guide

## 5. Row Delete / Add

This guide is for AI agents that need to add row deletion or add-row input behavior to `@mycrm-ui/react-table`.

Use this part when the user wants per-row delete actions, a top-level add button, or an inline add row inside the table.

## Purpose

Keep these relationships clear:

- `rowActions.deletable`
- `rowActions.adding`
- per-column `insertable: true`

## Required Inputs

### Row Delete

```tsx
rowActions={{
  deletable: true,
  onDelete: (rowKey) => {
    setRows((prev) => prev.filter((row) => String(row.id) !== rowKey));
  },
}}
```

### Row Add

```tsx
const [isAdding, setIsAdding] = useState(false);

rowActions={{
  adding: isAdding,
  onAdd: handleAdd,
  onAddCancel: () => setIsAdding(false),
}}
```

### `insertable: true`

Any column that should render an add-row input must set `insertable: true`.

```tsx
{
  key: "name",
  label: "Name",
  insertable: true,
  render: (row) => row.name,
}
```

### `renderInsertCell`

Use this when a column needs a custom input UI.

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  rowActions={{
    deletable: true,
    onDelete: (rowKey) => {
      setRows((prev) => prev.filter((row) => String(row.id) !== rowKey));
    },
    adding: isAdding,
    onAdd: (values) => {
      setRows((prev) => [
        ...prev,
        { id: nextId, name: values.name },
      ]);
      setNextId((prev) => prev + 1);
      setIsAdding(false);
    },
    onAddCancel: () => setIsAdding(false),
  }}
/>
```

## LLM Decision Rules

Use this guide when the request means:

- "Add a delete button per row"
- "Let users add a new row in the table"
- "Combine selection with bulk delete"

Then:

1. Decide whether delete, add, or both are required.
2. Wire `deletable` and `onDelete` for delete.
3. Wire `adding`, `onAdd`, `onAddCancel` for add.
4. Mark addable columns with `insertable: true`.

## Common Mistakes

- Setting `adding: true` without `insertable: true`
- Forgetting to generate a stable new row key
- Deleting a row without clearing selection state
