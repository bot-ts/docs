---
description: Advanced database command for executing SQL queries and managing database plans.
---

# Database

## Description

The `database` command allows the bot owner to run SQL queries directly on the bot's database. This can be useful for testing, debugging, or managing data within the server. 

## Command Pattern

In the Discord server where you invited the bot, use the following command pattern in a channel accessible by the bot.

```bash
.database <query>
```

For example:

```bash
.database SELECT * FROM users
```

### Automatic Replacement

Certain placeholders in the SQL query are automatically replaced:

- `$guild` -> Guild ID
- `$channel` -> Channel ID
- `$me` -> Author ID

Mentions (e.g., `<@123456789012345678>`) are replaced with their respective IDs, and table names are automatically quoted.

## Code Blocks

You can also use code blocks to format your SQL query:

````haskell
.database ```sql
SELECT * FROM users WHERE id = $me
```
````

## Arguments

{% hint style="warning" %}
Check the [Command](../usage-1/create-a-command.md)/[Arguments](../usage-1/create-a-command.md#arguments) section if you have a problem.
{% endhint %}

## Examples

### Basic Query

Run a simple SQL query:

```bash
.database SELECT * FROM users
```

### Query with Placeholders

Use placeholders for dynamic data:

```bash
.database SELECT * FROM messages WHERE author_id = $me
```

### Formatted Query

Use code blocks for better readability:

````haskell
.database ```sql
SELECT * FROM messages
WHERE channel_id = $channel
AND guild_id = $guild
```
````

## Subcommands

### Plan

The `plan` subcommand shows the database schema, including the table names, column types, and default values.

#### Usage

```bash
.database plan
```

#### Aliases

- `tables`
- `schema`
- `list`
- `view`

#### Example

```bash
.database plan
```

## Annexes

* [Command file](https://github.com/bot-ts/framework/blob/master/src/commands/database.native.ts)
