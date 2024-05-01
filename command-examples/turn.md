---
description: >-
  Example of creating a command to assign a new prefix to the bot for each
  guild.
---

# Prefix

## Creating the table

First, we will generate a blank table file that will represent the configuration of each guild.

```bash
bot add table "guild"
```

Your new file is located in `src/tables/guild.ts`. You must now open the file and add all the properties you want to have in this table in order to configure each guild independently.&#x20;

For our example we are only going to add the `_id` column for incrementation and references, the `id` column for correspondence with the guild snowflake on Discord, and finally the `prefix` column.

```typescript
import * as app from "#app"

export interface Guild {
  _id: number
  id: string
  prefix: string | null
}

export default new app.Table<Guild>({
  name: "guild",
  setup: (table) => {
    table.increments("_id", { primaryKey: true }).unsigned()
    table.string("id").unique().notNullable()
    table.string("prefix")
  },
})
```

## Creating the prefix getter in a namespace

To access the prefix of each guild easily without having to repeat the same operations several times, you must create a namespace which will contain the `getGuildPrefix` function. Call the namespace whatever you want, in our example we will call it `tools.ts`.

```bash
bot add namespace "tools"
```

Your new file is located in `src/namespaces/tools.ts`. You must now open the file, import the created table and create the `getGuildPrefix` function. The function should return the bot's default prefix if the guild does not have a custom prefix.

<pre class="language-typescript"><code class="lang-typescript"><strong>import * as app from "#app"
</strong><strong>
</strong><strong>import guildTable from "#tables/guild.js"
</strong>
export async function getGuildPrefix(guild?: app.Guild | null): Promise&#x3C;string> {
  let prefix = process.env.BOT_PREFIX as string
  
  if (guild) {
    const guildData = await guildTable.query
      .where("id", guild.id)
      .select("prefix")
      .first()
      
    if (guildData) return guildData.prefix ?? prefix
  }
  
  return prefix
}
</code></pre>

## Tell the system how to access the guild prefix

In the `src/config.ts` file, add the `getPrefix` option and make it use the `getGuildPrefix` function of the namespace you just created.

```typescript
import * as app from "#app"

export const config: app.Scrap<app.Config> = () => ({
  // ...
  getPrefix: (message) => {
    return app.getGuildPrefix(message.guild)
  },
  // ...
})
```

Now the system will know the individual guild prefix, it will be able to use it in the help menu and for the use of text commands.

## Creating the command

Next, we will generate a blank command file with the name "prefix".

```bash
bot add command "prefix"
```

Your new file is located in `src/commands/prefix.ts`. Now you can open the file and import the previously created table into it.

```typescript
import guildTable from "#tables/guild.js"
```

You will then define the properties of the command to prevent anyone from being able to change the prefix without authorization and add a small descriptionm.

```typescript
export default new app.Command({
  name: "prefix",
  description: "Edit or show the bot prefix",
  guildOwnerOnly: true,
  channelType: "guild",
  async run(message) {
    // ...
  }
})
```

Now you can ask the user to attach a prefix if they want to change it. We validate it using a regex to avoid unpleasant surprises.

```typescript
export default new app.Command({
  // ...
  positional: [
    {
      name: "prefix",
      description: "The new prefix",
      type: "string",
      validate: (value) => value.length < 10 && /^\S/.test(value),
    },
  ],
  async run(message) {
    // ...
  }
})
```

We can finally write the body of the command in order to make it work by changing the value in the database if a valid prefix has been transmitted. Otherwise, we display the current bot prefix for this guild.

```typescript
export default new app.Command({
  // ...
  async run(message) {
    const prefix = message.args.prefix

    if (!prefix)
      return message.channel.send(
        `My current prefix for "**${message.guild}**" is \`${
          await app.getGuildPrefix(message.guild)
        }\``,
      )

    await guilds.query
      .insert({
        id: message.guild.id,
        prefix: prefix,
      })
      .onConflict("id")
      .merge()

    await message.channel.send(
      `My new prefix for "**${message.guild}**" is \`${prefix}\``,
    )
  },
})
```

## Usage

It's done! you can now use your prefix command this way.

```bash
# For change "." to "!"
.prefix "!"

# For view the current prefix
.prefix
# Or if you don't know the current prefix
@botMention
# Or
@botMention prefix
```
