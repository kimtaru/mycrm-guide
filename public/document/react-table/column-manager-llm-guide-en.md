# @mycrm-ui/react-table LLM Guide

## 9. Column Manager

This guide is for AI agents that need to configure column visibility, order, pinning, and resizing in `@mycrm-ui/react-table`.

Use this part when the user wants to hide/show columns, reorder them, pin them left/right, or resize widths.

## Purpose

Treat these as separate state buckets:

- `hiddenKeys`
- `order`
- `pinned`
- `widths`

## Required Inputs

### Hidden Columns

```tsx
const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

columnManager={{
  hiddenKeys,
  onHiddenKeysChange: setHiddenKeys,
}}
```

### Order

```tsx
const [order, setOrder] = useState<string[]>([]);

columnManager={{
  order,
  onOrderChange: setOrder,
}}
```

### Pinning

```tsx
const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>({});

columnManager={{
  pinned,
  onPinnedChange: setPinned,
}}
```

### Resize

```tsx
const [widths, setWidths] = useState<Record<string, number>>({});

columnManager={{
  resizable: true,
  widths,
  onWidthChange: (colKey, width) =>
    setWidths((prev) => ({ ...prev, [colKey]: width })),
}}
```

### Header Menu Entry

If `columnManager` is configured, a `Column Manager` entry is automatically added to the header menu.

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  columnManager={{
    hiddenKeys,
    onHiddenKeysChange: setHiddenKeys,
    order,
    onOrderChange: setOrder,
    pinned,
    onPinnedChange: setPinned,
    resizable: true,
    widths,
    onWidthChange: (colKey, width) =>
      setWidths((prev) => ({ ...prev, [colKey]: width })),
  }}
/>
```

## Common Mistakes

- wiring `columnManager` without connecting state
- using one array for pinning instead of `{ left, right }`
- enabling resize without persisting `widths`
