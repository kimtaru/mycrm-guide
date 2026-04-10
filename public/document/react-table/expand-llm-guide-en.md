# @mycrm-ui/react-table LLM Guide

## 10. Expandable Rows

This guide is for AI agents that need to render hierarchical expandable data in `@mycrm-ui/react-table`.

Use this part when the user wants grouped rows such as department → team → member, or nested child rows with selection or deletion.

## Purpose

Separate:

- parent row type
- child row type
- `ExpandDef<TParent, TChild>`
- recursive `childExpandDef`

## Required Inputs

### `ExpandDef`

Core fields:

- `children`
- `childRowKey`
- `childColumns`
- `renderGroupLabel`

```tsx
const teamExpandDef: ExpandDef<Team, Member> = {
  children: (team) => team.members,
  childRowKey: (member) => String(member.id),
  childColumns: memberColumns,
  renderGroupLabel: (team) => <strong>{team.name}</strong>,
};
```

### `childExpandDef`

Use this when child rows are also groups.

### Expanded Keys

```tsx
const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

expand={{
  def: deptExpandDef,
  keys: expandedKeys,
  onKeysChange: setExpandedKeys,
}}
```

### Child Selection / Delete

```tsx
expand={{
  def: deptExpandDef,
  keys: expandedKeys,
  onKeysChange: setExpandedKeys,
  childSelection: {
    enabled: true,
    keys: selectedChildKeys,
    onChange: setSelectedChildKeys,
  },
  childDeletable: true,
  onChildDelete: (groupKey, childKey) => {},
}}
```

## Common Mistakes

- mixing parent and child types into one shape
- using unstable `childRowKey`
- forgetting `childExpandDef` for multi-level nesting
