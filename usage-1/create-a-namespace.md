---
description: >-
  Namespaces are simply files in which you can export stuff that you will use in
  your commands, like utils.
---

# Namespace

## Create a namespace

You must use the [CLI](https://www.npmjs.com/package/make-bot.ts) to create your namespaces to automatically create links between `app.ts` and your namespace. This will allow you to use its content directly via the `app` object without having to pollute your file with an additional import line.

### CLI pattern

By typing `bot add namespace -h` you will get this following information.

```bash
bot add namespace <name>

Positionals:
  name       # command name                                             [required]

Options:
  --version  # Show version number                                       [boolean]
  --help     # Show help                                                 [boolean]
```
