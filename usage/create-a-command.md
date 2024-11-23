# Command

## Create a textual command

To create a command it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) to correctly generate the body of the command.

### CLI pattern

```bash
bot add command
```

### Define message origin

Once your command is created, **If you want handle messages from GuildChannels only or from DMChannel only**, follow these steps.

{% tabs %}
{% tab title="GuildChannel only" %}

```typescript
import { Command } from "#core/command"

export default new Command({
  channelType: "guild",

  // ...some properties
})
```

{% endtab %}

{% tab title="DMChannel only" %}

```typescript
import { Command } from "#core/command"

export default new Command({
  channelType: "dm",

  // ...some properties
})
```

{% endtab %}
{% endtabs %}

### Setup a cooldown

If you want to setup a cooldown, you simply need to add the coolDown property when you create the command, define the duration you want in milliseconds, and trigger the cooldown where you want in the command body. Example:

```typescript
import { Command, CooldownType } from "#core/command";

const canAccessHourly: () => boolean = //...
const processHourly: () => Promise = //...

export default new Command({
  name: "hourly",
  cooldown: {
    duration: 1000 * 60 * 60, // 1 hour of cooldown
    type: CooldownType.Global,
  },
  async run(message) {
    if(canAccessHourly()) {
      // trigger the cooldown only if hourly is triggered
      message.triggerCoolDown()

      await processHourly()
    }
  }
})
```

{% hint style="info" %}
If you forget the `message.triggerCoolDown()` in the command, a warn appear in server logs on loading of the command.
{% endhint %}

### Arguments

ALl command can have a lots of arguments. This framework considers that Discord bot commands should resemble Unix commands in their syntax. You will therefore find some similarities between CLIs and the commands of your Discord bot.

