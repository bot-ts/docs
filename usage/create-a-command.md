# Command

## Create a command

To create a command it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) to correctly generate the body of the command.

### CLI pattern

```bash
bot add command
```

## Define message origin

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

## Setup a cooldown

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

## Arguments

ALl command can have a lots of arguments. This framework considers that Discord bot commands should resemble Unix commands in their syntax. You will therefore find some similarities between CLIs and the commands of your Discord bot.

{% hint style="warning" %}
The character **is not a valid argument separator**. If you want to break the line before putting an argument, add a space at the start of argument. ([issue#19](https://github.com/bot-ts/framework/issues/19#issue-1084182563))
{% endhint %}

{% hint style="info" %}
The `name` and `description` argument properties are obligatory.
{% endhint %}

### Categories of arguments

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

### Required arguments

If argument is required, it will never have the `null` value and will return an error message before the execution of the command if it is missing. The command will then not be executed.

### Casting types

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

## Middlewares

{% hint style="warning" %}
The documentation is currently being produced.
{% endhint %}

## Slash commands

{% hint style="warning" %}
The documentation is currently being produced.
{% endhint %}

## About commands

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
