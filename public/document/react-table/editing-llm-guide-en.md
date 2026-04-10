# @mycrm-ui/react-table LLM Guide

## 6. Inline Editing

This guide is for AI agents that need to add cell-level inline editing to `@mycrm-ui/react-table`.

Use this part when the user wants cells to become editable on interaction, validation before save, or custom edit UIs per column.

## Purpose

Separate these concerns:

- whether a column is editable
- how data is saved
- which edit UI is shared vs column-specific

## Required Inputs

### `editable: true`

```tsx
{
  key: "name",
  label: "Name",
  editable: true,
  render: (row) => row.name,
}
```

### `validate`

```tsx
validate: (value) => (value.trim() ? null : "Required")
```

Return:

- `null` on success
- error string on failure

### `editing.onCellChange`

```tsx
editing={{
  onCellChange: (rowKey, colKey, value) => {
    setData((prev) =>
      prev.map((row) =>
        String(row.id) === rowKey ? { ...row, [colKey]: value } : row,
      ),
    );
  },
}}
```

### `editing.renderCell`

Shared edit UI for all editable columns.

### `renderEditCell`

Column-level custom edit UI.

Important:

- `renderEditCell` overrides `editing.renderCell`.

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  editing={{
    onCellChange: (rowKey, colKey, value) => {
      setData((prev) =>
        prev.map((row) =>
          String(row.id) === rowKey ? { ...row, [colKey]: value } : row,
        ),
      );
    },
  }}
/>
```

## LLM Decision Rules

Use this guide when the request means:

- "Make cells editable"
- "Validate before save"
- "Use select instead of input for one column"

Then:

1. Mark editable columns.
2. Add validation where needed.
3. Wire `editing.onCellChange`.
4. Choose shared vs column-specific edit UI.

## Common Mistakes

- Marking a column editable without wiring save logic
- Expecting inline error UI while also using `onValidationError`
- Forgetting that `renderEditCell` takes precedence
