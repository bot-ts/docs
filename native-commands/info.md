---
description: Command to fetch information about the bot, including dependencies, uptime, memory usage, and cache statistics.
---

# Info

## Description

The `info` command provides detailed information about the bot, such as its uptime, memory usage, ping, and other statistics. Additionally, it can display the dependencies used by the bot if the `--dependencies` flag is set.

## Command Pattern

In the Discord server where you invited the bot, use the following command pattern in a channel accessible by the bot.

```bash
.info [--dependencies]
```

For example:

```bash
.info
```

### Flags

- `--dependencies` (aliases: `--deps`, `--all`, `-d`): Show the bot's dependencies and dev dependencies.

## Examples

### Basic Info

Retrieve basic information about the bot:

```bash
.info
```

### Info with Dependencies

Retrieve bot information along with a list of dependencies:

```bash
.info --dependencies
```

## Output

The output includes the following sections:

- **Bot Information**: Name, author, uptime, memory usage, ping, database client, and Node.js version.
- **Cache Statistics**: Number of guilds, users, members, channels, roles, and cached messages.
- **Dependencies**: List of dependencies and dev dependencies (if `--dependencies` flag is used).

## Annexes

* [Command file](https://github.com/bot-ts/framework/blob/master/src/commands/info.native.ts)
