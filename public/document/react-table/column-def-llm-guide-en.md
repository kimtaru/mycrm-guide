# @mycrm-ui/react-table LLM Guide

## 15. ColumnDef Options

This guide is for AI agents that need to configure `ColumnDef` options in `@mycrm-ui/react-table`.

Use this part when the request is specifically about column-level capabilities such as sorting, filtering, editing, inserting, alignment, copying, or validation.

## Purpose

Treat `ColumnDef` as a set of feature groups, not as a flat option dictionary.

Typical groups:

- basic display
- layout
- sorting / filtering
- editing / inserting
- copying / validation

## Required Inputs

### Basic Options

- `key`
- `label`
- `render`

```tsx
{
  key: "name",
  label: "Name",
  render: (row) => row.name,
}
```

### Layout

- `width`
- `minWidth`
- `align`

### Sorting / Filtering

- `sortable`
- `filterType`
- `filterOptions`
- `filterPlaceholder`

### Editing / Insert

- `editable`
- `insertable`
- `validate`
- `renderEditCell`
- `renderInsertCell`
- `onValidationError`

### Copy

- `copyable`

## Minimal Pattern

```tsx
const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "Name",
    width: "160px",
    sortable: true,
    filterType: "text",
    editable: true,
    render: (row) => row.name,
    validate: (value) => (value.trim() ? null : "Required"),
  },
];
```

## LLM Decision Rules

Use this guide when the request means:

- "This column should be sortable"
- "This column needs a select filter"
- "Only this column should be editable"
- "This column should be copyable"

Then:

1. Check whether the request is column-level.
2. Pick only the option group that matches the request.
3. Respect option dependencies.

Examples:

- sorting: `sortable`
- filter: `filterType` + optional `filterOptions`
- editing: `editable` + optional `validate`
- add-row: `insertable`
- copy: `copyable`

## Common Mistakes

- solving a column request with table-wide props first
- using `filterType: "select"` without `filterOptions`
- adding `editable` when the real need is `insertable`
