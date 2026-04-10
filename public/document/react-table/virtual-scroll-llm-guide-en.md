# @mycrm-ui/react-table LLM Guide

## 8. Virtual Scroll

This guide is for AI agents that need to add virtual scrolling or infinite loading to `@mycrm-ui/react-table`.

Use this part when the user wants large datasets rendered efficiently or more rows loaded when the user reaches the bottom.

## Purpose

Keep these requirements together:

- `scroll.virtual: true`
- fixed `rowHeight`
- actual scroll container height
- `onLoadMore`, `hasMore`, `loadingMore`

## Required Inputs

### `scroll.virtual`

```tsx
scroll={{ virtual: true }}
```

### `scroll.rowHeight`

Required for virtual scroll.

```tsx
scroll={{ virtual: true, rowHeight: 48 }}
```

### `classNames.wrap`

The scroll container must have a fixed height and vertical overflow.

```tsx
classNames={{ wrap: "h-[380px] overflow-y-auto" }}
```

### Infinite Loading

```tsx
scroll={{
  virtual: true,
  rowHeight: 48,
  onLoadMore: handleLoadMore,
  hasMore,
  loadingMore,
}}
```

## Minimal Pattern

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  scroll={{
    virtual: true,
    rowHeight: 48,
    stickyHeader: true,
    onLoadMore: handleLoadMore,
    hasMore,
    loadingMore,
  }}
  classNames={{
    wrap: "h-[380px] overflow-y-auto",
  }}
/>
```

## Common Mistakes

- forgetting `rowHeight`
- forgetting container height / overflow
- missing duplicate-load guards in `onLoadMore`
