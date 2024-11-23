---
description: >-
  To install bot.ts, please read these instructions very carefully
---

# Installation

## Prerequisites

First, you need to make sure that you have an environment compatible with bot.ts.

One of these runtimes:

- Node.js `^=22.x.x`
- Deno `^=2.1.1`
- Bun `^=1.1.36` (recommended)

If you use Node.js, one of these package managers:

- npm `^=9.x.x`
- Yarn `^=1.22.22`
- pnpm `^=9.14.2`

Else, you can use the built-in package manager of Deno or Bun.

## Install the CLI

To install bot.ts, you must first install globaly the CLI with the following command.&#x20;

```bash
npm i -g @ghom/bot.ts-cli@latest
```

Then you can run the following command and let yourself be guided.

```bash
bot new

# or if you won't install the CLI globally
npx @ghom/bot.ts-cli new
pnpx @ghom/bot.ts-cli new # if you use pnpm
bunx @ghom/bot.ts-cli new # if you use bun
yarn dlx @ghom/bot.ts-cli new # if you use yarn
```

{% hint style="warning" %}
**The token is requested as part of the framework configuration;** you can view the code handling your token by clicking [here](https://github.com/search?q=repo%3Abot-ts%2Fcli%20token&type=code).
{% endhint %}

{% hint style="info" %}
The connection data to your database are all editable in the `.env` file after the build.
{% endhint %}

## Now is installed

You can now do the following command to go to the root of your project!

```bash
cd "bot-name"
```
