# @mycrm-ui/react-table LLM Guide

## 13. Header Menu

This guide is for AI agents that need to add a table-level header action menu to `@mycrm-ui/react-table`.

Use this part when the user wants actions such as filter toggle, filter reset, sort reset, or column manager entry in the header area.

## Purpose

Separate:

- menu trigger: `headerMenuIcon`
- menu actions: `headerMenuItems`

## Required Inputs

### Header Menu Icon

```tsx
headerMenuIcon={
  <span className="material-symbols-outlined">more_horiz</span>
}
```

### Header Menu Items

```tsx
headerMenuItems={[
  {
    label: "Reset sort",
    onClick: () => setSorts([]),
  },
]}
```

### Column Manager Integration

If `columnManager` is configured, a `Column Manager` item is automatically added to the header menu.

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  headerMenuItems={[
    {
      label: "Refresh",
      onClick: () => {},
    },
  ]}
  headerMenuIcon={
    <span className="material-symbols-outlined">more_horiz</span>
  }
/>
```

## Common Mistakes

- adding `headerMenuIcon` without `headerMenuItems`
- not wiring menu actions to real state
- treating header menu as a row-level action area
