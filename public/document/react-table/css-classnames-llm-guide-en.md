# @mycrm-ui/react-table LLM Guide

## 14. CSS Customization

This guide is for AI agents that need to customize the visual appearance of `@mycrm-ui/react-table` through `classNames`.

Use this part when the user wants to change density, background colors, hover states, modal styling, tooltip styling, or other visual details without changing behavior.

## Purpose

Follow this rule:

- behavior is controlled by props
- visuals are controlled by `classNames`

## Required Inputs

### `classNames`

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  classNames={{
    table: "w-full text-sm",
    thead: "bg-surface-container-low text-on-surface-variant",
    th: "px-4 py-3 text-left font-semibold",
    tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest",
    td: "px-4 py-3 text-on-surface",
  }}
/>
```

### Common Slots

- `wrap`
- `table`
- `thead`
- `th`
- `tbody`
- `tr`
- `td`

### Feature Slots

Examples:

- filter: `filterRow`, `filterInput`, `filterSelect`
- editing: `tdEditing`, `editError`
- header menu: `headerMenuBtn`, `headerMenuDropdown`, `headerMenuItem`
- tooltip/copy: `tooltip`, `cellCopyMenu`, `cellCopyMenuItem`

## LLM Decision Rules

Use this guide when the request is about appearance, spacing, color, density, or theme.

Do not change feature props if the user only asked for styling.

## Common Mistakes

- changing behavior while trying to change styling
- overriding too many slots at once
- guessing slot names incorrectly
