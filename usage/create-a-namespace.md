---
description: >-
  Namespaces are simply files in which you can export stuff that you will use in
  your commands, like utils.
---

# Namespace

## Create a namespace

You must use the [CLI](https://www.npmjs.com/package/make-bot.ts) to create your namespaces to automatically create links between `app.ts` and your namespace. This will allow you to use its content directly via the `app` object without having to pollute your file with an additional import line.

### CLI pattern

```bash
bot add namespace
```
