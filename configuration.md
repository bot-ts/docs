---
description: Everything you need to know about the bot's configuration file.
---

# Configuration

## 🌟 Switching Between Engines

Switching between engines (package manager and runtime) is a key feature of the framework's flexibility. This section explains why it's crucial to use the CLI for this process, the issues you might face if you bypass it, and how to perform the switch seamlessly with the `bot config engine` command.

---

### ❓ Why Use the CLI for Switching?

The CLI ensures that all necessary configurations are applied consistently across your project:

1. **Updates the `package.json` Scripts**

   - The CLI modifies the scripts to match the requirements of the selected engine.
   - For example, it adjusts commands for `bun` or `deno` versus `npm` or `pnpm`.

2. **Synchronizes `.env` Variables**

   - Specific engines may require additional environment variables or tweaks.
   - The CLI automatically updates `.env` to reflect these changes.

3. **Prevents Compatibility Issues**
   - Skipping the CLI might leave residual configurations for an old engine, leading to runtime errors or build failures.
   - The CLI ensures all settings are aligned with the current engine.

---

### ⚠️ What Happens If You Don’t Use the CLI?

If you manually switch engines without the CLI, you risk the following issues:

- **Broken Scripts**: Package manager commands may not work as expected, causing builds, installs, or runs to fail.
- **Environment Misconfiguration**: Missing or incorrect `.env` values might break compatibility with your engine.
- **Inconsistent Dependencies**: Certain engines manage dependencies differently, potentially causing version conflicts.
- **Lost Features**: Some CLI-enabled features might not function correctly due to missing configurations.

---

### 🛠 How to Switch Engines

Switching engines with the CLI is straightforward and interactive:

1. Run the command:

   ```bash
   bot config engine
   ```

2. Follow the prompts step-by-step:

   - The CLI will guide you through selecting a **package manager** (e.g., `npm`, `pnpm`, `bun`).
   - It will then prompt you to choose a **runtime** (e.g., `node`, `bun`, `deno`).

3. Confirm the selections:

   - Once you've completed the prompts, the CLI will apply the changes automatically.

4. You're done!
   - Your `package.json` scripts and `.env` are now updated for the selected engine.

---

### ✨ Example Interaction

Here's an example of what using the command might look like:

```bash
bot config engine
```

**CLI Prompt:**

```
Select your package manager:
> npm
  pnpm
  bun
```

**CLI Prompt:**

```
Select your runtime:
> node
  bun
  deno
```

**CLI Response:**

```
Engine configuration updated successfully!
Scripts in package.json and values in .env have been synchronized.
```

By following these steps, you ensure that your project is always aligned with the chosen engine, avoiding potential pitfalls and maximizing compatibility.

## ✏️ Custom system message

You can create your own system message template from the configuration file.&#x20;

For example, if you want to force embedding all messages and to replace all embed titles by author properties to add the bot's avatar on header, add the following code to your configuration file:

```typescript
export const config = new Config({
  // ...
  systemMessages: async (type, data, client) => {
    const app = await import("#app")

    if (typeof data === "string" || data instanceof Error)
      return {
        embeds: [
          new EmbedBuilder()
            .setColor(app.systemColors[type])
            .setAuthor({
              name: data instanceof Error ? data.message : "System message",
              iconURL: client.user?.displayAvatarURL(),
            })
            .setDescription(data instanceof Error ? data.stack ?? null : data),
        ],
      }

    return {
      embeds: [
        new EmbedBuilder()
          .setColor(app.systemColors[type])
          .setAuthor({
            name: data.header ?? "System message",
            iconURL: client.user?.displayAvatarURL(),
          })
          .setDescription(
            data.body instanceof Error
              ? data.body.stack ?? null
              : data.body ?? null,
          )
          .setFooter(data.footer ? { text: data.footer } : null),
      ],
    }
  },
})
```
