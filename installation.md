---
description: >-
  To install bot.ts, please read these instructions very carefully
---

# Installation

## Prerequisites

First, you need to make sure that you have an environment compatible with bot.ts.

- Node `^=22.x.x`
- NPM `^=9.x.x`

## Install the CLI

To install bot.ts, you must first install globaly the CLI with the following command.&#x20;

```bash
npm i -g @ghom/bot.ts-cli@latest
```

Then you can run the `bot new` command and let yourself be guided.

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
