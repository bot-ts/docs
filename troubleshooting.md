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

## SyntaxError: Cannot use import outside a module

When you launch the bot after an update from a version older than the "Arliming" release, you may need to update the package.json file. This problem is due to a conversion of the module system of bot.ts (from CommonJS to ESModule).

![](.gitbook/assets/typemodule.png)

### Fix SyntaxError: Cannot use import outside a module

Just add the `"type": "module",` entry to the package.json file!

## ERR\_MODULE\_NOT\_FOUND on launch

When you launch the bot after an update from a version older than the "Arliming" release, some imports may be obsolete. This problem is due to a conversion of the module system of bot.ts (from CommonJS to ESModule).

![](.gitbook/assets/err\_module\_not\_found.png)

### Fix ERR\_MODULE\_NOT\_FOUND

1. Go to the file at this location: `src/app.js` (The second path underlined in red)
2. Search for the module import `src/app.native`(The first path underlined in red)
3. Add `.js` at the end of the import path.

{% hint style="info" %}
Tip for Jetbrains IDEs

1. Press `ctrl` + `shift` + `R` to open the replacement-tool.
2. Switch to regex mode.
3. Use the two following regex and click on "Replace all" for each.<img src=".gitbook/assets/image (2) (1) (2).png" alt="Set 1: Replace all basic imports" data-size="original"><img src=".gitbook/assets/image (1).png" alt="Set 2: Replace all app.js imports" data-size="original">
{% endhint %}