{% hint style="warning" %}
The character **is not a valid argument separator**. If you want to break the line before putting an argument, add a space at the start of argument. ([issue#19](https://github.com/bot-ts/framework/issues/19#issue-1084182563))
{% endhint %}

{% hint style="info" %}
The `name` and `description` argument properties are obligatory.
{% endhint %}

#### Categories of arguments

There are three specific types of arguments based on the [Yargs](http://yargs.js.org) parser, here is a short overview.

{% tabs %}
{% tab title="Positional" %}
The most common type of argument on Discord bots. It is used to define values according to their positioning in the command typed.

```typescript
import { Command } from "#core/command"

export default new Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  positional: [
    {
      name: "name",
      description: "A name positional",
      type: "string",
    },
  ],
  async run(message) {
    app.log(message.args.name) // string | null
  },
})
```

The last code example will be used like that on Discord:

- `!cmd "multiline value"`
- `!cmd value`
  {% endtab %}

{% tab title="Option" %}
This kind of argument is used for options, most often optional.

```typescript
import { Command } from "#core/command"

export default new Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  options: [
    {
      name: "name",
      description: "A name option",
      type: "string",
    },
  ],
  async run(message) {
    app.log(message.args.name) // string | null
  },
})
```

The last code example will be used like that on Discord:

- `!cmd --name "multiline value"`
- `!cmd --name value`
  {% endtab %}

{% tab title="Flag" %}
The flag is an argument of type "present or not" which returns a boolean. You can also assign it values such as `on/off` or `1/0` or `true/false` or `Y/N`, it will always return a boolean.

```typescript
import { Command } from "#core/command"

export default new Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  flags: [
    {
      name: "named",
      flag: "n",
      description: "Is named flag",
    },
  ],
  async run(message) {
    console.log(message.args.named) // true | false
  },
})
```

The last code example will be used like that on Discord:

| Command            | Returning value |
| ------------------ | --------------- |
| `!cmd --named off` | `false`         |
| `!cmd --named`     | `true`          |
| `!cmd -n`          | `true`          |
| `!cmd`             | `false`         |

{% endtab %}

{% tab title="Rest" %}
Represents all command text that was not passed as an argument.

```typescript
import { Command } from "#core/command"

export default new Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  rest: {
    name: "name",
    description: "The rest of arguments",
    required: true,
  },
  async run(message) {
    console.log(message.args.name) // string
  },
})
```

The last code example will be used like that on Discord:

- `!cmd multiline value`
- `!cmd value`
  {% endtab %}
  {% endtabs %}

#### Required arguments

If argument is required, it will never have the `null` value and will return an error message before the execution of the command if it is missing. The command will then not be executed.

#### Casting types

Yout can use the `type` property to force a certain type of input and convert the textual input into an object of the type you want.&#x20;

For example if I want the user to mention a member as positional, and retrieve the `GuildMember` mentioned in the body of my command, I can use the `type` property like this:

```typescript
import { Command } from "#core/command"

export default new Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  positional: [
    {
      name: "target",
      description: "The mentionned member",
      type: "member",
      required: true,
    },
  ],
  async run(message) {
    console.log(message.args.target) // GuildMember
  },
})
```

All types are available in `src/types.ts`, and you can add custom types there. Please refer to the types file for an exhaustive list of existing types.

### Middlewares

Middlewares are powerful tools that allow you to execute code before a command runs. They can be used for validation, data processing, or any other pre-command logic. In bot.ts, middlewares must be created in custom namespaces.

#### Creating a Middleware Namespace

First, create a namespace for your middlewares using the CLI:

```bash
bot add namespace
```

When prompted, name your namespace (e.g., "middlewares").

#### Middleware Structure

A middleware file exports multiple instances of `Middleware`. Here's a basic example:

```typescript
import { Middleware } from "#core/command"

export const checkRole = new Middleware(
  "checkRole", // middleware name
  async (context, data) => {
    // Check if user has required role
    const hasRole = context.message.member?.roles.cache.has("ROLE_ID")

    if (!hasRole)
      return {
        result: "You don't have the required role!",
        data: null,
      }

    return {
      result: true,
      data: { hasRole: true },
    }
  },
)
```

#### Middleware Return Type

A middleware must return a `MiddlewareResult` object with:

- `result`:
  - `true` to continue command execution
  - `false` to silently stop command execution
  - `string` to stop command execution and display an error message
- `data`: Additional data to pass to the next middleware or command (optional)

#### Using Middlewares in Commands

To use middlewares in your commands, add them to the `middlewares` array:

```typescript
import { Command } from "#core/command"
import { checkRole } from "#namespaces/middlewares"

export default new Command({
  name: "haveRole",
  description: "Command that requires a specific role",
  middlewares: [checkRole],
  run: async (message) => {
    // Command will only run if checkRole middleware returns true
    await message.reply("You have the required role!")
  },
})
```

#### Middleware Chain

Multiple middlewares are executed in order. Each middleware can access data from previous middlewares through the `data` parameter. The following example is useless, but it shows how middlewares can be chained together:

```typescript
import { Middleware } from "#core/command"

export const checkRole = new Middleware("checkRole", async (context, data) => {
  const hasRole = context.message.member?.roles.cache.has("ROLE_ID")

  if (!hasRole)
    return {
      result: "You don't have the required role!",
      data: null,
    }

  return {
    result: true,
    data: { hasRole: true }, // Add data to pass to next middleware
  }
})

export const validateUser = new Middleware(
  "validateUser",
  async (context, data) => {
    // Access data from previous middleware
    const { hasRole } = data

    // Add more data for next middleware
    return {
      result: true,
      data: {
        ...data,
        userId: context.message.author.id,
      },
    }
  },
)
```

#### Best Practices

1. Always create middlewares in a custom namespace
2. Use descriptive names for your middlewares (it will be used for error handling and documentation)
3. Keep middleware logic focused and single-purpose
4. Handle edge cases and provide clear error messages
5. Document the data your middleware expects and provides

## Create a slash command

Slash commands are Discord's native way to create interactive commands that appear when users type `/` in a Discord channel. bot.ts provides a powerful system to create and manage slash commands with full TypeScript support.

### Using the CLI

The easiest way to create a new slash command is to use the CLI:

```bash
bot add slash
```

The CLI will guide you through the process by asking:

1. The command name
2. A description for the command
3. Whether the command is guild-only
4. Whether the command is bot owner only
5. Whether the command will have subcommands or options

After answering these questions, a new file will be created in the `src/slash` directory with your command name.

### Command Structure

A slash command file exports a default instance of `SlashCommand`. Here's a basic example:

```typescript
import { SlashCommand } from "#core/slash"

export default new SlashCommand({
  name: "hello",
  description: "Replies with Hello World!",
  run: async (interaction) => {
    await interaction.reply("Hello World!")
  },
})
```

### Command Options

The `SlashCommand` constructor accepts the following options:

| Option            | Type                          | Description                                           |
| ----------------- | ----------------------------- | ----------------------------------------------------- |
| `name`            | `string`                      | The name of the command (required)                    |
| `description`     | `string`                      | A description of what the command does (required)     |
| `channelType`     | `"guild" \| "dm" \| "thread"` | Where the command can be used                         |
| `guildOnly`       | `boolean`                     | Whether the command can only be used in guilds        |
| `guildOwnerOnly`  | `boolean`                     | Whether the command can only be used by guild owners  |
| `botOwnerOnly`    | `boolean`                     | Whether the command can only be used by bot owners    |
| `userPermissions` | `PermissionsString[]`         | Required Discord permissions to use the command       |
| `allowRoles`      | `RoleResolvable[]`            | Specific roles allowed to use the command             |
| `denyRoles`       | `RoleResolvable[]`            | Specific roles denied from using the command          |
| `middlewares`     | `Middleware[]`                | Custom middleware functions to run before the command |
| `run`             | `Function`                    | The function that executes when the command is used   |
| `build`           | `Function`                    | Optional function to customize the command builder    |

### Adding Command Options

You can add options to your slash command using the `build` function:

```typescript
import { SlashCommand } from "#core/slash"

export default new SlashCommand({
  name: "greet",
  description: "Greet someone!",
  // builder is a discord.SlashCommandBuilder with the name and description set
  build(builder) {
    builder.addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user to greet")
        .setRequired(true),
    )
  },
  run: async (interaction) => {
    const user = interaction.options.getString("user", true)
    await interaction.reply(`Hello, ${user}!`)
  },
})
```

### Command Types

bot.ts provides TypeScript types to ensure type safety in your commands:

```typescript
import { SlashCommand } from "#core/slash"

export default new SlashCommand({
  name: "server-only",
  description: "A guild-only command",
  guildOnly: true,
  run: async (interaction) => {
    // TypeScript knows this is a guild interaction
    await interaction.reply(`This server is: ${interaction.guild.name}`)
  },
})
```

### Registering Commands

Slash commands are automatically registered when your bot starts. For guild-specific commands, they are instantly available. For global commands, they may take up to an hour to propagate across Discord. If you set the `BOT_GUILD_ID` environment variable, the slash commands will be registered to that guild.

### Best Practices

1. Keep command names short and descriptive
2. Use clear descriptions that explain what the command does
3. Group related functionality using subcommands
4. Return or await all async calls in your `run` function for error handling
5. Add appropriate permission checks for sensitive commands

### Advanced Usage

For more complex commands, you can use subcommands and groups:

```typescript
import { SlashCommand } from "#core/slash"

export default new SlashCommand({
  name: "settings",
  description: "Manage server settings",
  build(builder) {
    builder.addSubcommandGroup((group) =>
      group
        .setName("notifications")
        .setDescription("Manage notification settings")
        .addSubcommand((subcommand) =>
          subcommand.setName("enable").setDescription("Enable notifications"),
        )
        .addSubcommand((subcommand) =>
          subcommand.setName("disable").setDescription("Disable notifications"),
        ),
    )
  },
  run: async (interaction) => {
    const group = interaction.options.getSubcommandGroup()
    const subcommand = interaction.options.getSubcommand()

    // Handle the different subcommands
    if (group === "notifications") {
      if (subcommand === "enable") {
        // Handle enable notifications
      } else if (subcommand === "disable") {
        // Handle disable notifications
      }
    }
  },
})
```
