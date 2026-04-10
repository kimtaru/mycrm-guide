# @mycrm-ui/react-table LLM Guide

## 4. Filtering

This guide is for AI agents that need to add column-level filtering to `@mycrm-ui/react-table`.

Use this part when the user wants text search, select filters, or multi-column narrowing.

## Purpose

Separate these two layers:

- filter metadata on each column
- current filter state in the `filter` prop

## Required Inputs

### Column Filter Settings

- `filterType`
- `filterPlaceholder`
- `filterOptions`

```tsx
{
  key: "name",
  label: "Name",
  render: (row) => row.name,
  filterType: "text",
  filterPlaceholder: "Search name...",
}
```

```tsx
{
  key: "role",
  label: "Role",
  render: (row) => row.role,
  filterType: "select",
  filterOptions: [
    { label: "Admin", value: "Admin" },
    { label: "User", value: "User" },
  ],
}
```

### `filter.enabled`

```tsx
filter={{ enabled: true }}
```

### `filter.values`

```tsx
const [filterValues, setFilterValues] = useState<Record<string, string>>({});
```

### `filter.onChange`

```tsx
filter={{
  enabled: true,
  values: filterValues,
  onChange: (colKey, value) =>
    setFilterValues((prev) => ({ ...prev, [colKey]: value })),
}}
```

### `filter.debounce`

Add debounce when text filtering should not react immediately.

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  filter={{
    enabled: true,
    values: filterValues,
    onChange: (colKey, value) =>
      setFilterValues((prev) => ({ ...prev, [colKey]: value })),
    debounce: 300,
  }}
/>
```

## LLM Decision Rules

Use this guide when the request means:

- "Add per-column search"
- "Search by name and filter by role"
- "Show filter inputs under the header"

Then:

1. Decide which columns are filterable.
2. Pick the right filter type for each column.
3. Add filter metadata to columns.
4. Create a `Record<string, string>` state object.
5. Wire the `filter` prop.

## Common Mistakes

- Adding `filter` state without column `filterType`
- Using `select` without `filterOptions`
- Managing all filters as a single string

## Safe Output Template

```tsx
const [filterValues, setFilterValues] = useState<Record<string, string>>({});

<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  filter={{
    enabled: true,
    values: filterValues,
    onChange: (colKey, value) =>
      setFilterValues((prev) => ({ ...prev, [colKey]: value })),
  }}
/>
```

## Move To The Next Guide When

- row actions or editing must be combined with filters
