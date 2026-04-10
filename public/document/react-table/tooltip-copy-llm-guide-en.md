# @mycrm-ui/react-table LLM Guide

## 12. Tooltip / Copy

This guide is for AI agents that need to add hover tooltips and right-click copy behavior to `@mycrm-ui/react-table`.

Use this part when the user wants truncated values revealed on hover, or selected cells copied through a context menu.

## Purpose

Keep these separate:

- `tooltip`: hover visibility
- `copyable`: copy interaction

## Required Inputs

### Tooltip

```tsx
tooltip={true}
```

### Global Copy Enable

```tsx
copyable={true}
```

### Per-Column Copy

```tsx
{
  key: "sku",
  label: "SKU",
  copyable: true,
  render: (row) => row.sku,
}
```

Important:

- global `copyable={true}` is not enough
- copyable columns also need `copyable: true`

### Copy Event

```tsx
onCellCopy={(rowKey, colKey, value) => {
  console.log(rowKey, colKey, value);
}}
```

### Custom Menu Items

```tsx
cellContextMenuItems={[
  {
    label: "Log value",
    onClick: ({ rowKey, colKey, value }) => {},
  },
]}
```

## Common Mistakes

- enabling global copy without marking columns as copyable
- treating tooltip and copy as the same feature
