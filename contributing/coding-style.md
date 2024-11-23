# Coding Style Guide

This document outlines the coding standards and best practices for the bot.ts project. Following these guidelines ensures consistency and maintainability across the codebase.

## Naming Conventions

- Use **camelCase** for variable and function names.
- Use **PascalCase** for class and interface names.
- Use **SNAKE_CASE** for environment variables and file names.

## Spacing and Indentation

- Use **2 spaces** for indentation.

## Line Length

- Limit lines to a maximum of **80 characters**.

## Comments

- Only use **//** for one-line comments.
- Use **/\* \*/** for JSDoc-style comments.

## Imports

- Organize imports in "letter-count" order. (from shortest to longest)
- Avoid using relative imports.
- Use only the imports aliased in `package.json` for local imports.
- Use `import type` for types-only imports.
- Group imports by type: local imports first, followed by first-party libraries.
- Keep imports sorted alphabetically within each group.
- Remove unused imports.
- Use destructuring for commonly used imports.
- Use `* as` for every imports of file if too many imports are present in the file.

### Example

```typescript
import { Command } from "#core/command"
import { SlashCommand } from "#core/slash"
import { getSystemMessage, rootPath } from "#core/util"

import { EmbedBuilder } from "discord.js"

// or if you have too many imports

import * as all from "#all"
import discord from "discord.js"
```

## CLI

- Only use the CLI to generate the native bot.ts components.
