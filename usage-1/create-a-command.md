# Command

## Create a command

To create a command it is recommended to use the [CLI](https://www.npmjs.com/package/make-bot.ts) to correctly generate the body of the command.

### CLI pattern

By typing `make command -h` you will get this following information.

```bash
make command <name>

Positionals:
  name       # command name                                             [required]

Options:
  --version  # Show version number                                       [boolean]
  --help     # Show help                                                 [boolean]
```

### Example

For a "ping" command, type the following command.

```bash
make command "ping"
```

Then, the `src/commands/ping.ts` file will be ready to be implemented.

## Define message origin

Once your command is created, **If you want handle messages from GuildChannels only or from DMChannel only**, follow these steps.

{% tabs %}
{% tab title="GuildChannel only" %}
```typescript
import * as app from "../app"

export default new app.Command({

  channelType: "guild",

  // ...some properties
})
```
{% endtab %}

{% tab title="DMChannel only" %}
```typescript
import * as app from "../app"

export default new app.Command({

  channelType: "dm",

  // ...some properties
})
```
{% endtab %}
{% endtabs %}

## Setup a cooldown

## Arguments

{% hint style="warning" %}
The  character **is not a valid argument separator**. If you want to break the line before putting an argument, add a space at the start of argument. ([issue#19](https://github.com/bot-ts/framework/issues/19#issue-1084182563))
{% endhint %}

{% hint style="info" %}
The `name` and `description` argument properties are obligatory.
{% endhint %}

### Argument types

There are three specific types of arguments based on the [Yargs](http://yargs.js.org) parser, here is a short overview.

{% tabs %}
{% tab title="Positional" %}
The most common type of argument on Discord bots. It is used to define values according to their positioning in the command typed.

```typescript
import * as app from "../app"

export default new app.Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  positional: [
    {
      name: "name",
      description: "A name positional"
    }
  ],
  async run(message) {
    app.log(message.args.name) // string | null
  }
})
```

The last code example will be used like that on Discord:

* `!cmd "multiline value"`
* `!cmd value`
{% endtab %}

{% tab title="Option" %}
This kind of argument is used for options, most often optional.

```typescript
import * as app from "../app"

export default new app.Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  options: [
    {
      name: "name",
      description: "A name option"
    }
  ],
  async run(message) {
    app.log(message.args.name) // string | null
  }
})
```

The last code example will be used like that on Discord:

* `!cmd --name "multiline value"`
* `!cmd --name value`
{% endtab %}

{% tab title="Flag" %}
The flag is an argument of type "present or not" which returns a boolean. You can also assign it values such as `on/off` or `1/0` or `true/false` or `Y/N`, it will always return a boolean.

```typescript
import * as app from "../app"

export default new app.Command({
  name: "cmd",
  description: "A command",
  channelType: "all",
  flags: [
    {
      name: "named",
      flag: "n",
      description: "Is named flag"
    }
  ],
  async run(message) {
    app.log(message.args.named) // true | false
  }
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
{% endtabs %}

### Required

If argument is required, it will never have the `null` value and will return an error message before the execution of the command if it is missing. The command will then not be executed.
