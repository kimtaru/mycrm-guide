# @mycrm-ui/react-table LLM Guide

## 7. Loading / Empty State

This guide is for AI agents that need to handle loading and empty-table states in `@mycrm-ui/react-table`.

Use this part when the user wants skeleton rows during fetch, or a custom empty message when there is no data.

## Purpose

Do not mix these two states:

- loading: `loading.enabled`
- empty: `renderEmpty`

## Required Inputs

### `loading.enabled`

```tsx
loading={{ enabled: isLoading }}
```

### `rowCount`

```tsx
loading={{ enabled: isLoading, rowCount: 5 }}
```

### `render`

Use this when custom skeleton UI is required.

### `renderEmpty`

Usually returns a `<tr>` / `<td>` structure.

```tsx
loading={{
  enabled: isLoading,
  renderEmpty: () => (
    <tr>
      <td colSpan={4}>No data</td>
    </tr>
  ),
}}
```

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  loading={{
    enabled: isLoading,
    rowCount: 5,
    renderEmpty: () => (
      <tr>
        <td colSpan={1}>No data</td>
      </tr>
    ),
  }}
/>
```

## LLM Decision Rules

Use this guide when the request means:

- "Show skeleton rows while loading"
- "Show an empty state when there is no data"

Then:

1. Keep loading and empty logic separate.
2. Use `loading.enabled` for loading.
3. Use `renderEmpty` for empty data.

## Common Mistakes

- Showing "No data" while data is still loading
- Returning non-table markup from `renderEmpty`
- Using the wrong `colSpan`
