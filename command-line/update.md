---
description: The bot.ts core files updater command.
---

# Update

{% hint style="danger" %}
**This script overwrite your files**, please read the entierty of this page before using this script!
{% endhint %}

## Usage

{% tabs %}
{% tab title="npm" %}

```bash
npm run update
```

{% endtab %}

{% tab title="Yarn" %}

```bash
yarn update
```

{% endtab %}

{% tab title="Bun" %}

```bash
bun run update
```

{% endtab %}
{% endtabs %}

## Which files are update?

All files in the `src/app` folder are affected by the update. But also all the files which correspond with the following glob pattern are affected too: `src/**/*.native.ts`

Here is a list of special files that will always be updated.

```bash
.gitattributes
.gitignore
tsconfig.json
src/index.ts
```

## Customize native file and ignore it during an update

If you want to customize a native file (`*.native.ts`), the first step is to **disable updates** on this file. It's easy, **just remove the `native` part of file name**. (e.g. `eval.native.ts` becomes `eval.ts`)

## You get an error while using the command&#x20;

If you get an error telling you that your Gulpfile has been changed, don't worry! You simply have to **rerun the command** in order to use the new Gulpfile to update the framework.
