# Migrate to v9

Welcome to the migration guide for `v9.0.0-Nirbose`. This guide will help you transition from `v8.0.0-Capi` (or earlier versions) to the latest release. Due to the breaking changes and significant restructuring introduced in this version, careful attention to the migration steps is essential.

---

## 🚀 Why Upgrade?

Version `v9.0.0-Nirbose` represents a major overhaul, introducing:

- Full support for **Bun** and **Deno**.
- **Package manager agnosticism** for `npm`, `yarn`, `pnpm`, `bun`, and `deno`.
- A **modern CLI** with new features.
- Simplified project setup with cleaner dependencies and improved templating using **EJS**.

Migrating ensures access to these advancements while maintaining compatibility with the latest tools.

---

## ⚠️ Breaking Changes

1. **Project Structure Update**

   The `app/` directory has been replaced by `core/`.  
   Update your imports accordingly:

   ```diff
   - import * as app from "#app";
   + import * as all from "#all";

   - import { Foo } from "#app";
   + import { Foo } from "#core/foo";
   ```

2. **Node.js Built-in Module Imports**  
   All Node.js built-in imports must now include the `node:` prefix:

   ```diff
   - import path from "path";
   + import path from "node:path";
   ```

3. **Discord.js Imports**  
   If you're using `EmbedBuilder` or other classes from `discord.js`, ensure you import directly from the library:

   ```diff
   - import { EmbedBuilder } from "#app";
   + import { EmbedBuilder } from "discord.js";
   ```

4. **Removed File Extensions**  
   All file imports should omit extensions:
   ```diff
   - import { Foo } from "./foo.js";
   + import { Foo } from "./foo";
   ```

5. **Moved ResponseCache**  
   The `ResponseCache` class has been removed from the core files:
   ```diff
   - import { ResponseCache } from "#database";
   + import { ResponseCache } from "@ghom/orm";
   ```

---

## 🛠 Migration Steps

### 1. Install the latest CLI

- Install the latest version of the CLI globally:
  ```bash
  npm i -g @ghom/bot.ts-cli@latest
  ```

---

### 2. Remove the ESBuild package

- Remove the `esbuild` package from your project to prevent crashes:
  ```bash
  npm remove --purge @esbuild/linux-x64
  ```

---

### 3. Install required packages

- Install the following packages before running the update script:
  ```bash
  npm install dotenv ejs fast-glob git-commit-info
  ```

---

### 4. Download the required files

- Create a `scripts/` directory at the root of your bot project:
  ```bash
  mkdir scripts
  ```
- Download the [framework updater](https://raw.githubusercontent.com/bot-ts/framework/refs/heads/master/scripts/update-framework.js) into the `scripts/` folder as `update-framework.js`.
- Download the [compatibility file](https://raw.githubusercontent.com/bot-ts/framework/refs/heads/master/compatibility.json) and place it **at the root** of your bot as `compatibility.json`.

---

### 5. Run the update script

- From the root of your bot project, **in a bash terminal**, run the update script:

  ```bash
  node scripts/update-framework.js
  ```

- This script will:
  - Update all native framework files.
  - Install new dependencies required for the updated framework.

---

### 6. Clean up old files

- Delete the following files and folders:
  ```bash
  rm -rf src/app/ src/app.ts src/app.native.ts tests/ templates/button templates/command templates/cron templates/listener templates/mysql2 templates/pg templates/slash templates/sqlite3 templates/table
  ```

---

### 7. Configure the engine

- Define your **engine** (package manager and runtime) using the CLI:

  ```bash
  bot config engine
  ```

- This command will:
  - Update the scripts in `package.json`.
  - Set the appropriate values in the `.env` file.

---

### 8. Adapt Your Custom Files

- Convert all custom files in your project to account for the [breaking changes](#breaking-changes) listed earlier.
- Pay special attention to updated import paths, the removal of file extensions, and required prefixes for Node.js built-ins.

---

## 🚨 Deprecated Versions

All versions prior to `v9.0.0` are now officially deprecated. Support and updates are no longer provided for these versions. We strongly recommend migrating to `v9.0.0-Nirbose` to benefit from enhanced features and long-term stability.
