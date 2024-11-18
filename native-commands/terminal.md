---
description: Command to execute shell commands from Discord.
---

# Terminal

## Description

The `terminal` command allows the bot owner to execute shell commands directly from Discord. This can be useful for managing the server or performing administrative tasks remotely.

## Command Pattern

In the Discord server where you invited the bot, use the following command pattern in a channel accessible by the bot.

```bash
.terminal <cmd>
```

For example:

```bash
.terminal ls -la
```

### Aliases

- `term`
- `cmd`
- `command`
- `exec`
- `>`
- `process`
- `shell`

### Cooldown

There is a global cooldown of 5 seconds to prevent command spamming.

## Arguments

- `cmd` (required): The shell command to run.

## Examples

### Basic Command

Execute a basic shell command:

```bash
.terminal pwd
```

### List Files

List files in the current directory:

```bash
.terminal ls -la
```

### Check Disk Usage

Check the disk usage of the system:

```bash
.terminal df -h
```

## Output

The output of the command is sent back to the Discord channel. If the command succeeds, the output is displayed in a success message. If the command fails, the error message is displayed.

### Success Output

The output is truncated to 2000 characters if it exceeds Discord's message limit.

### Error Output

If an error occurs, an error message with the error details is displayed.

## Annexes

- [Command file](https://github.com/bot-ts/framework/blob/master/src/commands/terminal.native.ts)
