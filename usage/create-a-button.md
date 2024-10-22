# Button

## Create a Button

To create a button in your project, it is recommended to use the provided CLI tool. This will ensure that your button is correctly generated and ready to implement.

### CLI Pattern

By typing `bot add button -h`, you will get the following information:

```bash
bot add button <name>

Positionals:
  name  button name                                                   [required]

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### Example

For a "buy" button, you can type the following command:

```bash
bot add button "buy"
```

This command will generate a file at `src/buttons/buy.ts`, ready for implementation.

---

## Define Button Parameters

Once the button is created, you can define any parameters the button will receive. Here’s an example of a "buy" button that takes an `article` and a `quantity` as parameters:

```typescript
import * as app from "#app"

export type BuyButtonParams = [article: string, quantity: number]

export default new app.Button<BuyButtonParams>({
  key: "buy",
  description: "The buy button",
  builder: (builder) => builder.setLabel("Buy"),
  async run(interaction, article, quantity) {
    await interaction.deferUpdate()
    await interaction.followUp({
      content: `You clicked the buy button for ${quantity}x ${article}!`,
      ephemeral: true,
    })
  }
})
```

---

## Using the Button

After creating the button handler, you can instantiate and use the button in your bot’s interactions. Here is an example of how to send a button within a message:

```typescript
import * as app from "#app"
import buyButton from "#buttons/buy.ts"

await channel.send({
  components: [
    new app.ActionRowBuilder<discord.MessageActionRowComponentBuilder>().addComponents(
      buyButton.create("article 1", 3)
    )
  ]
})
```

In this example, the `buyButton.create("article 1", 3)` call generates a button for "article 1" with a quantity of 3.

You can also use the button from an external function:

```typescript
import * as app from "#app"
import buyButton from "#buttons/buy.ts"

await channel.send({
  components: [
    new app.ActionRowBuilder<discord.MessageActionRowComponentBuilder>().addComponents(
      app.createButton(buyButton, "article 1", 3)
    )
  ]
})
```