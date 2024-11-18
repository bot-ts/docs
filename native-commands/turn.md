---
description: Command to enable or disable command handling for the bot.
---

# Turn

## Description

The `turn` command allows the bot owner to enable or disable the handling of commands. This can be useful for maintenance or preventing the bot from responding to commands temporarily.

## Command Pattern

In the Discord server where you invited the bot, use the following command pattern in a channel accessible by the bot.

```bash
.turn <activated>
```

For example:

```bash
.turn true
```

### Aliases

- `power`

## Arguments

- `activated` (required): A boolean indicating whether command handling should be activated (`true`) or deactivated (`false`). If not provided, it will toggle the current state.

## Examples

### Activate Command Handling

Enable command handling:

```bash
.turn true
```

### Deactivate Command Handling

Disable command handling:

```bash
.turn false
```

### Toggle Command Handling

If no argument is provided, the command toggles the current state of command handling.

```bash
.turn
```

## Output

The output confirms whether command handling has been activated or disabled.

## Annexes

- [Command file](https://github.com/bot-ts/framework/blob/master/src/commands/turn.native.ts)
