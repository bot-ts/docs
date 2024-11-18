---
description: This page provides an overview of additional utility functions and types that are exported for use in your application.
---

# Other Utilities

```typescript
import * as util from "#core/util"
```

---

## PermissionsNames Type

The `PermissionsNames` type represents the keys of the `PermissionFlagsBits` object from Discord v10, allowing for type-safe permission handling.

```ts
export type PermissionsNames = keyof typeof v10.PermissionFlagsBits
```

---

## `divider` Function

The `divider` function is used to split an array into smaller sections based on a specified number of items per division.

### Type signature:

```ts
export function divider<T, Out>(
  items: T[],
  itemCountByDivision: number,
  mapping?: (section: T[], index: number, all: T[][]) => Out,
): T[][] | Promise<Out[]>
```

### Example:

```ts
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const dividedItems = await divider(items, 3)
```

---

## `whileLoop` Function

The `whileLoop` function provides a mechanism to execute a loop based on a set of conditions. It continuously calls the iteration function until the conditions are met.

### Parameters:

- **`options`**: An object containing the following properties:
  - `resolveValue`: A function to resolve the current value.
  - `canIterate`: A condition function to determine if the loop should continue.
  - `iteration`: A function to execute on each iteration.
  - `after`: An optional function to call after the loop finishes.

### Source:

```ts
export async function whileLoop<Value>(options: {
  resolveValue: (index: number) => Promise<Value>
  canIterate: (value: Value, tick: number) => boolean
  iteration: (value: Value, tick: number) => unknown
  after?: (value: Value, ticks: number) => unknown
}): Promise<Value> {
  const { resolveValue, canIterate, iteration } = options

  let value = await resolveValue(0)
  let tick = 0

  while (canIterate(value, tick)) {
    iteration(value, tick)
    value = await resolveValue(tick)
    tick++
  }

  options.after?.(value, tick)

  return value
}
```

---

## `scrap` Function

The `scrap` function resolves a value that can either be a direct value or a function that returns a value.

### Parameters:

- **`item`**: A resolvable item, either a value or a function.
- **`...args`**: Parameters to pass to the function if it is resolvable.

### Example:

```ts
const foo: Record<string, app.Scrap<number, [string]>> = {
  bar: (text: string) => 42 + text,
  baz: 100,
}

const bar = scrap(foo.bar, "hello") // 42
const baz = scrap(foo.baz, "world") // 100
```

---

## `omit` Function

The `omit` function creates a new object by excluding specified keys from the original object.

### Parameters:

- **`item`**: The original object from which keys will be omitted.
- **`...keys`**: The keys to be omitted.

### Example:

```ts
const original = { a: 1, b: 2, c: 3 }
const result = app.omit(original, "b")
// result: { a: 1, c: 3 }
```

---

## `pick` Function

The `pick` function creates a new object by selecting specified keys from the original object.

### Parameters:

- **`item`**: The original object from which keys will be picked.
- **`...keys`**: The keys to be picked.

### Example:

```ts
const original = { a: 1, b: 2, c: 3 }
const result = app.pick(original, "a", "c")
// result: { a: 1, c: 3 }
```

---
