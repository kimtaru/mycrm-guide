# @mycrm-ui/react-table LLM Guide

## 11. Row Click / Keyboard Navigation

This guide is for AI agents that need to add row click events, double-click events, keyboard navigation, and focused-cell tracking to `@mycrm-ui/react-table`.

Use this part when the user wants clickable rows, arrow-key movement, or Enter-based editing from a focused cell.

## Purpose

Separate:

- row interactions: click / double click
- cell focus movement: keyboard navigation

## Required Inputs

### Row Click

```tsx
onRowClick={(row, rowKey) => {
  console.log(rowKey, row.name);
}}
```

### Row Double Click

```tsx
onRowDoubleClick={(row, rowKey) => {
  console.log(rowKey, row.name);
}}
```

### Keyboard Navigation

```tsx
keyboardNavigation={true}
```

### Focused Cell Tracking

```tsx
const [focusedCell, setFocusedCell] = useState<{
  rowKey: string;
  colKey: string;
} | null>(null);

onFocusedCellChange={setFocusedCell}
```

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  onRowClick={(row, rowKey) => {
    console.log(rowKey);
  }}
  keyboardNavigation={true}
  onFocusedCellChange={setFocusedCell}
/>
```

## Common Mistakes

- expecting focus tracking without enabling keyboard navigation
- unstable `rowKey`
- mixing row click handling with cell edit logic
