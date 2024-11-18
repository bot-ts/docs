# CLI Overview

## CLI commands

The following commands are included in [make-bot.ts](https://github.com/GhomKrosmonaute/make-bot.ts). Use these sub commands via the `bot` command to create bot objects or any else.

Type `bot <command> --help` to get help about the sub command.

<table><thead><tr><th width="211">Command</th><th>Description</th></tr></thead><tbody><tr><td><code>bot new</code></td><td>Generate a new bot</td></tr><tr><td><code>bot config</code></td><td>Update the bot configuration</td></tr><tr><td><code>bot add</code></td><td>Generate a bot component</td></tr></tbody></table>

## PackageJSON scripts

Use these scripts via `yarn`, `npm run` of `bun run` to manage your project.

<table><thead><tr><th width="121">Command</th><th>Description</th></tr></thead><tbody><tr><td><a href="build.md">build</a></td><td>Compile TypeScript from <code>./src</code> to <code>./dist</code> directory</td></tr><tr><td><a href="start.md">start</a></td><td>Build and run the bot from <code>./dist</code></td></tr><tr><td><a href="format.md">format</a></td><td>Beatify files in <code>./src</code> using a <code>--no-semi</code> config</td></tr><tr><td><a href="lint.md">lint</a></td><td>Run ESLint on source code for code linting</td></tr><tr><td><a href="watch.md">watch</a></td><td>Build, run and watch files</td></tr><tr><td><a href="test.md">test</a></td><td>Check if TypeScript types are valids and if the bot run correctly</td></tr><tr><td><a href="update.md">update</a></td><td>Update core/native files of bot.ts</td></tr><tr><td><a href="./">readme</a></td><td>Generate a readme from your bot files</td></tr><tr><td><a href="final.md">final</a></td><td>Same of the build command, but optimized for production</td></tr></tbody></table>
