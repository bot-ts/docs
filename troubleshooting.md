---
description: Read this category if you have any issues with the framework or the CLI.
---

# Troubleshooting

## PSSecurityException on install

When using the CLI, your console displays an error of type **PSSecurityException**. (picture attached)

![](.gitbook/assets/troubleshooting.png)

### Fix PSSecurityException

Open your **PowerShell** **as administrator** and simply enter the following command.

```bash
set-executionpolicy remotesigned
```

## Restricted imports

For any Node.js built-in package. Exemple for `util`:

```typescript
import { inspect } from "util"
```

```
'util' import is restricted from being used by a pattern.
```

### Fix restricted imports

Replace `"util"` by `"node:util"`

## The CLI crashes on Bun after ~16 answers

The fix is not yet found. [Issue 15174](https://github.com/oven-sh/bun/issues/15174)

## The CLI's `new` command is stuck at the final step with Deno

### Fix CLI stuck with Deno

Use `bun` or `node` to run the CLI instead. Example:

```bash
bot new
# or
npx @ghom/bot.ts-cli new
# or
bunx @ghom/bot.ts-cli new
```
